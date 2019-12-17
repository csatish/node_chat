import React from 'react'
import Loadable from 'react-loadable';

import LoadingMsg from './LoadingMsg'


export const RootContainer = Loadable({
    loader: () => import('../containers/RootContainer'),
    loading: LoadingMsg,
});


export const Home = Loadable({
    loader: () => import('../containers/Home'),
    loading: LoadingMsg,
});

export const Profile = Loadable({
    loader: () => import('../containers/Profile'),
    loading: LoadingMsg,
});

export const Contacts = Loadable({
    loader: () => import('../containers/Contacts'),
    loading: LoadingMsg,
});







// export default class LoadableDashboard extends React.Component {
//     render() {
//         return <LoadableComponent />;
//     }
// }
//
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
// const DynamicImport = (path) => <DynamicLoad load={()=> import('../containers/RootContainer')}>
//     {(Component) => Component === null ? <p>Loading</p> : <Component />}
// </DynamicLoad>
//
// export default DynamicImport