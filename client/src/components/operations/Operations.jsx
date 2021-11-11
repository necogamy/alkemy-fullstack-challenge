import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Operation from '../operation/Operation';
import { toast } from 'react-toastify';

const Operations = () => {
    const [ operations, setOperations ] = useState([]);
    const [ filter, setFilter ] = useState('INGRESO');
    const [ selectTypeInput,  setSelectTypeInput ] = useState('INGRESO');
    const [ categoryFilter, setCategoryFilter ] = useState('All');
    const [ operationAdded, setOperationAdded ] = useState(false);


    const onSelectFormChange = e => {
        setSelectTypeInput(e.target.value);
    }

    const onSelectChange = e => {
        setCategoryFilter(e.target.value);
    }

    const onFormSubmit = async e => {
        e.preventDefault();

        try {
            const prepareRequest = {
                concept: e.target.children[1].value || null,
                amount: Number(e.target.children[2].value),
                date: e.target.children[3].value,
                type: e.target.children[4].value
            }
            prepareRequest.category = !e.target.children[5].disabled && e.target.children[5].value;
    
            const request = await fetch('/api/operations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token.alkemy.challenge.app')
                },
                body: JSON.stringify(prepareRequest)
            });
    
            const jsonResponse = await request.json();
            setOperationAdded(true);
            toast.success(jsonResponse);
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    const fetchData = async () => {
        try {
            const request = await fetch('/api/operations', {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token.alkemy.challenge.app')
                }
            });

            const jsonResponse = await request.json();

            setOperations(jsonResponse.operations);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchData();
        return setOperationAdded(false);
    }, [ operationAdded ]);

    return (
        <div className='operations'>
            <form onSubmit={onFormSubmit}>
                <h2>Create an operation</h2>
                <textarea style={{resize: 'none'}} maxLength='256' placeholder='Concept' ></textarea>
                <input type='number' placeholder='Amount' min='0' max='999999999999999' required />
                <input type='date' required />
                <select name="select" onChange={onSelectFormChange}>
                    <option value="INGRESO" selected>Ingreso</option>
                    <option value="EGRESO">Egreso</option>
                </select>
                <select name="select-two" disabled={selectTypeInput === 'INGRESO' ? true : false}>    
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Otro" selected>Otro</option>
                </select>
                <input type='submit' value='Add operation' />
            </form>
            <section>
                <button 
                    style={{backgroundColor: filter === 'INGRESO' && 'gray'}} 
                    onClick={() => setFilter('INGRESO')}
                >
                    Sort by Ingresos
                </button>
                <button 
                    style={{backgroundColor: filter === 'EGRESO' && 'gray'}} 
                    onClick={() => setFilter('EGRESO')}
                >
                    Sort by Egresos
                </button>
                {
                    filter === 'EGRESO'
                        &&
                    <select name="select-filter" onChange={onSelectChange}>
                        <option value="All" selected>All</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Comida">Comida</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Ocio">Ocio</option>
                        <option value="Otro">Otro</option>
                    </select>
                }
            </section>
            <section>
                {
                    operations.filter(operation => {
                        if (filter === 'EGRESO') {
                            return operation.type === filter
                                && 
                            (categoryFilter === 'All' ? true : operation.category === categoryFilter);
                        }
                        return operation.type === filter;
                    }).map(operation => 
                        <Operation operation={operation} />
                    )
                }
            </section>
            <button><Link to='/dashboard'>Back to dashboard</Link></button>
        </div>
    )
}

export default Operations;