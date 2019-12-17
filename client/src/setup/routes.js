import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
    RootContainer,
    Home,
    Contacts,
    Profile
} from './DynamicLoad'

// {/*<*/}

const subContainers = ({match}) => {
    return (
        <React.Fragment>
            <Route exact path={'/'} component={RootContainer}/>
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/profile'} component={Profile}/>
            <Route exact path={'/contacts'} component={Contacts}/>
        </React.Fragment>
    )
}


const RouteSetup = (props) => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">{"Root"}</Link>
                    </li>
                    <li>
                        <Link to="/home">{"Home"}</Link>
                    </li>
                    <li>
                        <Link to="/profile">{"Profile"}</Link>
                    </li>
                    <li>
                        <Link to="/contacts">{"Contacts"}</Link>
                    </li>
                </ul>
                <Route path={'/'} component={subContainers}/>
            </div>
        </Router>
    )
}

export default RouteSetup