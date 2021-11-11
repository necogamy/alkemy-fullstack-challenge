import React, { useState } from 'react';
import './style.css';
import assets from '../../util/assets';

const Operation = ({operation}) => {
    const [ expand, setExpand ] = useState(false);

    return (
        <article className='operation'>
            <h3>{operation.type}</h3>
            <section>
                <p>{operation.amount}</p>
                <p>{operation.date.slice(0, 10)}</p>
                <button className='expand-button' onClick={() => setExpand(prevState => !prevState)}>
                    {
                        expand ? <img className='expand-arrow' src={assets.ico.arrowUp} alt='quit expand info' />
                        : <img className='expand-arrow' src={assets.ico.arrowDown} alt='expand info' />
                    }
                </button>
            </section>
            {
                expand ? (
                    <section>
                        {/EGRESO/.test(operation.type) && <p>{operation.category ? operation.category : 'No category'}</p>}
                        <p>{operation.concept ? operation.concept : 'No concept'}</p>
                    </section>
                )
                : null
            }
        </article>
    )
}

export default Operation;