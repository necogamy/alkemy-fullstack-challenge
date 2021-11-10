import React from 'react';
import './style.css';

const Operation = ({operation}) => (
    <article className='operation'>
        <h3>{operation.type}</h3>
        <section>
            <p>{operation.amount}</p>
            <p>{operation.date}</p>
        </section>
    </article>
)

export default Operation;