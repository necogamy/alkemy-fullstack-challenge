import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
    const [ name, setName ] = useState('');

    const getName = async () => {
        try {
            const response = await fetch('/dashboard', {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token.alkemy.challenge.app')
                }
            });

            const jsonResponse = await response.json();

            setName(jsonResponse);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logOut = e => {
        localStorage.removeItem('token.alkemy.challenge.app');
        setAuth(false);
        toast.success('See you soon!');
    }

    useEffect(() => {
        getName();
    }, []);

    return (
        <>
            <h1>Dashboard {name}</h1>
            <button onClick={logOut}>Log out</button>
        </>
    );
}

export default Dashboard;