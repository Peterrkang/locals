import React, { Component } from 'react';
import Messages from './messages';
import ChatForm from './chat_form';
import { messageRef } from '../database';
import { connect } from 'react-redux';
import { fetchChatRoom } from '../actions';



class ChatRoom extends Component{

  componentWillMount(){
    this.props.fetchChatRoom(this.props.params.id);
  }

  componentWillUnmount(){
    messageRef.off();
  }

  render(){
    const user = localStorage.getItem('user');
    return(
      <div className="chat-room">
        <div className="container-fluid">
          <Messages messages={this.props.chat} currentUser={user}/>
          <ChatForm eventId={this.props.params.id} user={user} />
        </div>
      </div>

    );
  }
}

function mapStateToProps({ chat }){
  return { chat };
}


export default connect(mapStateToProps, { fetchChatRoom })(ChatRoom);
