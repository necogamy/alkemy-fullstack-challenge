import React, { useState, useEffect } from 'react';
import './style.css';
import assets from '../../util/assets';
import { moneyToNumber } from '../../util/moneyToNumber';

const EditMode = ({ editModeActivate, deleteOperation, editOperation, operation }) => {
    const [ editInfo, setEditInfo ] = useState({
        concept: '',
        amount: 0,
        category: '',
        type: '',
        date: ''
    });

    const onInputChange = e => {
        setEditInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onFormSubmit = e => {
        e.preventDefault();

        const prepareRequest = {
            concept: editInfo.concept,
            amount: editInfo.amount,
            category: editInfo.type === 'INGRESO' ? null : editInfo.category,
            date: editInfo.date
        }

        editOperation(prepareRequest);
        setEditInfo({
            concept: '',
            amount: 0,
            category: '',
            type: '',
            date: ''
        });
    }

    const fetchOperationData = async () => {
        const data = await fetch(`/api/operations/${operation}`, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token.alkemy.challenge.app')
            }
        });

        const jsonResponse = await data.json();

        const { amount, category, concept, date, type } = jsonResponse.operation;

        setEditInfo({
            concept,
            amount: moneyToNumber(amount),
            category,
            type,
            date: date.split('').splice(0, 10).join('')
        });
    }

    useEffect(() => {
        fetchOperationData();
    }, []);

    return (
        <div className='edit-mode'>
            <h2>Edit mode</h2>
            <form onSubmit={onFormSubmit}>
                <textarea 
                    onChange={onInputChange}
                    name='concept'
                    style={{resize: 'none'}}
                    maxLength='50'
                    value={editInfo.concept}
                    placeholder='Concept'
                />

                <input 
                    onChange={onInputChange} 
                    name='amount'
                    type='number'
                    placeholder='Amount' 
                    min='0' 
                    max='999999999999999' 
                    value={editInfo.amount} 
                    required 
                />

                <input onChange={onInputChange} name='date' type='date' value={editInfo.date} required />

                <input name='type' type='text' value={editInfo.type} readOnly disabled />

                <select name="category" onChange={onInputChange} value={editInfo.category} disabled={editInfo.type === 'INGRESO' ? true : false}>    
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Otro">Otro</option>
                </select>

                <input className='submit-button' type='submit' value='Edit operation' />
            </form>
            <button onClick={deleteOperation} className='submit-button'>Delete operation</button>
            <img onClick={editModeActivate} src={assets.ico.exit} alt='quit' />
        </div>
    )
}

export default EditMode;