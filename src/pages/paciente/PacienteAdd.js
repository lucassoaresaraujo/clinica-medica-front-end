import React, { Component } from 'react';
import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';

import Form from './PacienteForm';

class PacienteAdd extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <PageHeader
                    title="Novo Paciente"
                    breadcrumb={[{name: 'Home', href: '/'},{name: 'Paciente', href: '/paciente'}, {name: 'Novo'}]}
                    description="Preencha o formulário abaixo para inserir um novo paciente."/>

                <PageContent>
                    <Form readOnly={false} />
                </PageContent>
            </React.Fragment>
         );
    }
}
 
export default PacienteAdd;