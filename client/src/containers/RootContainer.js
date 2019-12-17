import React from 'react'
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import {themeStyles} from '../styles/commonStyles'
const body = document.body



const theme = createMuiTheme({
    type: 'dark',
    overrides: {
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }
        },
        MuiCard: {
            root: {
                backgroundColor: '#18202c',
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#18202c',
            }
        },
        MuiGrid: {
            root: {
                backgroundColor: '#18202c',
            }
        },
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
    },
    palette: {
        primary: { main: purple[700] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true }
});


let RootContainer = (props) => {
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
        <MuiThemeProvider theme={theme}>

        <div style={{width:"100%",height:"100", maxWidth: 300}}>
            <Paper style={{
                width: "97%",
                padding: "5px",
                borderRadius: "0px",
                overflow: "hidden"
            }}>
                <Grid container spacing={0}>
                    <Grid item>
                        <Card style={sectionStyle}>
                            <img src="/media/clockBooking.png" style={{width:290}}/>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <img src="/media/clockBooking.png" style={{width:290}}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        <div className="tileTheme" style={{height:"100%", overflowY:"auto",width:"calc(100% - 300px)"}}>

            <Button color="secondary">Greetings</Button>
            <Button color="primary">Hello World</Button>

            <img src="/media/clockBooking.png" />
        </div>
        </MuiThemeProvider>

    </div>)
}

export default RootContainer
