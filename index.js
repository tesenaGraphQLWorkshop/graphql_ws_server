import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { books } from './src/data.js';
//import { importSchema } from 'graphql-import';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// const typeDefs = importSchema ('./src/schema.graphql');

const typeDefs = loadSchemaSync ('./src/schema.graphql', { loaders: [new GraphQLFileLoader()] })

//const schemaWithResolvers = addResolversToSchema({ typeDefs, resolvers })


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
            allbooks:() => books,
            allauthors: () => authors,
            //getAuthorByBook: {book:() => { return parent.name}}
            //getAuthorByBook: {author(parent) {return [parent.author]}}
           }

  };


  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer (
      {
      typeDefs: typeDefs,
      resolvers,
      //mutation,
      introspection:true
      }
                                );
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer
  (server,
    {
    listen: { port: 4000 },
    }
  );
  
  console.log(`Server ready at: ${url}`);