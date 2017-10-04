import React, { Component } from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const PAGE_SIZE = 10;

class Stats extends Component {
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
                {/*<Jumbotron><h3>Stats</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Stats</li>
                </ol>
                <Col md={3}>
                    <Panel collapse header='Filter'>
                        {/*<td><Link to={`/activities/1`}>Hello</Link></td>*/}

                        <p>Organization Acronym</p>

                    </Panel>
                </Col>
                <Col md={9}>
                    <Col md={12}>
                        <Panel  header="Monthly Activities">
                            <BarChart width={600} height={300} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </Panel>
                        <Panel  header="Something Else">
                            <BarChart width={600} height={300} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="blue" />
                                <Bar dataKey="uv" fill="green" />
                            </BarChart>
                        </Panel>
                    </Col>
                    <div></div>
                </Col>

            </div>        )
    }
}


const data = [
    {name: 'Enero', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Febrero', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Marzo', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Abril', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Mayo', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Junio F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Julio', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Agosto', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Septiembre', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Octubre', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Noviembre', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Diciembre', uv: 3490, pv: 4300, amt: 2100},

];

Stats.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Stats;