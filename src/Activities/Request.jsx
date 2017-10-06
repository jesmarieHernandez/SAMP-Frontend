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

        this.state = {
            organizations: [],
            facilities: [],
            selectedOrganization: {

            },
            selectedFacilities: {}
        }

        ;

        this.onOrganizationSelected = this.onOrganizationSelected.bind(this);
        this.onFacilitiesSelected = this.onFacilitiesSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        fetch('/api/organizations').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({organizations: results});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch(`/api/facilities/`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({facilities: results});
                    console.log(this.state.facilities);
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
            organization: this.state.selectedOrganization,
            requestDate: new Date(),
            facilities: this.state.selectedFacilities
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

                    this.props.router.push(`/activities/${createdRequest._id}`);
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

    onOrganizationSelected(event) {

        console.log('Change happened');
        console.log(event.target.value);
        const selectedOrganization = this.state.organizations.filter(function (obj) {
            return obj._id === event.target.value;
        });
        this.setState({selectedOrganization: selectedOrganization[0]});
        console.log("Selected organization: " + this.state.selectedOrganization.name);

    }

    onFacilitiesSelected(event) {

        console.log('Change happened');
        console.log(event.target.value);
        const selectedFacilities = this.state.facilities.filter(function (obj) {
            return obj._id == event.target.value;
        });
        console.log(selectedFacilities[0]);
        this.setState({selectedFacilities: selectedFacilities[0]});
        console.log("Selected facilities: " + this.state.selectedFacilities.managerName);
    }


    render() {

        const organizationOptions = this.state.organizations.map(organization =>
            <option value={organization._id}>{organization.name}</option>
        );

        const facilitiesOptions = this.state.facilities.map(facilities =>
            <option value={facilities._id}>{facilities.name}</option>
        );

        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Admin Panel</li>
                </ol>
                <Col md={3}>
                    <Panel header='Instructions'>
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
                                <Col md={4}>
                                    <Col componentClass={ControlLabel}>Organization</Col>

                                    <FormControl componentClass="select" name="selectOrganization"
                                                 onChange={this.onOrganizationSelected}

                                                 placeholder="select">
                                        <option>select</option>
                                        {organizationOptions}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}>
                                    <Col componentClass={ControlLabel}>Facilities</Col>

                                    <FormControl componentClass="select" name="selectFacilities"
                                                 onChange={this.onFacilitiesSelected}

                                                 placeholder="select">
                                        <option>select</option>
                                        {facilitiesOptions}
                                    </FormControl>
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