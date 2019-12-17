import React from 'react'
import loadable from '@loadable/component'
import LoadingMsg from './LoadingMsg'


const LoadableComponent = loadable(() => import('../containers/MRootContainer'), {
    fallback: <LoadingMsg />,
})

export default  LoadableComponent
// export default class LoadableContainer extends React.Component {
//     render() {
//         return <LoadableComponent />
//     }
// }







// class DynamicLoad extends React.Component {
//     state = {
//         component: null
//     }
//
//     componentDidMount() {
//         this.props.load()
//             .then((component) => {
//                 this.setState(() => ({
//                     component: component.default ? component.default : component
//                 }))
//             })
//     }
//
//     render() {
//         return this.props.children(this.state.component)
//     }
// }
//
//
// let DynamicImport = (props) => (<DynamicLoad load={()=> import('../containers/MRootContainer')}>
//     {(Component) => Component === null ? <p>Loading</p> : <Component />}
// </DynamicLoad>)
//
// export default DynamicImport