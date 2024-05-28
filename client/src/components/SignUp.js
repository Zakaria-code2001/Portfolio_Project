    import React,{useState} from "react";
    import {Form,Button,Alert} from 'react-bootstrap'
    import {Link} from 'react-router-dom';
    import{useForm} from 'react-hook-form'

    const SignUpPage = ()=>{


    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();

    const submitForm=(data)=>{

        if(data.password === data.confirmPassword){

        const body = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        const requestOptions={
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/auth/signup',requestOptions)
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        reset()
    }
    else {
        alert("Passwords do not match")
    }
    }



    return(
    <div className="container">
        <div className="form">
            <h1>Sign UP page</h1>
            <form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder ="Enter your Username"
                    {...register("username",{required:true,maxLength:80})}
                    />
                    <br></br>
                {errors.username && <span style = {{color: "red"}}><small>Username is required</small></span>}

                {errors.username?.type==="maxLength"&&<p style={{color : "red"}}><small>Max characters should be 80</small></p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder ="Enter your email"
                    {...register("email",{required:true,maxLength:320})}
                    />
                    <br></br>
                {errors.email && <p style = {{color: "red"}}><small>Email is required</small></p>}

                {errors.email?.type==="maxLength"&&<p style={{color : "red"}}><small>Max characters should be 80</small></p>}
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder ="Enter your Password"
                    {...register("password",{required:true,minLength:8})}
                    />
                    <br></br>
                {errors.password && <p style = {{color: "red"}}><small>Password is required</small></p>}
                <br></br>
                {errors.password?.type==="minLength"&&<p style={{color : "red"}}><small>Min characters should p</small></p>}
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder ="Enter your Password"
                    {...register("confirmPassword",{required:true,minLength:8})}
                    />
                    <br></br>
                {errors.confirmPassword && <p style = {{color: "red"}}><small>Confirm Password is required</small></p>}
                <br></br>
                {errors.confirmPassword?.type ==="minLength"&&<p style ={{color : "red"}}><small>Min characters should be 80</small></p>}
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>SignUp</Button>
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