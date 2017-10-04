import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class Request extends Component {
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

        // this.state = {
        //     eventDate: value,
        //     theValue: {},
        //     organizationName: '',
        //     selectedOrganizationInfo:
        //         {
        //             organizationName: '',
        //             organizationAcronym: '',
        //             counselorFirstName: '',
        //             counselorLastName: '',
        //             counselorAddress: '',
        //             counselorPhone: ''
        //         },
        //     requestedFacilitiesInfo: {},
        //     invalidFields: {}, showingValidation: false,
        // };
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
                {/*<Jumbotron><h3>Request New Activity</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Admin Panel</li>
                </ol>
                <Col md={3}>
                    <Panel collapse header='Instructions'>
                        {/*<td><Link to={`/activities/1`}>Hello</Link></td>*/}

                        <p>Organization Acronym</p>
                        <p>Request Title</p>
                        <p>Request Description</p>
                    </Panel>
                </Col>

                <Col md={9}>
                    {/*<div onClick={this.onSubmit}><Button>Request</Button></div>*/}
                    <Panel header="Request New Activity">
                        <Form horizontal onSubmit={this.onSubmit} name="activityRequest">
                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Request Title</Col>
                                        <FormControl name="requestTitle"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Organization Name</Col>
                                        <FormControl name="organizationName"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Facilities</Col>
                                        <FormControl name="facilities"/>
                                    </Col>
                                </FormGroup>
                            <ButtonToolbar>
                                <Col md={6}>
                                    <Button bsStyle="primary" type="submit">
                                        Submit </Button>
                                </Col>
                            </ButtonToolbar>
                        </Form>
                    </Panel>
                </Col>
                <Col md={2}></Col>
            </div>
        )
    }
}


Request.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Request;