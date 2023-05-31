# GraphQL Server with books running on Apollo Server & Node.JS

This project was bootstrapped with [Create Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started).
Vanilla JS, no TypeScript (though it'd be preferable).


In the project directory, you can run:

### `npm start`


## Data files

./src/data.js

## GQL schema

./src/schema.graphql

## App itself

index.js

## Required dependencies

npm
related node modules (excluded from the repo, run "npm install" which will install all modules listed as dependencies in package.json.)


## How-To

1. Use some IDE, e.g. VS Code
2. install git
3. install nodejs (18.16.0 as of 31.05.2023)
4. install npm (^9.6.7 as of 31.05.2023)
5. gql imports:
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'