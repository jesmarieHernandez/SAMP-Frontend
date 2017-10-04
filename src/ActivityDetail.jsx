import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class ActivityDetail extends Component {
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
            activity: {
                _id: 0,
                requestTitle: '',
                organizationName: '',
                requestDate: '',
                facilities: ''
            }
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.params.id);
        let id = this.props.params.id;
        fetch(`/api/activities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({activity: data});
                console.log(this.state.activity._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.activityRequest;

        
        const activityRequest = {
            requestTitle: form.requestTitle.value,
            organizationName: form.organizationName.value,
            requestDate: new Date(),
            facilities: form.facilities.value
        };


        console.log(activityRequest);
        fetch('/api/activities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityRequest),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdRequest => {
                    console.log('Activity request was created successfully!');
                    console.log('Activity request ID: ' + createdRequest._id);

                    //this.props.router.push(`/activities/${createdRequest._id}`);
                })
            } else {
                response.json().then(error => {
                    //this.props.showError(`Failed to create request: ${error.message}`);
                });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }


    render() {

        return (
            <div className="container">
                {/*<Jumbotron><h3>Activity Details</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li ><Link to={`/activities/`}>Activities</Link></li>
                    <li className="active">Activity Details</li>
                </ol>
                <Col md={2}>
            </Col>
                <Col md={12}>

                    <Panel  header={this.state.activity.requestTitle}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p>Organization Name: {this.state.activity.organizationName}</p>
                        <p>Request Title: {this.state.activity.requestDate}</p>
                        <p>Request Description: {this.state.activity.facilities}</p>
                    </Panel>
                </Col>
            {/*<Col md={8}>*/}
                {/*/!*<div onClick={this.onSubmit}><Button>Request</Button></div>*!/*/}
                {/*<Panel>*/}
                    {/*<row>*/}
                        {/*<Button>{this.state.activity._id}</Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.requestTitle} </Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.organizationName} </Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.requestDate} </Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.facilities} </Button>*/}
                    {/*</row>*/}
                {/*</Panel>*/}
            {/*</Col>*/}
            <Col md={2}></Col>
            </div>
        )
    }
}


ActivityDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default ActivityDetail;