import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Dashboard from '../pages/dashboard/Dashboard';
import Teste from '../pages/dashboard/Teste';
import Fornecedor from '../pages/fornecedor/Fornecedor';
import Paciente from '../pages/paciente/Paciente';

const Routes = props => (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/fornecedor" component={Fornecedor} />
        <Route exact path="/paciente" component={Paciente} />
        <Route exact path="/teste" component={Teste} />

        <Redirect from='*' to='/' />
    </Switch>
)

export default Routes;