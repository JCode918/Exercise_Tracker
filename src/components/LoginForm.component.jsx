import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }

        /*this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this); */
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // Removing these two handlers, will replace with one that handle all state variables
    /*   onUsernameChange(e) {
          this.setState({
              username: e.target.value
          })
      }
  
      onPasswordChange(e) {
          this.setState({
              password: e.target.value
          })
      } */

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        //alert('Form Was Submitted: ' + this.state.username + ' ' + this.state.password)
        e.preventDefault();
        // Connect to axios to send to backend
        axios.post('/user/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    //
                    this.setState({
                        redirectTo: '/'
                    })
                }
            })
            .catch(error => {
                console.log('logoin error: ')
                console.log(error)
            })
    }

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input className="form-input"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-input"
                            placeholder="password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Signup" className="btn btn-primary" />
                    </div>
                </form>
            )
        }
    }
}