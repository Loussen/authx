import { PoolClient } from "pg";
import { Credential } from "./Credential";

export interface AuthorityData<A> {
  readonly id: string;
  readonly enabled: boolean;
  readonly name: string;
  readonly strategy: string;
  readonly details: A;
}

export class Authority<A> implements AuthorityData<A> {
  public readonly id: string;
  public readonly enabled: boolean;
  public readonly name: string;
  public readonly strategy: string;
  public readonly details: A;

  public constructor(data: AuthorityData<A>) {
    this.id = data.id;
    this.enabled = data.enabled;
    this.name = data.name;
    this.strategy = data.strategy;
    this.details = data.details;
  }

  // public async credentials(
  //   tx: PoolClient,
  //   refresh: boolean = false
  // ): Promise<Credential[]> {
  //   return Credential.read(
  //     tx,
  //     (await tx.query(
  //       `
  //         SELECT entity_id AS id
  //         FROM authx.credential_records
  //         WHERE
  //           authority_id = $1
  //           AND replacement_record_id IS NULL
  //         `,
  //       [this.id]
  //     )).rows.map(({ id }) => id)
  //   );
  // }

  public static read<T extends Authority<any>>(
    this: new (data: AuthorityData<any>) => T,
    tx: PoolClient,
    id: string
  ): Promise<T>;

  public static read<T extends Authority<any>>(
    this: new (data: AuthorityData<any>) => T,
    tx: PoolClient,
    id: string[]
  ): Promise<T[]>;

  public static read<M extends { [key: string]: any }, K extends keyof M>(
    tx: PoolClient,
    id: string,
    map: M
  ): Promise<InstanceType<M[K]>>;

  public static read<M extends { [key: string]: any }, K extends keyof M>(
    tx: PoolClient,
    id: string[],
    map: M
  ): Promise<InstanceType<M[K]>[]>;

  public static async read<
    T,
    M extends { [key: string]: any },
    K extends keyof M
  >(
    this: {
      new (data: AuthorityData<any>): T;
    },
    tx: PoolClient,
    id: string[] | string,
    map?: M
  ): Promise<InstanceType<M[K]>[] | InstanceType<M[K]> | T | T[]> {
    if (!id.length) {
      return [];
    }

    const result = await tx.query(
      `
      SELECT
        entity_id AS id,
        enabled,
        name,
        strategy,
        details
      FROM authx.authority_record
      WHERE
        entity_id = ANY($1)
        AND replacement_record_id IS NULL
      `,
      [typeof id === "string" ? [id] : id]
    );

    if (result.rows.length !== id.length) {
      throw new Error(
        "INVARIANT: Read must return the same number of records as requested."
      );
    }

    const data = result.rows.map(row => {
      return {
        ...row,
        baseUrls: row.base_urls
      };
    });

    // No map is provided: instantiate all returned records with this class
    if (!map) {
      const instances = data.map(data => new this(data));
      return typeof id === "string" ? instances[0] : instances;
    }

    // A map is provided: use the constructor for the corresponding strategy
    const instances = data.map(data => {
      const Class = map[data.strategy];

      if (!Class) {
        throw new Error(`The strategy "${data.strategy}" is not registered.`);
      }

      return new Class(data);
    });

    return typeof id === "string" ? instances[0] : instances;
  }

  public static async write<T extends Authority>(
    this: {
      new (data: AuthorityData<any>): T;
    },
    tx: PoolClient,
    data: AuthorityData<any>,
    metadata: {
      recordId: string;
      createdBySessionId: string;
      createdAt: Date;
    }
  ): Promise<T> {
    // ensure that the entity ID exists
    await tx.query(
      `
      INSERT INTO authx.authority
        (id)
      VALUES
        ($1)
      ON CONFLICT DO NOTHING
      `,
      [data.id]
    );

    // replace the previous record
    const previous = await tx.query(
      `
      UPDATE authx.authority_record
      SET replacement_record_id = $2
      WHERE
        entity_id = $1
        AND replacement_record_id IS NULL
      RETURNING entity_id AS id, record_id
      `,
      [data.id, metadata.recordId]
    );

    if (previous.rows.length >= 1) {
      throw new Error(
        "INVARIANT: It must be impossible to replace more than one record."
      );
    }

    // insert the new record
    const next = await tx.query(
      `
      INSERT INTO authx.authority_record
      (
        record_id,
        created_by_session_id,
        created_at,
        entity_id,
        enabled,
        name,
        strategy,
        details
      )
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        entity_id AS id,
        enabled,
        name,
        strategy,
        details
      `,
      [
        metadata.recordId,
        metadata.createdBySessionId,
        metadata.createdAt,
        data.id,
        data.enabled,
        data.name,
        data.strategy,
        data.details
      ]
    );

    if (next.rows.length !== 1) {
      throw new Error("INVARIANT: Insert must return exactly one row.");
    }

    const row = next.rows[0];
    return new this({
      ...row,
      baseUrls: row.base_urls
    });
  }
}
