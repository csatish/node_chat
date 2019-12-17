import React from 'react'
// import MessageList from '../components/ContextDemo_Old'

const Home = (props) => {
    console.log("Home page props", props)
    return (
        <div>
            <h2>
                Home page
            </h2>
            {/*<MessageList messages={[{text:"isme tera ghata"}, {text:"mera kuchh nahi jaata"}]}/>*/}
        </div>
    )
}

export default Home

