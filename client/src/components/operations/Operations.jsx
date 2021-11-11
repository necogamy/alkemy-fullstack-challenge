import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Operations = () => {
    return (
        <div className='operations'>
            <form>
                <p>Create an operation</p>
                <textarea style={{resize: 'none'}} maxLength='256' placeholder='Concept' ></textarea>
                <input type='number' placeholder='Amount' />
                <input type='date' />
                <select name="select">
                    <option value="INGRESO" selected>Ingreso</option>
                    <option value="EGRESO">Egreso</option>
                </select>
            </form>
            <section>
                <button>Sort by Ingresos</button>
                <button>Sort by Egresos</button>
            </section>
            <section>
                <p>asd</p>
                <p>asd</p>
                <p>ads</p>
            </section>
            <button><Link to='/dashboard'>Back to dashboard</Link></button>
        </div>
    )
}

export default Operations;