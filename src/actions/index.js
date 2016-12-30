import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_EVENTS,
  NEW_EVENTS,
  SELECTED_EVENT,
  FETCH_CHATROOM,
  ADD_MESSAGE
 } from './type'


const ROOT_URL = 'http://localhost:3000';
const TOKEN_CONFIG = {
  headers: { Authorization: localStorage.getItem('token') }
};

export function signinUser({ email, password }) {
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/events');
      })
      .catch(()=> {
        dispatch(authError("Bad Login Info"));
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function signupUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/events');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error))
      });
  }
}


export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchEvents(){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/events`, TOKEN_CONFIG)
    .then(response => {
        dispatch({
          type: FETCH_EVENTS,
          payload: response.data
        });
    });
  }
}

export function createEvent({title, address, description}, {lat, lng}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/events`, { title, address, description, lat, lng }, TOKEN_CONFIG)
      .then(response => {
        dispatch({ type: NEW_EVENTS });
        browserHistory.push('/events');
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function selectEvent(event){
  return {
    type: SELECTED_EVENT,
    payload: event
  };
}

export function fetchChatRoom(id){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/events/${id}/chatroom`, TOKEN_CONFIG)
    .then(response => {
        dispatch({
          type: FETCH_CHATROOM,
          payload: response.data
        });
    });
  }
}

export function addMessage({message, id, user}){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/events/${id}/chatroom`,{ message, id } , TOKEN_CONFIG)
    .then(() => {
        dispatch({
          type: ADD_MESSAGE,
          payload: { message, user, id }
        });
    });
  }

}