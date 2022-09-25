## OAuth 2 Client

This is an example client implementing Auth Code Grant (RFC 6749 section 4)


### Inspired by okta
- https://www.oauth.com/playground/authorization-code.html
- https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/

## Login demo screenshots

Start the application with `npm run dev`
![](../../../../Desktop/Screen Shot 2022-09-25 at 9.28.04 AM.png)

Client runs the app on port specified in `.env`
![](../../../../Desktop/Screen Shot 2022-09-25 at 9.28.14 AM.png)

Visiting `/login` redirect user to okta login page
![](../../../../Desktop/Screen Shot 2022-09-25 at 9.28.56 AM.png)

After logging in, user is redirected back to client with a login code and the state param to prevent CSRF attacks 
![](../../../../Desktop/Screen Shot 2022-09-25 at 9.31.29 AM.png)

Tokens are populated by okta for the user and authentication is complete
![](../../../../../../var/folders/y4/7mpjbjp578x1vs8lhvk3nx040000gn/T/TemporaryItems/NSIRD_screencaptureui_HG0IJH/Screen Shot 2022-09-25 at 9.33.10 AM.png)

I included a video demo, however the picture quality is incredibly poor.
[![Demo](https://github.com/garrett-vangilder/example_oauth_2_node_ts/blob/3e3780a97907a3a67a2bb0dc18e22febe76aa412/assets/example_login.mov)](https://github.com/garrett-vangilder/example_oauth_2_node_ts/blob/3e3780a97907a3a67a2bb0dc18e22febe76aa412/assets/example_login.mov)
