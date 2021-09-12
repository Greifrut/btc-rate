# API endpoints

#Running
### **NodeJS**

Download and install NodeJS for your platform [Link](https://nodejs.org/uk/)

### **Docker**
```bash
# Run rabbit-mq container
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### **Project**

**1. Clone Repository:**
```bash
git clone git@github.com:Greifrut/btc-rate.git
```
**2. Open cloned project**

**3. Change a current branch to genesis/hw-rabbitmq**

**4. Install dependencies**
```bash
npm i
```
**5. Run microservices**
```bash
npm run start:gateway
npm run start:users
npm run start:rate
npm run start:logger
```


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
