import React from 'react'
const body = document.body
import {themeStyles} from '../styles/commonStyles'



let MRootContainer = (props) => {
    let selectedTheme = themeStyles['theme1']
    body.style.backgroundColor = selectedTheme.body.backgroundColor
    body.style.color = selectedTheme.body.color

    let sectionStyle = {
        width: "95%",
        margin: "auto",
        marginTop: "10px",
    }

    sectionStyle['width'] = "97%"
    sectionStyle['boxShadow'] = '2px 5px 10px -3px grey'


    return (<div style={{width:"100%", height:"100%", display:"flex"}}>
        <div style={{width:"100%",height:"100", maxWidth: 300}}>
            <div style={{
                width: "97%",
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "0px",
                overflow: "hidden"
            }}>

                <img src="/media/punch.jpg" style={{width:290}}/>
                <img src="/media/punch.jpg" style={{width:290}}/>
            </div>
        </div>
        <div className="tileTheme" style={{height:"100%", overflowY:"auto",width:"calc(100% - 300px)", textAlign:"center"}}>
            <h1>This was a Mobile Build</h1>
            <img src="/media/punch.jpg" />
        </div>

    </div>)
}

export default MRootContainer