import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Event extends Component {

  render() {
    if(!this.props.activeEvent) {
      return <div>Select a event to get started.</div>;
    }
    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.activeEvent.title}</div>
        <div>Description: {this.props.activeEvent.description}</div>
        <Link to={`/events/${this.props.activeEvent.id}/chatroom`} params={{id:this.props.activeEvent.id}}>
          Chat With Community
        </Link>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { activeEvent: state.activeEvent };
}

export default connect(mapStateToProps)(Event);