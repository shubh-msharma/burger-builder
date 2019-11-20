import React from 'react'
import './formEle.css'

export default function formsEle(props) {

    let classes = ''

    if (props.touched) {
        if (props.isValid) {
            classes = 'valid'
        } else {
            classes = 'invalid'
        }
    }
    let element = null;
    switch (props.elementType) {
        case 'input':
            element = <input className={classes} {...props.elementConfig} onChange={props.inputEventHandler} />
            break;
        case 'select':
            element = (<select {...props.elementConfig} onChange={props.inputEventHandler}>
                {
                    props.options.map(optn => {
                        return <option key={optn.value} value={optn.value}>{optn.displayVal}</option>
                    })
                }
            </select>)
            break;
        default:

            break;
    }
    return (
        <div className="formEle">
            {element}
        </div>
    )
}
