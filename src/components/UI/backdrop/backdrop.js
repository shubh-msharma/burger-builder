







import React from 'react'
import "./backdrop.css"

export default function backdrop(props) {
    return props.show?<div onClick = {props.backdropClicked} className="backdrop"></div>:null
}
