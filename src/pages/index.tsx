import React, { useState, useEffect } from "react"
import "./index.css"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import axios from "axios"

const index = () => {
  const [name, setName] = useState("")
  const [url, setURL] = useState("")
  const [description, setDescription] = useState("")
  const [list, setList] = useState<any>([])

  const fetchList = async () => {
    try {
      const { data } = await axios.get("/.netlify/functions/getBookmark")
      setList(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


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
        value={name}
        fullWidth
      />
      <TextField
        onChange={e => {
          setURL(e.target.value)
        }}
        className="input"
        label="URL"
        value={url}
        variant="filled"
        fullWidth
      />
      <TextField
        onChange={e => {
          setDescription(e.target.value)
        }}
        className="input"
        label="Description"
        value={description}
        rows={5}
        multiline
        variant="filled"
        fullWidth
      />
      <Button onClick={async ()=>{
        await axios.post('/.netlify/functions/createBookmark', {
          data:{
            name,
            url,
            description
          }
        })
        setName("")
        setURL("")
        setDescription("")
        fetchList()

      }} className="add-btn" variant="contained" color="primary">
        Add
      </Button>
      {list && list.map((b,i) => {
        return (
          <div  key={i} className="bookmark-card">
            <h2 className="bookmark-name">{b.name}</h2>
            <a className="bookmark-url" href={b.url}>
              {b.url}
            </a>
            <p className='bookmark-para' >{b.description}</p>
            <Button
              className="delete-btn"
              variant="contained"
              color="secondary"
              onClick={
                 async () =>{
                   await axios.delete('/.netlify/functions/deleteBookmark' , {
                     data:{
                       id: b._id
                     }
                   })
                fetchList()
                 }
              }
            >
              Remove
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default index
