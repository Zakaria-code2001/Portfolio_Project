import React, {useState} from "react";
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LoginPage = ()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const loginUser=()=>{
        console.log(email);
        console.log(password);

        setEmail('')
        setPassword('')
    }
    return(
        <div className="container">
            <div className="form">
                <h1>Login page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder ="Enter your Email"
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
                        <Button as="sub" variant="primary" onClick={loginUser}>SignUp</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Do not have an account? <Link to ="/signup">Create One</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}
export default LoginPage