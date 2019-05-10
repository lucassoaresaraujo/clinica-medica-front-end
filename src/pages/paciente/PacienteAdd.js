import React, { Component } from 'react';
import {connect} from 'react-redux';

import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';

import { createPaciente } from '../../actions/pacienteActions';

import Form from './PacienteForm';
import { bindActionCreators } from 'redux';

class PacienteAdd extends Component {

    tratarFormulario = (values) => {        
        const {createPaciente} = this.props;
        values.cpf = values.cpf ? values.cpf.split(".").join("").split("-").join("") : null;
        let {enderecos, telefones} = values;
        if (!telefones.numero) delete values.telefones;
        if (!enderecos.logradouro) delete values.enderecos;        
        createPaciente(values);
    }

    render() {         
        return ( 
            <React.Fragment>
                <PageHeader
                    title="Novo Paciente"
                    breadcrumb={[{name: 'Home', href: '/'},{name: 'Paciente', href: '/paciente'}, {name: 'Novo'}]}
                    description="Preencha o formulário abaixo para inserir um novo paciente."/>

                <PageContent>
                    <Form readOnly={false} onSubmit={this.tratarFormulario} />
                </PageContent>
            </React.Fragment>
         );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({createPaciente}, dispatch);
 
export default connect(null, mapDispatchToProps)(PacienteAdd);