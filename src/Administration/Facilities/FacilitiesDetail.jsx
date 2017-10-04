import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class FacilitiesDetail extends Component {
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
            facilities: {
                _id: 0,
                name: '',
                creationDate: '',
                managerName: '',
                managerEmail: ''
            }
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.params.id);
        let id = this.props.params.id;
        fetch(`/api/facilities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({facilities: data});
                console.log(this.state.facilities._id);
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
        // const form = document.forms.activityRequest;


        // const activityRequest = {
        //     requestTitle: form.requestTitle.value,
        //     organizationName: form.organizationName.value,
        //     requestDate: new Date(),
        //     facilities: form.facilities.value
        // };


        // console.log(activityRequest);
        // fetch('/api/activities', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(activityRequest),
        // }).then(response => {
        //     if (response.ok) {
        //         console.log(response);
        //         response.json().then(createdRequest => {
        //             console.log('Activity request was created successfully!');
        //             console.log('Activity request ID: ' + createdRequest._id);
        //
        //             //this.props.router.push(`/activities/${createdRequest._id}`);
        //         })
        //     } else {
        //         response.json().then(error => {
        //             //this.props.showError(`Failed to create request: ${error.message}`);
        //         });
        //     }
        // }).catch(err => {
        //     //this.props.showError(`Error in sending data to server: ${err.message}`);
        // });
    }


    render() {

        return (
            <div className="container">
                {/*<Jumbotron><h3>Activity Details</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li><Link to={`/admin/facilities`}>Facilities</Link></li>
                    <li className="active">Facilities Details</li>
                </ol>
                <Col md={2}>
                </Col>
                <Col md={12}>

                    <Panel  header={this.state.facilities.name}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p>Facilities Name: {this.state.facilities.name}</p>
                        <p>Creation Date: {this.state.facilities.creationDate}</p>
                        <p>Manager Name: {this.state.facilities.managerName}</p>
                        <p>Manager Email: {this.state.facilities.managerEmail}</p>


                        <Row>
                            <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-success">Contact</Button></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>


                    </Panel>
                </Col>

                <Col md={2}></Col>
            </div>
        )
    }
}


FacilitiesDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default FacilitiesDetail;