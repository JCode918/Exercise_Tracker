import React from 'react'
import axios from 'axios'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        alert('Form Was Submitted: ' + this.state.username + ' ' + this.state.password)
        e.preventDefault();
        // Connect to axios to send to backend
        axios.post('/user/login',{
            username: this.state.username,
            password: this.state.password
        })
        .then(response =>{
            console.log(response)
            if(response.data){
                console.log('Sign-Up Successful');
                console.log(response)
                this.setState({
                    redirectTo: '/login'
                })
            }else{
                console.log('Sign-Up Error')
            }
        })
        .catch(error =>{
            console.log('Sign-Up Server Error: ')
            console.log(error)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                        className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        className='form-control' />
                </div>
                <div className="form-group">
                    <input type="submit" value="Signup" className="btn btn-primary" />
                </div>
            </form>
        )
    }

}