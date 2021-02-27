const axios = require("axios")
require("dotenv").config()

exports.handler = async event => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      err: JSON.stringify("Method not supported"),
    }
  }

  const CREATE_BOOKMARK = `
        mutation($name: String! , $url: String!, $description: String!){
            createBookmark(data: {name:$name , url:$url, description:$description} ){
                _id
                name
                url
                description
            }
        }
    `

  const {
    data: { name, url, description },
  } = JSON.parse(event.body)

  try {
    const { data } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
      data: {
        query: CREATE_BOOKMARK,
        variables: {
          name,
          url,
          description,
        },
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.log("Error: ", error)
    return {
      statusCode: 500,
      error: JSON.stringify("A problem occured"),
    }
  }
}
