import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
    const [ inputs, setInputs ] = useState({
        email: '',
        password: ''
    });

    const onInputChange = e => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const { email, password } = inputs;

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const jsonResponse = await response.json();

            if (jsonResponse.token) {
                localStorage.setItem('token.alkemy.challenge.app', jsonResponse.token);

                setInputs({
                    email: '',
                    password: ''
                });
                
                setAuth(true);
                toast.success('Logged in sucessfully');
            } else {
                setAuth(false);
                toast.error(jsonResponse);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type='email' 
                    name='email' 
                    placeholder='email' 
                    value={inputs.email} 
                    onChange={onInputChange} 
                />
                <input 
                    type='password' 
                    name='password' 
                    placeholder='password' 
                    value={inputs.password} 
                    onChange={onInputChange} 
                />
                <input type='submit' />
            </form>
            <Link to='/register'>Sign up</Link>
        </>
    );
}


export default Login;