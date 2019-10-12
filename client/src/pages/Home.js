import React, { Component } from 'react';
import { builtinModules } from 'module';
import NavBar from '../components/NavBar'
import '../styles/navbar.css'
import FacebookLogin from '../components/Facebook'

class Home extends Component {
    render () {
        return (
            <div>
              <NavBar />
              <FacebookLogin />
            </div>
        )
    }
}

export default Home
