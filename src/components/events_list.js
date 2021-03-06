import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class EventsList extends Component {

  renderEvents(){
    let events = {};
    if(this.props.onSearch.length > 0){
      Object.keys(this.props.events).map(event => {
        const searchLowerCase = this.props.onSearch.toLowerCase();
        if(this.props.events[event].title.toLowerCase().includes(searchLowerCase) || this.props.events[event].description.toLowerCase().includes(searchLowerCase) ){
          events[event] = this.props.events[event];
        }
      });
    }else{
      events = this.props.events;
    }

    return Object.keys(events).map(event =>{
      let res = {};
      res[event] = events[event];
      return(
        <li
          onClick={() => this.props.onClickEvent(res)}
          key={event}
          className="list-group-item"
        >
          {events[event].title}
        </li>
      );
    })
  }

  render(){
    return(
      <div className="event-list">
        <ul className="list-group menu-scroll">
          {this.renderEvents()}
        </ul>
      </div>
    );
  }
}
