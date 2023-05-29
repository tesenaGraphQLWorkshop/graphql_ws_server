import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { books } from './src/data.js';
//import { importSchema } from 'graphql-import';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'


// const typeDefs = importSchema ('./src/schema.graphql');
//const schemaWithResolvers = addResolversToSchema({ typeDefs, resolvers })

const typeDefs = loadSchemaSync ('./src/schema.graphql', { loaders: [new GraphQLFileLoader()] })

// Resolvers define how to fetch the types defined in your schema (obj, args, context, info) => {}

const resolvers = {
  
  BookBinding_enum: {
            PAPERBACK: 'PAPERBACK',
            HARDCOVER: 'HARDCOVER'
           },

  // BookStatus_enum {
  //          AVAILABLE:'AVAILABLE',
  //          UNAVAILABLE:'UNAVAILABLE'
 //},
   
  
// greeting is a simple string
// Resolver function 'allbooks' returns all books
// allauthors: books.map(book => book.author.name = maps over the books array and extracts the name property of the author object for each book. Creates an array of author names.
// getauthorbyBook: takes title of the book as an argument (from a select list maybe) and returns an author
// bookfromtitle: takes title, returns author

  Query: {
            greeting: () => 'Greetings fellow learner',
            allbooks:() => books,
            allauthors: () =>
                        {
                         const uniqueAuthors = [...new Set(books.map(book => book.author.name))];
                         return uniqueAuthors.map(authorName => ({ name: authorName }));
                        },
                          
            getAuthorByBook: {
                            author: (parent) => parent.author,
                             },
            bookfromtitle: {
                            book: (parent) => parent.title,
                           },
                           GetBooksByAuthors: (parent, args) => {
                            return books.filter(({ author }) => author.name === args.name);
                          },              
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