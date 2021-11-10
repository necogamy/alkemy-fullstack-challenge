import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

const Register = ({ setAuth }) => {
    const [ inputs, setInputs ] = useState({
        email: '',
        password: '',
        name: ''
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
            const { email, password, name } = inputs;

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const jsonResponse = await response.json();

            if (jsonResponse.token) {
                localStorage.setItem('token.alkemy.challenge.app', jsonResponse.token);

                setInputs({
                    email: '',
                    password: '',
                    name: ''
                });
                
                setAuth(true);
                toast.success('Registered sucessfully');
            } else {
                setAuth(false);
                toast.error(jsonResponse);
            }
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type='text' 
                    placeholder='name' 
                    name='name'
                    value={inputs.name}
                    onChange={onInputChange}
                />
                <input 
                    type='email' 
                    placeholder='email' 
                    name='email' 
                    value={inputs.email}
                    onChange={onInputChange}
                />
                <input 
                    type='password' 
                    placeholder='password' 
                    name='password'
                    value={inputs.password}
                    onChange={onInputChange}
                />
                <input 
                    type='submit'
                />
            </form>
            <aside>
                <p>Have an account?</p>
                <Link to='/login'>Log in</Link>
            </aside>
        </div>
    );
}

export default Register;