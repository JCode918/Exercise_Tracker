import React, { Component } from 'react'
//import { Redirect } from 'react-router-dom'
//import { Route, Link } from 'react-router-dom'
import {Link} from 'react-router-dom'
import logo from '../../src/logo.svg'
import '../App.css';
import axios from 'axios'

class NavbarNew extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this)
    }

    logout(e) {
        e.preventDefault()
        console.log('Logging out')
        axios.post('http://localhost:5000/users/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        })
            .catch(error => {
                console.log('Logout Error')
            })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props)

        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    <div className="col-4">
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">Logout</span></Link>
                            </section>
                        ) :
                            (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">Sign Up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-autp">
                        <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">MERN Passport</h1>
                    </div>
                </header>
            </div>
        )
    }
}

export default NavbarNew