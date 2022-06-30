import React, { useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import './LandingPage.css'
import img from '../../background0.jpg'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const history=useNavigate();
    useEffect(() => {
        const userInfo=localStorage.getItem("userInfo");
          if(userInfo){
              history('/mynotes');
          }
      }, [history])
      



  return (
    <div className='main'>
        <Container>
            <Row>
               <div className='intro-text'>
                <div>
                    <h1 className='title'>Welcome to Note Zipper</h1>
                    <p className='subtitle'>One Safe place for all your notes</p>
                </div>
                <div className='button-container'>
                <a href='/login'>
                    <Button size='lg' className='landing-button'>Login</Button>
                </a>
                <a href='/register'>
                <Button size='lg'
                 className='landing-button'
                 variant='outline-primary'
                 >Sign Up</Button>
                </a>

                </div>
                </div>
            </Row>
        </Container>
        
        </div>
  )
}

export default LandingPage