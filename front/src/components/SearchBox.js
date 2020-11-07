import React from 'react'
import { Input } from 'reactstrap'

const SearchBox = ({ onChange, containerStyles, disabled }) => {

    return (
        <div style={{...styles.style1, ...containerStyles,}}>
            <Input disabled={disabled} type="text" placeholder="search" onChange={onChange} />
        </div>
    )
}

let styles = {
    style1: {
        position: "relative"
    },
    style2: {
        position: "absolute",
        top: "12px",
        left: "10px",
    },
}


export default SearchBox
