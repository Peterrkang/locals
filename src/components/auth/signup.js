import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


class SignUp extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return(
      <form className="login-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label style={{"color":"#f9eee0"}}>Email:</label>
          <input className="form-control" {...email}/>
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label style={{"color":"#f9eee0"}}>Password:</label>
          <input className="form-control" type="password" {...password}/>
          {password.touched && password.error && <div className="error"> {password.error} </div>}
        </fieldset>
        <fieldset className="form-group">
          <label style={{"color":"#f9eee0"}}>Confirm Password:</label>
          <input className="form-control" type="password" {...passwordConfirm}/>
          {passwordConfirm.touched && passwordConfirm.error && <div className="error"> {passwordConfirm.error} </div>}
        </fieldset>
        {this.renderAlert()}
        <div className="centered">
          <button action="submit" className="btn btn-primary"> Sign Up!</button>
        </div>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if(formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords Must Match';
  }
  if (!formProps.email) {
    errors.email = 'Please Enter an Email';
  }
  if (!formProps.password) {
    errors.password = 'Please Enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please Enter a password';
  }
  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error};
}


export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(SignUp);
