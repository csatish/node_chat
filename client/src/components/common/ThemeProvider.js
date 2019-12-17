import React  from 'react'

const ThemeContext = React.createContext('light')

export default ThemeContext


export const ThemeWrapper = Component => {
    class WrappedComponent extends React.Component {

        static contextType = ThemeContext;

        render() {
            return (
                <ThemeContext.Consumer>
                    {({theme}) => {
                        console.log(this.context)
                        return <Component props={this.props} theme={theme} />
                    }}
                </ThemeContext.Consumer>
            );
        }
    }

    return WrappedComponent
}
