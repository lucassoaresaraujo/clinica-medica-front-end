import React, { Component } from 'react';
import PageHeader from '../../common/widget/PageHeader';

class PacienteAdd extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <PageHeader
                    title="Novo Paciente"
                    breadcrumb={[{name: 'Home', href: '/'},{name: 'Paciente', href: '/paciente'}, {name: 'Novo'}]}
                    description="Preencha o formulário abaixo para inserir um novo paciente."/>
            </React.Fragment>
         );
    }
}
 
export default PacienteAdd;