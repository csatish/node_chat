import React from 'react'
import ThemeContext, {ThemeWrapper} from './common/ThemeProvider'

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).

// const ThemeContext = React.createContext('light');

const Wrapped = ThemeWrapper(Toolbar)

export default class ContextDemo extends React.Component {
    render() {
        console.log("ContextDemo loaded")
        // Use a Provider to pass the current theme to the tree below.
        // Any component can read it, no matter how deep it is.
        // In this example, we're passing "dark" as the current value.
        return (
            <ThemeContext.Provider value="dark">
                <Wrapped  myProps={{key:"MyProps"}}/>
            </ThemeContext.Provider>
        );
    }
}




// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
    console.log("Wrapped theme", props.theme)
    return (
        <div>
            <ThemedButton />
        </div>
    );
}



class ThemedButton extends React.Component {
    // Assign a contextType to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".

    render() {
        console.log(this.context)
        let bgColor, color
        if(this.context === 'light') {
            bgColor = "#FFF"
            color = "#111"
        }
        else {
            bgColor = "#567"
            color = "#FFF"
        }

        return <Button bgColor={bgColor} color={color} />;
    }
}



class Button extends React.Component {
    render() {

        return (
            <button style={{background: this.props.bgColor, color:this.props.color}} >
                Click me
            </button>
        );
    }
}