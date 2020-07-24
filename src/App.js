import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import {Navbar} from 'react-bootstrap'

// importing Components
/* import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component"
import EditExercise from "./components/edit-exercises.component"
import CreateExercise from "./components/create-exercise.component"
import CreateUser from "./components/create-user.component"
import SignUp from "./components/sign-up.component"
 */
// New Components
import Signup from './components/Signup.component'
import LoginForm from './components/LoginForm.component'
import NavbarNew from './components/navbarNew.component'
import Home from './components/home-component'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount= this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)

  }

  componentDidMount() {
    this.getUser()
  }
 
  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('http://localhost:5000/users/').then(response => {
      console.log('Get user Rsponse: ')
      console.log(response.data)

      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user')
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    }).catch(err => console.log('There is an ERRORR!!', err))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavbarNew updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* gret user if logged in */}
          {this.state.loggedIn &&
            <p>Join the party, {this.state.username}!</p>
          }
          {/* Routes to different components*/}

          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
          <Route exact path="/signup" render={() => <Signup />} />
        </Router>

      </div>
    )

  }

}

export default App;
