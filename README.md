Meow. J'aime les API.

> RESTful API built with Express.js

## Installation

First, clone the project 

```bash
git clone git@github.com:Nelyra/DefaultAPI.git
```

Then install the npm dependencies using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
cd ./DefaultAPI
npm i -y
npm install
```

This will download every node package necessary for the API to be up and ready.

### Setting up the environnement secrets

On the root of the project, **create a `.env` file**. You will need to set a few variables in this file. You can use the file `.example.env` as an example to understand what it looks like. Here's a rundown of every variable:

| Variable | Usage |
| --- | --- |
| SECRET_KEY | The key used to encrypt every password stored on the database. |
| DB_HOST | The base URI of your database |
| DB_USER | The user logging used by the API |
| DB_PASSWORD | The corresponding password to DB_USER |
| DB_NAME | Which Database will be used to store data |

**Make sure that the database variables indicated in this file corresponds to the ones who will be used when doing SQL requests.**

### Setting up the database.

Our project does not automatically create a database for you, you will need to run the setup script yourself.
The setup script is the file named `/bdd/money.sql`. Copy the entierity and run it.

> If a previous project using the same Database structure was existing on this Database, you can run the script again, and it clear every table for you.

Before running the API, make sure that your **Database engine is running properly**.

## Running the API locally

You can now run the API using a simple command:

```bash
npm run start
```

The API will be ran locally on [localhost:8000](http://localhost:3000).

## Running automatic tests onto the API

⚠️ The tests are **deprecated**. We made sure they are still working for the most basic routes, but they will not supply most extensive testing (i.e. 403 FORBIDDEN requests)

We provide a series of test using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest). To start them, you use:

```bash
npm run test
```

## Running manually tests onto the API

You can also run your own test using Postman or any other testing application you wish for the URIs. You can find a dedicated Postman collection to save you the trouble of writing the tests.

The file is located in `test/tests.postman_collection.json`.

Make sure to first use the `POST /authenticate` route when logging in as a specific user, and then saving the response token as an Authorization bearer. When using our own set of tests, you can save this token in the Collection variable **\{{access-token}}**.

In our case, the \{{base-url}} variable should be set as `http://localhost:3000`.

## Directory structure

```
root
├─ repositories/
├─ routes/
├─ services/
├─ test/
├─ app.js
├─ auth.js
└─ mysql.js
```

### 📁 /repositories

The **repositories** folder stores every SQL request that will interact with the SQL Database.

### 📁 Routes

Each file in the **routes** folder is a base route of the API.

### 📁 Services

The **services** folder handles the data processing and acts as a middle ground between the `/routes` folder and the `/repositories` folder.

### 📁 Test

The test folder is used for every `.test.js` file. They are ran when doing the `npm run test` command with Jest.

### 📄 app.js

Base file for the application.

### 📄 auth.js

Contains the functions that handles the authentification of the user by verifying its token.

### 📄 mysql.js

Every process that contributes to the connection to the SQL database.

## Contributors

| Student | Github |
| --- | --- |
| Leevan DAVID | [namuuu](https://github.com/namuuu) |
| Augustin MORICEAU | [Nelyra](https://github.com/Nelyra) |
| Jérôme DEVIENNE | [JDevienne](https://github.com/Jdevienne) |
