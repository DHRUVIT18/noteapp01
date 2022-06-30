import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Errormessage from '../../components/Errormessage'
import {Loading} from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import './LoginScreen.css'
import {useDispatch,useSelector} from 'react-redux'
import {login} from "../../actions/userActions"
import {useNavigate} from "react-router-dom";
const LoginScreen = () => {


    const history=useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")

    const dispatch=useDispatch();

    const userLogin=  useSelector((state)=>state.userLogin)
    const {loading,error,userInfo}=userLogin


    useEffect(() => {
      if(userInfo){
        history('/mynotes');
      }
    
      
    }, [history,userInfo])
    



    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
    }

  return (
    <MainScreen title={"LOGIN"}>
        <div className='loginContainer'>
            {error && <Errormessage variant="danger" >Invalid Username or Password !</Errormessage> }
            {loading && <Loading/>}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        placeholder='Enter email'
                         onChange={(e)=>setemail(e.target.value)}
                        />

                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        placeholder='Enter Password'
                        onChange={(e)=>setpassword(e.target.value)}
                        />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                New Customer ? <Link to='/register'>Register Here</Link>
                </Col>
            </Row>




        </div>
    </MainScreen>
  )
}

export default LoginScreen