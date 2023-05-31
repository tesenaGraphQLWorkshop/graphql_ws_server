# GraphQL Server with books running on Apollo Server & Node.JS

This project was bootstrapped with [Create Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started).

Vanilla JS, no TypeScript (though it'd be preferable).

<https://www.tesena.com>

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
related node modules (excluded from the repo, run "npm install" which will install all modules listed as dependencies in the package.json file)


## How-To

1. Use some IDE, e.g. VS Code
2. install git
3. install nodejs (18.16.0 as of 31.05.2023)
4. install npm (^9.6.7 as of 31.05.2023)
5. gql imports ("npm install @apollo/server")

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'


## To-Dos / Nice-to-Haves

as of 31.05.2023

1. fix GetBookDetailsFromTitle - **fixed**
2. understand why input variables in "" dont disappear, in queries like 456 with input arguments allow search for an incomplete string smth like
    export const allUsersQuery = `
     query allUsers($UserName: String!){
     allUsers(
       filter: {first_name_contains: $UserName}
     ) {
       id
       first_name
       ...INSERT_OTHER_FIELDS_HERE...
     }
     }
     `;
3. Add more fields to an author, not only name, maybe date-of-birth?
4. create a duplicate book? maybe also the same book with just a different binding type?
5. Link GetAuthorByBook arguments to a front-end
6. move resolvers to a separate data file
7. define more queries?
8. create mutations for adding a book
9. create mutations for adding an author
10. create subscriptions
11. OPTIONAL - attach at least one additional data source, e.g. data file
12. together with #11, create a data source called 'libraries', which will cover book statuses