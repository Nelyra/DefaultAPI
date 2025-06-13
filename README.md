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

On the root of the project, create a `.env` file. You will need to set a few variables in this file. You can use the file `.example.env` as an example to understand what it looks like. Here's a rundown of every variable:

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

The API will be ran locally on [localhost:8000](http://localhost:8000).

## Running tests onto the API

We provide a series of test using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest). To start them, you use:

```bash
npm run test
```
