import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from '../index';
import { Provider } from 'react-redux';
import SignIn from './auth/signin';
import EventForm from './event_form';
import { connect } from 'react-redux';


class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.addEventListener('click', this.handleClick, false);
    document.body.appendChild(this.modalTarget);
    this._render();
  }


  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  handleClick = (e) =>{
    if(!ReactDOM.findDOMNode(this.modalTarget).contains(e.target)){
      this.props.onClose();
    }
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>
        <div className="container-fluid">
          <EventForm onClose={this.props.onClose.bind(this)}/>
        </div>
      </Provider>,
      this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

function mapStateToProps(state){
  return{
    modal: state.modal
  }
}

export default connect(mapStateToProps)(Modal);
