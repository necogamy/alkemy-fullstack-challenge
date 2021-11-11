import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './style.css';
import Operation from '../operation/Operation';

const Dashboard = ({ setAuth }) => {
    const [ name, setName ] = useState('');
    const [ operations, setOperations ] = useState([]);
    const [ balance, setBalance ] = useState(0);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/dashboard', {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token.alkemy.challenge.app')
                }
            });

            const jsonResponse = await response.json();

            setBalance(jsonResponse.balance);
            setName(jsonResponse.user[0].name);
            setOperations(jsonResponse.operations);
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
        fetchUserData();
    }, []);

    return (
        <div className='dashboard'>
            <h1>Dashboard {name}</h1>
            <h2>Balance actual: {balance}</h2>
            <section>
                {
                    operations.map(operation => <Operation operation={operation} />)
                }
            </section>
            <section>
                <button onClick={logOut}>Log out</button>
                <button>Operations</button>
            </section>
        </div>
    );
}

export default Dashboard;