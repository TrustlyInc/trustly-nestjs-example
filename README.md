<p align="center">
  Alpha Merchant App - Simple Backend
</p>


## Description

Simple backend to support Alpha Merchant App.


## Running the app

```bash
# development
$ npm run start:dev
```

Create `.development.env` file in `trustly-alpha-merchant-backend` folder. In this file we need to declare the environment variables:
- ACCESS_KEY
- BASE_URL
- USERNAME
- PASSWORD
- MONGODB_URI

## Deploy the app
```bash
# fly.io
$ npm run fly:deploy
```

## Swagger
```
http://localhost:3000/api
```