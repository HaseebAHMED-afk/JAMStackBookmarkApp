import React from 'react'
import './index.css'
import TextField from '@material-ui/core/TextField'
import  Button from '@material-ui/core/Button'


const index = () => {


    return (
        <div className='app' >
            <h1 className='main-heading' >Bookmark App</h1>
            <p className='main-para' >Track a list of your favorite websites</p>
            <TextField className='input' label="Name" variant="filled" fullWidth />
            <TextField className='input' label="URL" variant="filled" fullWidth />
            <TextField className='input' label="Description" rows={5} multiline variant="filled" fullWidth  />
            <Button className='add-btn' variant='contained' color='primary' >Add</Button>
            <div className='bookmark-card' >
               <h2 className='bookmark-name' >BookMarkCard</h2>
               <a className='bookmark-url' href="#" >https://www.agame.com</a> 
               <Button className='delete-btn' variant='contained' color='secondary' >Remove</Button>
            </div>
        </div>
    )
}

export default index
