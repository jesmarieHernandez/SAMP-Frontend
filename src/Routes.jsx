import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';

import App from './App.jsx';
import Home from './Home.jsx';
import Activities from './Activities.jsx';
import Stats from './Stats.jsx';
import Admin from './Admin.jsx';
import Request from './Request.jsx';
import ActivityDetail from "./ActivityDetail.jsx";

const NoMatch = () => <p>Page Not Found</p>;

export default(
    <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="home" component={withRouter(Home)} />
        <Route path="request" component={withRouter(Request)} />
        <Route path="activities" component={withRouter(Activities)} />
        <Route path="activities/:id" component={withRouter(ActivityDetail)} />

        <Route path="stats" component={withRouter(Stats)} />
        <Route path="admin" component={withRouter(Admin)} />

        <Route path="*" component={NoMatch} />
    </Route>
);