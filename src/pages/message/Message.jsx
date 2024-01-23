import React from 'react'
import './Message.css'
import Grid from '@mui/material/Grid';
import MessageList from '../../components/message-list/MessageList';
import Friend from '../../components/message-list/Friends';


const Message = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Friend/>
        </Grid>
        <Grid item xs={8}>
            <MessageList/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Message