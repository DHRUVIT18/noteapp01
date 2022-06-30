import React, { useState,useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Errormessage from '../../components/Errormessage';
import {Loading} from '../../components/Loading';
import MainScreen from '../../components/MainScreen'
import {useDispatch,useSelector} from "react-redux"
import { register } from '../../actions/userActions';

const RegisterScreen = () => {



    const history=useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [pic, setpic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")

    const [message, setmessage] = useState(null)
    const [picmessage, setpicmessage] = useState(null)
    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister;

    useEffect(() => {
      if(userInfo){
        history('/mynotes');
      }
    }, [history,userInfo])
    

    const submitHandler= async (e)=>{
        e.preventDefault();
        if(password!==confirmpassword){
            setmessage("Passwords do not match");
        }else{
            dispatch(register(name,email,password,pic));
        }
       
    }
    



    const postdetails=(pics)=>{
        if(!pics){
            return setpicmessage("Please Select an Image");
        }
        setpicmessage(null)
        if(pics.type==='image/jpeg' || pics.type==='image/png'){
            const data=new FormData();
            data.append('file',pics);
            data.append('upload_preset','notezipper');
            data.append('cloud_name','dhruvit18');
            fetch("https://api.cloudinary.com/v1_1/dhruvit18/image/upload",{
                method:"post",
                body:data,
            }).then((res)=>res.json())
              .then((data)=>{
                console.log(data);
                setpic(data.url.toString());
              })
              .catch((err)=>{
                console.log(err);
              })
        }else{
            return setpicmessage("Please Select an Image");

        }
    }


  return (
    <MainScreen title={"REGISTER"} >
         <div className='loginContainer'>
            {error && <Errormessage variant="danger" >{error}</Errormessage> }
            {message && <Errormessage variant='danger'>{message}</Errormessage>}
           {loading && <Loading/>}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        value={name}
                        placeholder='Enter name'
                         onChange={(e)=>setname(e.target.value)}
                        />

                </Form.Group>
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={confirmpassword}
                        placeholder='Confirm Password'
                        onChange={(e)=>setconfirmpassword(e.target.value)}
                        />
                </Form.Group>
                {picmessage &&(
                    <Errormessage variant='danger'>{picmessage}</Errormessage>
                )}
                <Form.Group controlId='pic'>
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.File
                    onChange={(e)=>postdetails(e.target.files[0])}
                    id="custom-file"
                    type="image/png"
                    label="Upload Profile Picture"
                    custom/>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        
        </div>
    </MainScreen>
  )
}

export default RegisterScreen