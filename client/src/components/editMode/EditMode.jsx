import React, { useState } from 'react';
import './style.css';
import assets from '../../util/assets';

const EditMode = ({ editModeActivate }) => {
    const [ editInfo, setEditInfo ] = useState({
        concept: '',
        amount: 0,
        category: '',
        date: ''
    });

    const onInputChange = e => {
        setEditInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className='edit-mode'>
            <h2>Edit mode</h2>
            <form>
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

                <select name="category" onChange={onInputChange} value={editInfo.category} disabled={editInfo.type === 'INGRESO' ? true : false}>    
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Otro">Otro</option>
                </select>

                <input className='submit-button' type='submit' value='Edit operation' />
            </form>
            <button className='submit-button'>Delete operation</button>
            <img onClick={editModeActivate} src={assets.ico.exit} alt='quit' />
        </div>
    )
}

export default EditMode;