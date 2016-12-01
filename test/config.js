module.exports = {

	// the realm to be used when issuing tokens, requesting HTTP credentials, etc
	realm: 'AuthX',

	// prefix applied to all routes
	prefix: '/v1',

	// rethinkdb settings
	db: {
		host: process.env.RETHINKDB_PORT_29015_TCP_ADDR || '127.0.0.1',
		port: process.env.RETHINKDB_PORT_28015_TCP_PORT || '28015',
		db: 'AuthX_test',
		pool: {}
	},

	// settings to be used when signing and verifying session tokens (JWT)
	session_token: {
		private_key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAhF1Q+CGNTUOS5MqrqavDquKq/BgVpNDgtWzZ9+/D2jKxlHt0
Q03On73O9kZtGZC+YrQ2pGp1yl3LYVND8Zre+Y1MIMZnb81YbSdMMnykFpz0UMQ/
90VezX51w85QuvoB/9yLhSHI1LEnzAvzBd/T5DEKPmfxuE62dXfejMJEutT5lXH5
kHy6OrZa9myhC2UeE/nGzXbHJDkwwfQfyrJxDkqZp+HwtwOPg8B917UT/Pv9LJOO
y+SOArYik9vB7ORqa0scDdJ3U5fuBpKOIgtBpTCkUShw0YjTSVnrC61r/bfLfTy1
5xutcmlbIHZMgM8YQ0zqLI6lAz8SBVHkoK1wzwIDAQABAoIBAE7mNPKDRXAN3IzG
hkbQHQVKsbMtRBGHdLqQVOkmoW76EsI4SJgp1AWCJdDFMBkyH1pEo+Gjl+z1tdqg
wHpO36SPZhaPTW7mT1RZPWFGzKSyECvon1xsnFMPk3ERFSwvBGwYcY39EnI920QU
x1r0DaES3lFOslYzjS0+M4lh74gRuXpTWmuabXR/QnE67+4ukjlGV9etRKpreP6u
XhRLypshcSl1ZZXnkDLZ2qxSkVUncdDQpL8DR6ghh4w5/jZpmcQy3eVxJD2dhcWB
gFNl/TMHHRLmI1GfJWeH9PsWkUn2vg/AZjmtIFC6iXESzA6YW8TeF9Wa781EvUPF
ASkgk0kCgYEAxJiilUJW7CozUtRzOwkSYV5oJrY5CwrgZZ3bZFg1NUGgv+wwp5tZ
yDtKTQcnGyurZAg/Lo10R9jEZezP8+U4YTDWHK3P9QTNzXv20eNzMpxvF+oSgPct
9FyOCBurtO9ARI+IbMEO9qRyHAlFnuB7eNy3wSwMLxZ9UwtdIjQSawMCgYEArFwl
m2yiUlCSMI5a0tSV03F4lbrmSXCnanX+8m/qJemQDHmgUbDVD8CAo7rmuwDYtT2A
/9r8wbwGzQsrKlrmDNjWMZcMuj2ih79OpsAwB5VHyHtukuXM4gN+iTKuhRx6NrUz
H2kyoywTtlxsRaGbvO81+HpIRbSG6HYT/7p3M0UCgYEAwV8Y3BNKiDTiEqDhTroX
mCpR63HlHdVu7sScXVDd1SpeQSjCmrmVT/vxk15ruq/zfwsVimacb2bplw+dY9qc
4Aw3LjJQkEJPY8SA++XrE2cHZtBXrv5x9x9qnNMKy4dhAY7ks4QZgcQycR01m5ZW
HIWNQLZgrZhDYQGWc+QgEZ0CgYEAhSxpjk6AmNNSMRw8xrukzAvXnPEc78+QO2zS
QOYB56swNsNfAN99sD8P5fIKRqEfz+Gmo4nDU7mBE7q2bnJvX6vGy+gm2Fu5EePZ
1HOYaLOKFDhytiPCizsh8MXtHEJll5Gn33Q7wOHUlUmSCrcUiwXVEJkC8IDM4B4j
06pyYXUCgYBMeDzN6WFoFVPxaORamdox9ywo2514FUGO6w771bvcHMBcB/eRDhga
bARo8bQQrepEOIaDYPFOET8M8IMR/KH/PKccgPkpd1Ugze8R6/L5qdvlz+ipfkF3
V2wNhPX/pnBKwccO57uZq4TByil4jii2EWiZqXdaGibuHN7fX1jOGA==
-----END RSA PRIVATE KEY-----`,
		public: [{
			algorithm: 'RS512',
			key: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhF1Q+CGNTUOS5MqrqavD
quKq/BgVpNDgtWzZ9+/D2jKxlHt0Q03On73O9kZtGZC+YrQ2pGp1yl3LYVND8Zre
+Y1MIMZnb81YbSdMMnykFpz0UMQ/90VezX51w85QuvoB/9yLhSHI1LEnzAvzBd/T
5DEKPmfxuE62dXfejMJEutT5lXH5kHy6OrZa9myhC2UeE/nGzXbHJDkwwfQfyrJx
DkqZp+HwtwOPg8B917UT/Pv9LJOOy+SOArYik9vB7ORqa0scDdJ3U5fuBpKOIgtB
pTCkUShw0YjTSVnrC61r/bfLfTy15xutcmlbIHZMgM8YQ0zqLI6lAz8SBVHkoK1w
zwIDAQAB
-----END PUBLIC KEY-----`
		}],
		algorithm: 'RS512',
		expiresIn: 86400
	},

	// settings to be used when signing and verifying OAuth2 access tokens (JWT)
	access_token: {
		private_key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAhF1Q+CGNTUOS5MqrqavDquKq/BgVpNDgtWzZ9+/D2jKxlHt0
Q03On73O9kZtGZC+YrQ2pGp1yl3LYVND8Zre+Y1MIMZnb81YbSdMMnykFpz0UMQ/
90VezX51w85QuvoB/9yLhSHI1LEnzAvzBd/T5DEKPmfxuE62dXfejMJEutT5lXH5
kHy6OrZa9myhC2UeE/nGzXbHJDkwwfQfyrJxDkqZp+HwtwOPg8B917UT/Pv9LJOO
y+SOArYik9vB7ORqa0scDdJ3U5fuBpKOIgtBpTCkUShw0YjTSVnrC61r/bfLfTy1
5xutcmlbIHZMgM8YQ0zqLI6lAz8SBVHkoK1wzwIDAQABAoIBAE7mNPKDRXAN3IzG
hkbQHQVKsbMtRBGHdLqQVOkmoW76EsI4SJgp1AWCJdDFMBkyH1pEo+Gjl+z1tdqg
wHpO36SPZhaPTW7mT1RZPWFGzKSyECvon1xsnFMPk3ERFSwvBGwYcY39EnI920QU
x1r0DaES3lFOslYzjS0+M4lh74gRuXpTWmuabXR/QnE67+4ukjlGV9etRKpreP6u
XhRLypshcSl1ZZXnkDLZ2qxSkVUncdDQpL8DR6ghh4w5/jZpmcQy3eVxJD2dhcWB
gFNl/TMHHRLmI1GfJWeH9PsWkUn2vg/AZjmtIFC6iXESzA6YW8TeF9Wa781EvUPF
ASkgk0kCgYEAxJiilUJW7CozUtRzOwkSYV5oJrY5CwrgZZ3bZFg1NUGgv+wwp5tZ
yDtKTQcnGyurZAg/Lo10R9jEZezP8+U4YTDWHK3P9QTNzXv20eNzMpxvF+oSgPct
9FyOCBurtO9ARI+IbMEO9qRyHAlFnuB7eNy3wSwMLxZ9UwtdIjQSawMCgYEArFwl
m2yiUlCSMI5a0tSV03F4lbrmSXCnanX+8m/qJemQDHmgUbDVD8CAo7rmuwDYtT2A
/9r8wbwGzQsrKlrmDNjWMZcMuj2ih79OpsAwB5VHyHtukuXM4gN+iTKuhRx6NrUz
H2kyoywTtlxsRaGbvO81+HpIRbSG6HYT/7p3M0UCgYEAwV8Y3BNKiDTiEqDhTroX
mCpR63HlHdVu7sScXVDd1SpeQSjCmrmVT/vxk15ruq/zfwsVimacb2bplw+dY9qc
4Aw3LjJQkEJPY8SA++XrE2cHZtBXrv5x9x9qnNMKy4dhAY7ks4QZgcQycR01m5ZW
HIWNQLZgrZhDYQGWc+QgEZ0CgYEAhSxpjk6AmNNSMRw8xrukzAvXnPEc78+QO2zS
QOYB56swNsNfAN99sD8P5fIKRqEfz+Gmo4nDU7mBE7q2bnJvX6vGy+gm2Fu5EePZ
1HOYaLOKFDhytiPCizsh8MXtHEJll5Gn33Q7wOHUlUmSCrcUiwXVEJkC8IDM4B4j
06pyYXUCgYBMeDzN6WFoFVPxaORamdox9ywo2514FUGO6w771bvcHMBcB/eRDhga
bARo8bQQrepEOIaDYPFOET8M8IMR/KH/PKccgPkpd1Ugze8R6/L5qdvlz+ipfkF3
V2wNhPX/pnBKwccO57uZq4TByil4jii2EWiZqXdaGibuHN7fX1jOGA==
-----END RSA PRIVATE KEY-----`,
		public: [{
			algorithm: 'RS512',
			key: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhF1Q+CGNTUOS5MqrqavD
quKq/BgVpNDgtWzZ9+/D2jKxlHt0Q03On73O9kZtGZC+YrQ2pGp1yl3LYVND8Zre
+Y1MIMZnb81YbSdMMnykFpz0UMQ/90VezX51w85QuvoB/9yLhSHI1LEnzAvzBd/T
5DEKPmfxuE62dXfejMJEutT5lXH5kHy6OrZa9myhC2UeE/nGzXbHJDkwwfQfyrJx
DkqZp+HwtwOPg8B917UT/Pv9LJOOy+SOArYik9vB7ORqa0scDdJ3U5fuBpKOIgtB
pTCkUShw0YjTSVnrC61r/bfLfTy15xutcmlbIHZMgM8YQ0zqLI6lAz8SBVHkoK1w
zwIDAQAB
-----END PUBLIC KEY-----`
		}],
		algorithm: 'RS512',
		expiresIn: 2592000
	},

	// these routes contain user-facing HTML
	routes: {
		login: '/login',
		authorize: '/authorize'
	}
};
