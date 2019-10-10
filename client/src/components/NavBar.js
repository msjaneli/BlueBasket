import React, { Component } from 'react';

class NavBar extends React.Component{
  render() {
    return (
      <div>
        <ul id="nav">
          <li><a href="#">Meals</a></li>
          <li><a href="#">Donate</a></li>
          <li><a href="#">Cart</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>
    );
  }
}

export default NavBar;

