import React, { Component } from 'react';
import { connect } from 'react-redux';
import chooseNavbar from '../components/NavBar/chooseNavBar';
import {ReactComponent as Splash} from '../resources/splash.svg';
import '../styles/home.css';

const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    type: state.type
})

class Home extends Component {
    render () {
        return (
          <div>
            <div>
                {chooseNavbar(this.props.user, this.props.authenticated, this.props.type)}
            </div>
            <div id="title">
              It's time to <div style={{color:'#85B6FF', display:'inline'}}>reimagine food.</div>
            </div>
            <div id="splash" style={{height:'200px',
      width: '500px'}} className="size">
            <Splash/>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home);
