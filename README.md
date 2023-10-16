<p align="center">
  Alpha Merchant App - Simple Backend
</p>


## Description

Simple backend to demonstrate how to implement the endpoints to integrate with Trustly.

## Install the app

```bash
# clone the repository
$ git clone https://github.com/TrustlyInc/trustly-alpha-merchant-backend.git

# install dependencies
$ cd trustly-alpha-merchant-backend && npm install
```


## Running the app

Create `.development.env` file in `trustly-alpha-merchant-backend` folder. In this file we need to declare the environment variables:
- ACCESS_KEY
- BASE_URL
- USERNAME
- PASSWORD

```bash
# development
$ cd trustly-alpha-merchant-backend && npm run start:dev
```

## Swagger
```
http://localhost:8080/api
```