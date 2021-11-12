import React, { useState } from 'react';
import './style.css';
import assets from '../../util/assets';

const Operation = ({ operation, editMode, editModeActivate }) => {
    const [ expand, setExpand ] = useState(false);

    const ico = operation.category === 'Entretenimiento' ? assets.ico.ticket
    : operation.category === 'Comida' ? assets.ico.dinner
    : operation.category === 'Transporte' ? assets.ico.transport
    : operation.category === 'Ocio' ? assets.ico.leisure
    : operation.category === 'Otro' ? assets.ico.random
    : null;

    return (
        <article className='operation'>
            <section>
                <h3>{operation.type}</h3>
                {editMode && <img onClick={editModeActivate} style={{width: 30, cursor: 'pointer'}} src={assets.ico.edit} alt='edit mode' />}
            </section>
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
                        {
                            /EGRESO/.test(operation.type) && operation.category  
                            ? ico && <img className='category-ico' src={ico} alt={`${operation.category}`} />
                            : null
                        }
                        <p>{operation.concept ? operation.concept : 'No concept'}</p>
                    </section>
                )
                : null
            }
        </article>
    )
}

export default Operation;