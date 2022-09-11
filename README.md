# Next.js My Ecommerce App

In order to locally run the app, a database is needed

```
docker-compose up -d
```

- -d means **detached**

## Configure environment variables

Rename file **.env.template** to **.env**

MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/ecommercedb
```

- Rebuild node modules and raise Next

```
yarn install
yarn dev
```

## Populate the database with test information

Call to:

```
http://localhost:3000/api/seed
```
