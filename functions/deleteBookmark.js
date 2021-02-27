const axios = require("axios")
require("dotenv").config()

exports.handler = async event => {
  if (event.httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      err: JSON.stringify("Method not supported"),
    }
  }

  const DELETE_BOOKMARK = `
        mutation($id: ID!){
            deleteBookmark(id: $id){
                _id
            }
        }
    `

  const { id } = JSON.parse(event.body)

  try {
    const { data } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
      data: {
        query: DELETE_BOOKMARK,
        variables: {
          id
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
