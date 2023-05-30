import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { books } from './src/data.js';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { Mutation } from 'type-graphql';

// const schemaWithResolvers = addResolversToSchema({ typeDefs, resolvers })

const typeDefs = loadSchemaSync ('./src/schema.graphql', { loaders: [new GraphQLFileLoader()] })

// Resolvers define how to fetch the types defined in your schema (obj, args, context, info) => {}

const resolvers =

{

  // this specific resolver function Author required to have nested queries (authors->books->authors)
  Author: {
          books: (parent) =>
            {
          return books.filter((book) => book.author.name === parent.name);
            }
          },

// Greeting is a simple string
// + 'allbooks' resolver function returns all books
// + allauthors: books.map(book => book.author.name = maps over the books array and extracts the name property of the author object for each book. Creates an array of author names.
// + getauthorbyBook: takes title of the book as an argument (maybe also from a select dropdown list?) and returns an author
// - GetBookDetailsFromTitle: takes title, returns book details
// + GetBooksByAuthor: takes name of an author as an argument and returns all books written by him

  Query: {
            greeting: () => 'Greetings fellow learner',
            AllBooks:() => books,
            AllAuthors: () =>
                        {
                         const uniqueAuthors = [...new Set(books.map(book => book.author.name))];
                         return uniqueAuthors.map(authorName => ({ name: authorName }));
                        },
            GetAuthorByBook: (parent, args) => {
                                               return books.
                                               filter((book) => book.title === args.title)
                                               .map((book) => book.author);
                                               },
            GetBookDetailsFromTitle: {
                                     book: (parent) => parent.title,
                                     },
            GetBooksByAuthor: (parent, args) => {
                                                return books.filter(({ author }) => author.name === args.name);
                                                },
         },                            
                          /*   Mutation: {
            addBook: async (_, { AddBookInput }) => {
              const book = new book({ AddBookInput });
              await book.save();
              return book;
            },
            
            addAuthor: async (_, { name }) => {
              const author = new author({ name });
              await author.save();
              return author;
              
            } */

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