import React from 'react'
import ContextDemo from '../components/ContextDemo'

const Contacts = (props) => {
    console.log("Contacts page props", props)
    return (
        <div>
            <h2>
                Contacts page
            </h2>
            <ContextDemo />
        </div>
    )
}

export default Contacts