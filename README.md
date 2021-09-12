# Home Work

[Code Review](https://github.com/Greifrut/ses_homework_1)
[Solid Principles](https://github.com/GenesisEducationKyiv/se-school-hw2-Greifrut)
[Testing](https://github.com/Greifrut/btc-rate/tree/genesis/hw-test)
[Project Schema](https://github.com/Greifrut/btc-rate/tree/genesis/hw-project-schema)
[Microservice](https://github.com/Greifrut/btc-rate/tree/genesis/hw-microservice)

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

**Test**
```bash
# Run all test
npm run test:all

#Run integration tests
npm run test:int

#Run unit tests
npm run test:unit
```
