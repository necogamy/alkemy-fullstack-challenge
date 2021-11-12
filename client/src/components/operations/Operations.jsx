import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Operation from '../operation/Operation';
import { toast } from 'react-toastify';
import EditMode from '../editMode/EditMode';

const Operations = () => {
    const [ operations, setOperations ] = useState([]);
    const [ filter, setFilter ] = useState('INGRESO');
    const [ categoryFilter, setCategoryFilter ] = useState('All');
    const [ operationAdded, setOperationAdded ] = useState(false);
    const [ editMode, setEditMode ] = useState(false);

    const [ formData, setFormData ] = useState({
        concept: '',
        amount: 0,
        date: '',
        type: 'INGRESO',
        category: 'Otro'
    });

    const onInputChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSelectChange = e => {
        setCategoryFilter(e.target.value);
    }

    const onFormSubmit = async e => {
        e.preventDefault();

        try {
            const prepareRequest = {
                concept: formData.concept,
                amount: Number(formData.amount),
                date: formData.date,
                type: formData.type
            }
            prepareRequest.category = !e.target.children[5].disabled && formData.category;
    
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
            setFormData({
                concept: '',
                amount: 0,
                date: '',
                type: 'INGRESO',
                category: 'Otro'
            });
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

    const editModeActivate = () => {
        setEditMode(prevState => !prevState);
        const documentBody = document.querySelector('body');

        if (documentBody.style.overflow === 'hidden') documentBody.style.overflow = 'scroll'
        else documentBody.style.overflow = 'hidden';

        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchData();
        return setOperationAdded(false);
    }, [ operationAdded ]);

    return (
        <div className='operations'>
            <form onSubmit={onFormSubmit}>
                <h2>Create an operation</h2>
                
                <textarea 
                    onChange={onInputChange}
                    name='concept' 
                    style={{resize: 'none'}} 
                    maxLength='50'
                    value={formData.concept} 
                    placeholder='Concept' 
                />
                
                <input 
                    onChange={onInputChange} 
                    name='amount' 
                    type='number' 
                    placeholder='Amount' 
                    min='0' 
                    max='999999999999999' 
                    value={formData.amount} 
                    required 
                />
                
                <input onChange={onInputChange} name='date' type='date' value={formData.date} required />

                <select value={formData.type} name="type" onChange={onInputChange}>
                    <option value="INGRESO" selected>Ingreso</option>
                    <option value="EGRESO">Egreso</option>
                </select>

                <select name="category" onChange={onInputChange} value={formData.category} disabled={formData.type === 'INGRESO' ? true : false}>    
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Otro" selected>Otro</option>
                </select>
                
                <input className='submit-button' type='submit' value='Add operation' />
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
                    <select value={categoryFilter} onChange={onSelectChange}>
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
                        <Operation editModeActivate={editModeActivate} editMode={true} operation={operation} />
                    )
                }
            </section>
            <button><Link to='/dashboard'>Back to dashboard</Link></button>
            {editMode && <EditMode editModeActivate={editModeActivate} />}
        </div>
    )
}

export default Operations;