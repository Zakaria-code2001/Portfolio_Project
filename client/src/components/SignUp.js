import React,{useState} from "react";
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const SignUpPage = ()=>{
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const submitForm=()=>{
        console.log("Form submitted");
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return(
        <div className="container">
            <div className="form">
                <h1>Sign UP page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder ="Enter your Username"
                        value={username}
                        name="username"
                        onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder ="Enter your email"
                        value={email}
                        name="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder ="Enter your Password"
                        value={password}
                        name="password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder ="Enter your Password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={submitForm}>SignUp</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Already have an account, <Link to ="/login">Log In</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}
export default SignUpPage