import React, { useState } from "react"
import "./index.css"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useQuery , useMutation } from '@apollo/client'
import gql from 'graphql-tag'




const BOOKMARKS = gql `
    {
        getBookmark{
            id
            name
            description
            url
        }
    }
`;


const ADD_BOOKMARK = gql `
    mutation addBookmark($url: String! , $name: String!, $description: String!){
        addBookmark(
            url: $url
            description: $description
            name: $name
        ){
            url
        }
    }
`

const REMOVE_BOOKMARK = gql`
    mutation deleteBookmark($id: ID!){
        deleteBookmark(id: $id){
            id
        }
    }
`


const index = () => {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [description, setDescription] = useState("")
  const {data,loading,error} = useQuery(BOOKMARKS)
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const [removeBookmark] = useMutation(REMOVE_BOOKMARK);

  return (
    <div className="app">
      <h1 className="main-heading">Bookmark App</h1>
      <p className="main-para">Track a list of your favorite websites</p>
      <TextField
        onChange={e => {
          setName(e.target.value)
        }}
        className="input"
        label="Name"
        variant="filled"
        fullWidth
      />
      <TextField
        onChange={e => {
          setLink(e.target.value)
        }}
        className="input"
        label="URL"
        variant="filled"
        fullWidth
      />
      <TextField
        onChange={e => {
          setDescription(e.target.value)
        }}
        className="input"
        label="Description"
        rows={5}
        multiline
        variant="filled"
        fullWidth
      />
      <Button onClick={
          () => {
              addBookmark({variables:{
                  url: link,
                  name: name,
                  description: description
              }})
          }
      } className="add-btn" variant="contained" color="primary">
        Add
      </Button>
      <div className="bookmark-card">
        <h2 className="bookmark-name">BookMarkCard</h2>
        <a className="bookmark-url" href="#">
          https://www.agame.com
        </a>
        <Button className="delete-btn" variant="contained" color="secondary">
          Remove
        </Button>
      </div>
    </div>
  )
}

export default index
