import React, { Component } from 'react';
import { builtinModules } from 'module';
import NavBar from '../components/NavBar'
import '../styles/navbar.css'

class Home extends Component {
    render () {
        return (
            <div>
              <NavBar />
            </div>
        )
    }
}

export default Home
