const axios = require("axios")
require("dotenv").config()

exports.handler = async event => {

  const GET_BOOKMARK = `
        query{
            getBookmark{
                data{
                _id
                name
                url
                description
            }
            }
        }
    `


  try {
    const { data:{data} } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
      data: {
        query: GET_BOOKMARK
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(data.getBookmark),
    }
  } catch (error) {
    console.log("Error: ", error)
    return {
      statusCode: 500,
      error: JSON.stringify("A problem occured"),
    }
  }
}
