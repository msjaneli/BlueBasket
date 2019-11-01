import React from 'react'

// Components
import { Container , Col, Row } from 'react-bootstrap';

// Tools
import Lottie from 'react-lottie';
import notFoundAnimationData from '../resources/lotties/errors/3146-404page.json'

const animationOptionsNotFound= {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimationData,
      preserveAspectRatio: 'xMidYMid slice'
}

const Notfound = () => (
        <div>
                <p style={{fontSize: '40px', fontWeight: 'bold', marginTop: '1rem', fontColor: "#AFAFAF"}}>Oops!</p>
                <p>We can't seem to find what you're looking for...</p>
                <Lottie style={{marginTop: '-5.25rem'}} options={animationOptionsNotFound} />
        </div>
)
export default Notfound
