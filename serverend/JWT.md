# JWT
>One of the most popular token implementations is JWT (JSON Web Token) https://jwt.io/

Basic Workflow

<img src="/images/jwt.png">

## Composition of a JWT Token

* Header: A JSON object describing the metadata of the JWT, including the signing algorithm and type
* Payload: A JSON object containing the data that needs to be transmitted
* Signature: A signature of the first two parts to prevent data tampering. It requires a secret key that only the server knows and must not be disclosed to users.

## Token Advantages

* Tokens are stateless; the server does not need to store any information, saving memory
* No impact on multi-process or multi-server clusters, easy to scale
* If not stored in cookies, there are no cross-domain issues
* Decoupled from the server; any device can generate tokens.

## Token Disadvantages

* Cannot be revoked; there is no way to quickly handle already logged-in users.
* Larger in size; all data is base64-encoded and grows as the data size increases.
