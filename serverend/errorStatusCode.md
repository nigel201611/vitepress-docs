# Error Code Design Principles

## Unified Format A-BB-CCC

* A: Error level, e.g., 1 for system-level error, 2 for service-level error
* B: Project or module name, usually a team won't exceed 99 projects, e.g., 01 for user module
* C: Specific error code, auto-increment; 999 error codes per project should be sufficient

## Encryption Scheme Selection

### MD5 Hash Storage - Collision, Rainbow Table

```js
MD5('123') = 202CB962AC59075B964B07152D234B70
username: nigel
password: 202CB962AC59075B964B07152D234B70
```
### MD5 Hash + Salt Storage

A salt is a random string inserted at a fixed position in the plaintext (e.g., password) before hashing.

```js
MD5('123' + '1ck12b13k1jmjxrg1h0129h2lj') = '6c22ef52be70e11b6f3bcf0f672c96ce'
username: nigel
password: 6c22ef52be70e11b6f3bcf0f672c96ce
salt: 1ck12b13k1jmjxrg1h0129h2lj
```

### bcrypt
A salted one-way hash, an irreversible encryption algorithm. The same plaintext produces different ciphertext each time, and it is very difficult to reverse-engineer the plaintext.
Node.js implementation - https://github.com/kelektiv/node.bcrypt.js

```js
bcrypt('123') = $2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT
username: nigel
password: $2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT
```

<img src="/images/bcrypt.png" alt="bcrypt png">

### egg-bcrypt 

```js
// config.default.js
exports.bcrypt = {
  saltRounds: 10 // default 10
}
// {app_root}/config/plugin.js
exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}
```

