import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Users extends Component {
    static dataFetcher({urlBase, location}) {
        const query = Object.assign({}, location.query);
        const pageStr = query._page;
        if (pageStr) {
            delete query._page;
            query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
        }
        query._limit = PAGE_SIZE;
        const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
        // return fetch(`${urlBase || ''}/api/issues?${search}`).then(response => {
        //     if (!response.ok) return response.json().then(error => Promise.reject(error));
        //     return response.json().then(data => ({IssueList: data}));
        // });
        return {IssueList: {}};

    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="container">
                {/*<Jumbotron><h3>Admin Panel</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li ><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li className="active">Users</li>
                </ol>
                <Col md={3}></Col>
                <Col md={6}>
                    <Panel header='Manage Users'>
                        <ul>
                            <li><Link to={`/admin/users/create`}>Create New User</Link></li>
                            <li>Edit Existing User</li>
                        </ul>
                    </Panel>
                </Col>
                <Col md={3}></Col>


            </div>
        )
    }
}

Users.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Users;