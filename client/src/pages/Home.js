import React, { Component } from 'react';
import {ReactComponent as Splash} from '../resources/splash.svg';
import Trash from '../resources/trash.png';
import Rocket from '../resources/rocket.png';
import Pizza from '../resources/pizza.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/home.css';

class Home extends Component {
    render () {
        return (
            <div>
              <div id="page1">
              </div>
                <div id="splash-page">
                  <Col>
                    <div>
                      <Row>
                        <div id="title">
                          Food reimagined.
                        </div>
                      </Row>
                      <Row>
                        <div id="caption">
                          <hr id="hr"/>
                          <div className="underline-text">Up to 40%</div> of all food in America is never eaten. Yet, <div className="e">1 in 8 households</div> worry about where their next meal is coming from. <div className="e">It's time to do our part.</div>
                        </div>
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div id="splash" alt="splash" className="size">
                      <Splash />
                    </div>
                  </Col>
                </div>
              <div id="page2">
                <Container id="container">
                  <Row id="header">
                  <Col id="col1">The Problem<hr id="col1-hr"/></Col>
                  <Col id="col2">Our Mission<hr id="col2-hr"/></Col>
                  <Col id="col3">Your Role<hr id="col3-hr"/></Col>
                </Row>
                <Row id="image">
                  <Col><img src={Trash} /></Col>
                  <Col><img src={Rocket} /></Col>
                  <Col><img src={Pizza} /></Col>
                </Row>
                <Row>
                  <Col>
                    <div><p className="col-text">We live a world where food waste and hunger coexist. At the end of the day, restaurants are forced to trash uneaten leftovers. At the same time, residents who cannot afford food go hungry.</p></div>
                    <div><p className="col-text"> On Duke's campus, students are left with hundreds of food points at the end of each semester while Durham suffers a poverty rate above both the national average.</p></div>
                    <div><p className="col-text">What if there was a way we could redistribute this food in a way that mutually benefits everyone involved?</p></div></Col>
                  <Col>
                    <div><p className="col-text">We work with restaurants on Duke campus to provide alternative options for food waste. Towards closing time, restaurants pack their leftovers into prepped meal boxes and list them on our platform to sell for a discounted price. </p></div>
                    <div><p className="col-text">Meanwhile, we connect Duke students with local shelters by providing students with a quick solution to get rid of their extra food points in a way that they know they are supporting positive change.</p></div></Col>
                    <Col>
                      <div id="role-one">
                        <p className="col-text">
                          <h2 className="role-header">As a Durhamite...</h2>
                            If you're every feeling hungry towards the end of our night, consider one of our options. It's a win-win: the same delicious food at a fraction of the cost. So... what are you waiting for?
                        </p>
                      </div>
                        <p className="col-text">
                          <h2 className="role-header">As a Duke student...</h2> 
                            Pay your extra food points forward. All food points donated go directly into funds that allow local shelters to redeem free meals for their residents.
                        </p>
                    </Col>
                </Row>
                </Container>
              </div>
            </div>
        )
    }
}

export default Home;
