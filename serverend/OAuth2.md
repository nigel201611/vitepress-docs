# OAuth2 for User Login
>OAuth is an open network standard for authorization, widely used around the world to authorize third-party applications.

## Disadvantages of Traditional Methods

* To provide subsequent services, the user's password is stored, which is not very secure.
* There is no way to limit the scope and validity period of the authorization granted to third-party applications.
* Users can only revoke the authority granted to third-party applications by changing their password.
* If any third-party application is compromised, the user's password and all data protected by that password will be leaked.

## OAuth2 Concept

* OAuth sets up an authorization layer between the "client" and the "service provider".
* The "client" cannot directly log in to the "service provider"; it can only log in to the authorization layer, thereby separating the user from the client.
* The token used by the "client" to log in to the authorization layer is different from the user's password. Users can specify the scope and validity period of the authorization layer token when logging in.

## Advantages of Tokens

* Tokens are short-term and will automatically expire; users cannot modify them.
* Tokens can be revoked by the data owner and will become invalid immediately.
* Tokens have a permission scope (scope).

## OAuth2 Authorization Methods

* Authorization code (authorization-code)
* Implicit (implicit)
* Password (password)
* Client credentials (client credentials)

## Authorization Code Workflow

<img src="/images/oauth2.png">

## Gitee Documentation
* [OAuth Documentation](https://gitee.com/api/v5/oauth_doc#/)
* [Get User Info API Documentation](https://gitee.com/api/v5/swagger#/getV5User)

## OAuth2 Frontend Call Flow
<img src="/images/oauth21.png">
