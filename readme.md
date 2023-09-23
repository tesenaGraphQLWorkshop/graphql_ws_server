# GraphQL Server with books running on Apollo Server & Node.JS

Purpose of this project is to practice GraphQL API Testing at Tesena <https://www.tesena.com>

This project was bootstrapped with [Create Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started). Vanilla JS, no TypeScript.

## Project Structure
### Data Files

./src/data.js

### GraphQL Schema

./src/schema.graphql

### App itself

index.js

### Required Dependencies

Node modules (will be installed from NPM as mentioned below)


## How-To
### 1. Install Git and clone repository
1. download Git from https://git-scm.com/ and install it
2. verify installation - open the commandline window (cmd) and execute `git -v`. It should display the version number.
1. using cmd, navigate to some directory you want to place this project to and execute command `git clone https://github.com/tesenaGraphQLWorkshop/graphql_ws_server`
### 1. Install NodeJS (incl. NPM)
1. download NodeJS LTS version from https://nodejs.org/en and install it
1. verify installation of NodeJS - execute `node -v`. It should display the version number.
1. verify installation of NPM (should come with NodeJS automatically) - execute `npm -v`. It should display the version number.
### 1. Install project dependencies from NPM
1. using cmd, navigate to your project directory and execute: 
`npm install`
1. verify installed packages: `npm ls`. There should be following packages displayed (the versions might differ):
    * @apollo/server@4.9.3
    * @graphql-tools/graphql-file-loader@8.0.0
    * @graphql-tools/load@8.0.0
    * @graphql-tools/schema@10.0.0
    * graphql@16.8.1
    * mutation@0.0.1
    * npm@9.6.7
    * type-graphql@2.0.0-beta.2
### 2. Start the server 
1. in the project directory, execute `npm start`. You should get message "*Server ready at: http://localhost:4000/*". 
1. Now you can open this URL in your browser and start playing with GraphQL :)

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