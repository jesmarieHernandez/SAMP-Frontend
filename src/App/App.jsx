import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import Header from "./Header.jsx";

export default class App extends React.Component {
    static dataFetcher({urlBase, cookie}) {
        console.log(urlBase);
        console.log(cookie);

        const headers = cookie ? {headers: {Cookie: cookie}} : null;
        return fetch(`${urlBase || ''}/api/users/me`, headers).then(response => {
            console.log('fetch response: ' + response.toString());
            if (!response.ok) return response.json().then(error => Promise.reject(error));
            return response.json().then(data => ({App: data}));
        });
    }

    constructor(props, context) {
        super(props, context);
        //const user = context.initialState.App ? context.initialState.App : {};
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        // App.dataFetcher({})
        //     .then(data => {
        //         console.log('The data: ');
        //         console.log(data);
        //     });
    }

    render() {
        console.log('this.props.children' + this.props.children);
        // const childrenWithUser = React.Children.map(this.props.children, child => {
        //     React.cloneElement(child, {user: this.state.user});
        // });
        // console.log('childrenWithUser: ' + childrenWithUser);

        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.object.isRequired
};

App.contextTypes = {
    initialState: React.PropTypes.object
};