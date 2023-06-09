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
  // its logic is as follows:
  // For the type Author it defines how 'books' should be resolved => 
  // (parent) is an Author, received as an input argument
  // filter() goes thru array of books and filters those that satisfy condition
  // book.author.name === parent.name


  Author: {
          books: (parent) =>
            {
          return books.filter((book) => book.author.name === parent.name);
            }
          },

// greeting returns a simple string

// AllBooks resolver function returns full array of books

// AllAuthors:
// had to be created like this because its not a const
// books.map(book => book.author.name) - goes thru the array of books and fetches book.author.name
// ..new Set() then puts it into a new Set, achieving uniqueness of values
// then uniqueAuthors.map(authorName => ({ name: authorName })) goes thru an array of author names
// and stores each of them in a varible authorName
// then map assigns array of authorNames to the uniqueAuthors.name array

// GetAuthorByBook:
// books.filter goes thru all books, checks when an argument equals book.title and stores them in a new array
// then map((book) => book.author goes thru filtered array and extracts book.author property

// GetBookDetailsFromTitle:
// takes title as an argument and returns all other details
// if we are sure that only one object will be returned, not an array, then we can change the method
// filter() to method find() and change the return type from [Book] to Book in query definition in schema.graphql

// GetBooksByAuthor
// goes thru books and field authors 
// checks when author.name === args.name and stores them in a new array
// returns the array of books


  Query: {
            greeting: () => 'Greetings fellow learner',
            AllBooks:() => books,
            AllAuthors: () =>
                        {
                         const uniqueAuthors = [...new Set(books.map(book => book.author.name))];
                         return uniqueAuthors.map(authorName => ({ name: authorName }));
                        },
            GetAuthorByBook:
            (parent, args) =>
                              {
                               return books.filter(( book ) => book.title === args.title).map((book) => book.author);
                              },
            GetBookDetailsFromTitle:
            (parent, args) =>
                              {
                              return books.filter(( book ) => book.title === args.title) || null;
                              },
            GetBooksByAuthor:
            (parent, args) => {
                              return books.filter(({ author }) => author.name === args.name);
                              },
         },                            
                          
  Mutation :     { AddBook:  
        (parent, args) => { 
          const newBook=args.input;
        const lastId = books[books.length-1].id;
        console.log(lastId);
        newBook.id = lastId+1;
        books.push(newBook);
        return newBook; 
        }
      }
};

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer (
      {
      typeDefs: typeDefs,
      resolvers,
      //npm startMutation,
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