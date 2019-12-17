import React from 'react'

const LoadingMsg = (props) => {
    if(props.error) {
        console.log(props.error)
        return <h5 style={{textAlign:"center"}}>Failed</h5>
    }

    return <h5 style={{textAlign:"center"}}>Loading..</h5>
}

export default LoadingMsg