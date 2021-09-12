# API endpoints

##GET
`Getting information about btc rate`[/btcRate](#get-btcRate) </br>

##POST
`Register new user`[/user/create](#post-usercreate) </br>
`Login exist user`[/user/login](#post-userlogin) </br>

### GET /btcRate
**Query Params**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `coins` | false | number  | Count of BTC coins which you would convert to UAH |

### POST /user/create
After sending valid user data, you will receive a response with a private token.
Also, token will save in cookies.

**Body Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `email` | true | string(email)  | UserService valid email |
|      `password`| true | string | UserService password |

**Return Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `email` | true | string(email)  | UserService valid email |
|      `password`| true | string | UserService password |
|      `token`| true | string | JWT Token for auth |


### POST /user/login
After sending valid user data, you will receive a response with a private token.
Also, token will save in cookies.

**Body Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `email` | true | string(email)  | UserService valid email |
|      `password`| true |string | UserService password |

**Return Data**

|          Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| ----------------------------------------- |
|     `email` | true | string(email)  | UserService valid email |
|     `password`| true | string | UserService password |
|     `token`| true | string | JWT Token for auth |

**Project Structure**

`apps/api-gateway`: HTTP gateway
`apps/crypto-rate`: gRPC microservice for getting information about BTC Rate
`apps/users`: TCP microservice which working with user data

**How run project**
```bash
# Start API-GATEWAY
npm run start:gateway
#Start CRYPTO-RATE
npm run start:rate
#Start USERS
npm run start:users
```
