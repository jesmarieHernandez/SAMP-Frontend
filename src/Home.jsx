import React, { Component } from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Checkbox} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Home extends Component {
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
        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        fetch('/api/activities').then(response => {
            if (response.ok) {
                console.log('PUNETAA! :D');
                response.json().then(results => {
                    //console.log(results);
                    this.setState({activities: results});
                    console.log('Estos son los fucking resultados puneta');
                    console.log(this.state.activities);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {

        const activities = this.state.activities.map(activity =>

            <Col md={12}>

                <Panel  header={activity.requestTitle}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                    <p>Organization Acronym: {activity.organizationName}</p>
                    <p>Request Title: {activity.requestDate}</p>
                    <p>Request Description: {activity.facilities}</p>
                </Panel>
            </Col>
        );

        return (
            <div className="container">
                {/*<Jumbotron><h3>Home</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Home</li>
                </ol>
                <Col md={3}>

                </Col>
                <Col md={6}>
                    <Panel  header="Latest Activities">
                    </Panel>
                    <div>{activities}</div>
                </Col>
                <Col md={3}>

                </Col>

            </div>
        )
    }
}

Home.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Home;