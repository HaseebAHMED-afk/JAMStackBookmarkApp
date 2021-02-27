const { ApolloServer , gql } = require('apollo-server-lambda');
const faunadb = require('faunadb')
const faunaQuery = faunadb.query;
require('dotenv').config();


var client = new faunadb.Client({
    secret:process.env.FAUNADB_SECRET
})

const typeDefs = gql `
    type Query{
        getBookmark: [Bookmark]
    }
    type Bookmark{
        id: ID!
        url: String!
        name: String!
        description: String!
    }
    type Mutation{
        addBookmark(
            url: String!
            name: String!
            description:String!
        ): Bookmark

        deleteBookmark(id: ID!) : Bookmark
    }
`

const resolvers = {
    Query: {
        getBookmark: async (root , args, context) => {
            try {
                var result = await client.query(
                    faunaQuery.Map(
                        faunaQuery.Paginate(
                            faunaQuery.Match(faunaQuery.Index("bookmarkUrl"))
                        ),
                        faunaQuery.Lambda((x) => faunaQuery.Get(x))
                    )
                )

                return result.data.map((item) => {
                    return{
                        id: item.ref.id,
                        url: item.data.url,
                        name: item.data.name,
                        description: item.data.description
                    }
                })
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    },
    Mutation: {
        addBookmark: async (_ , {url , description , name }) => {
            try {
                var result = await client.query(
                    faunaQuery.Create(
                        faunaQuery.Collection("bookmarks") , 
                        {data: {
                            url,
                            description,
                            name
                        }}
                    )
                    
                )
                console.log("Document Created:   " , result)
                return result.ref.data
            } catch (error) {
                console.log("error: ",error);
            }
            console.log("URL: " ,url, "Description: ",description);
        },
        deleteBookmark: async (_ , id) =>{
            try {
                const result = await client.query(
                    faunaQuery.Delete(
                        faunaQuery.Ref(faunaQuery.Collection("bookmarks"), id.id)
                    )
                )

                console.log('Document deleted: ', result.ref.id);
                return result.ref.data;

            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})