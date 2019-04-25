import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { arrayInsert, arrayRemove, reduxForm, Field } from 'redux-form';
import { formValueSelector } from 'redux-form';

import { getGeneroSexual } from '../../actions/generoSexualActions';
import { getEscolaridade } from '../../actions/escolaridadeActions';
import { getTipoSanguineo } from '../../actions/tipoSanguineoActions';
import { getSituacaoFamiliar } from '../../actions/situacaoFamiliarActions';
import { getEstados } from '../../actions/enderecoActions';
import { init } from '../../actions/pacienteActions';

import { Form, Input, DatePicker, Select, Icon, Button, Collapse } from 'antd';
import NumberFormat from 'react-number-format';

const Option = Select.Option;
const Panel = Collapse.Panel;

class PacienteForm extends Component {
    state = {  };

    onChangeDate = (date, dateString) => {
      console.log(date, dateString);
    }

    constructor(props){
      super(props);
      props.getGeneroSexual();
      props.getEscolaridade();
      props.getTipoSanguineo();
      props.getSituacaoFamiliar();
      props.getEstados();
      props.init();
    }

    renderOptions(list) {
      const options = list || [{}];  
      return options.map(item => (
        <Option key={item.id} value={item.id}>{item.nome}</Option>
      ));
    }

    addTelefone = (index, item = {}) => {      
      if (!this.props.readOnly) {
        this.props.arrayInsert('pacienteForm', 'telefones', index, item);
      }
    }

    removeTelefone = (index) => {
      if (!this.props.readOnly && this.props.telefones.length > 1) {
        this.props.arrayRemove('pacienteForm', 'telefones', index);
      }
    }

    render() {
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 },
        },
      };
      
      const formItemLayoutMedium = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
          md: { span: 12 },
          lg: { span: 10 },
          xl: { span: 7 },
          xxl: { span: 5 }
        },
      };

      const formItemLayoutSmall = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 10 },
          lg: { span: 8 },
          xl: { span: 5 },
          xxl: { span: 4 }
        },
      };

      const formItemLayoutSmallWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 7 },
          md: { span: 10, offset: 7 },
          lg: { span: 8, offset: 7 },
          xl: { span: 5, offset: 7 },
          xxl: { span: 4, offset: 7 }
        },
      };      

      const {handleSubmit, readOnly, generoSexualList, escolaridadeList, tipoSanguineoList, situacaoFamiliarList, estadosList } = this.props;
      const telefones = this.props.telefones || [];
      const fieldsTelefone = telefones.map((item, index) => (      
        <Form.Item 
          key={`fi-${index}`}          
          {...(index === 0 ? formItemLayoutSmall : formItemLayoutSmallWithOutLabel)}
          label={index === 0 ? 'Telefones' : ''}
          required={false}
          id="form.telefones.label"
        >
          <Field key={`fd-${index}`}  
            name={`telefones[${index}].numero`} 
            style={{ width: '60%', marginRight: 8 }} 
            readOnly={readOnly} 
            props={{className: 'ant-input', 
            format: '(##)#####-####', 
            placeholder: "(__)_____-____"}} 
            component={NumberFormat} 
            placeholder={`Telefone ${index+1}`}
          />

          {telefones.length > 1 ? ( 
            <Icon key={`ic-${index}`}             
              className="dynamic-delete-button"
              type="minus-circle"
              onClick={() => this.removeTelefone(index)}
              />
          ) : null}
          
        </Form.Item>
      ));

      return ( 
          <Form onSubmit={handleSubmit}>
            
            <Collapse defaultActiveKey={['1']}>
              <Panel header="Informações Básicas" key="1">
              
                <Form.Item {...formItemLayout} label="Nome Completo:" id="form.nome.label" required>
                    <Field name="nome" readOnly={readOnly} component={Input} placeholder="Digite aqui o nome completo do paciente" />
                </Form.Item>
                <Form.Item {...formItemLayoutSmall} label="Gênero Sexual:" id="form.GeneroId.label">
                    <Field name="GeneroId" readOnly={readOnly} placeholder="Selecione" component={Select}>
                      {this.renderOptions(generoSexualList)}
                    </Field>
                </Form.Item>
                <Form.Item {...formItemLayoutSmall} label="Data de Nascimento:" id="form.datanascimento.label" required>
                    <Field name="dataNascimento" props={{onChange: this.onChangeDate, format: 'DD/MM/YYYY', placeholder: "__/__/____"}} readOnly={readOnly} component={DatePicker}  />
                </Form.Item>
                <Form.Item {...formItemLayoutSmall} label="CPF:" id="form.cpf.label">
                    <Field name="cpf" props={{className: 'ant-input', format: '###.###.###-##', placeholder: "___.___.___-__"}} readOnly={readOnly} component={NumberFormat}  />
                </Form.Item>
                <Form.Item {...formItemLayoutSmall} label="Documento de Identidade:" id="form.documentoIdentidade.label">
                    <Field name="documentoIdentidade" readOnly={readOnly} component={Input}  />
                </Form.Item>
                <Form.Item {...formItemLayoutMedium} label="Naturalidade:" id="form.naturalidade.label">
                    <Field name="naturalidade" readOnly={readOnly} component={Input} placeholder="Cidade de nascimento"/>
                </Form.Item>
                <Form.Item {...formItemLayoutMedium} label="Nacionalidade:" id="form.nacionalidade.label">
                    <Field name="nacionalidade" readOnly={readOnly} component={Input} placeholder="País de nascimento"/>
                </Form.Item>
              
              </Panel>
              
              <Panel header="Informações de Endereço" key="2">
                  <Form.Item {...formItemLayout} label="Logradouro:" id="form.logradouro.label">
                      <Field name="enderecos[0].logradouro" readOnly={readOnly} component={Input} placeholder="Ex.: Rua Sete de Setembro"/>
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Bairro:" id="form.bairro.label">
                      <Field name="enderecos[0].bairro" readOnly={readOnly} component={Input} placeholder="Ex.: Centro"/>
                  </Form.Item>
                  <Form.Item {...formItemLayoutSmall} label="Número:" id="form.numero.label">
                      <Field name="enderecos[0].numero" readOnly={readOnly} component={Input} />
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Complemento:" id="form.complemento.label">
                      <Field name="enderecos[0].complemento" readOnly={readOnly} component={Input} />
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Referência:" id="form.referencia.label">
                      <Field name="enderecos[0].referencia" readOnly={readOnly} component={Input} />
                  </Form.Item>
                  <Form.Item {...formItemLayoutSmall} label="CEP::" id="form.cep.label">
                      <Field name="enderecos[0].cep" props={{className: 'ant-input', format: '##.###-###', placeholder: "__.___-___"}} readOnly={readOnly} component={NumberFormat}  />
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Estado:" id="form.estado.label">
                      <Field readOnly={readOnly} placeholder="Selecione" component={Select}>
                        {this.renderOptions(estadosList)}
                      </Field>
                  </Form.Item>
              
              </Panel>
              
              <Panel header="Informações para Contato" key="3">

                  <Form.Item {...formItemLayoutMedium} label="Email:" id="form.email.label">
                      <Field name="email" readOnly={readOnly} component={Input} type='email' placeholder="exemplo@gmail.com"/>
                  </Form.Item>
                  {fieldsTelefone}
                  <Form.Item {...formItemLayoutSmallWithOutLabel}>
                    <Button type="dashed" style={{ width: '60%' }} onClick={() => this.addTelefone(telefones.length)}>
                      <Icon type="plus" /> Telefone
                    </Button>
                  </Form.Item>
              
              </Panel>

              <Panel header="Informações sobre Família" key="4">
                  <Form.Item {...formItemLayout} label="Nome do Pai:" id="form.nomePai.label">
                      <Field name="nomePai" readOnly={readOnly} component={Input} placeholder="Nome completo do pai do paciente" />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Nome da Mãe:" id="form.nomeMae.label">
                      <Field name="nomeMae" readOnly={readOnly} component={Input} placeholder="Nome completo da mãe do paciente" />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Situação Familiar:" id="form.SituacaoFamiliar.label">
                      <Field name="SituacaoFamiliarId" readOnly={readOnly} placeholder="Selecione" component={Select}>
                        {this.renderOptions(situacaoFamiliarList)}
                      </Field>
                  </Form.Item>
              
              </Panel>

              <Panel header="Informações profissionais e acadêmicas" key="5">              
                  <Form.Item {...formItemLayoutMedium} label="Profissão:" id="form.profissao.label">
                      <Field name="profissao" readOnly={readOnly} component={Input} placeholder="Profissão"/>
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Escolaridade:" id="form.EscolaridadeId.label">
                      <Field name="EscolaridadeId" readOnly={readOnly} placeholder="Selecione" component={Select}>
                        {this.renderOptions(escolaridadeList)}
                      </Field>
                  </Form.Item>                  
              </Panel>
              
            </Collapse>

                {/* <Form.Item {...formItemLayoutSmall} label="Tipo Sanguíneo:" id="form.TipoSanguineo.label">
                    <Field name="TipoSanguineoId" readOnly={readOnly} placeholder="Selecione" component={Select}>
                      {this.renderOptions(tipoSanguineoList)}
                    </Field>
                </Form.Item> */}
                
          </Form>
        );
    }
}


const mapStateToProps = state => ({
    telefones: selector(state, 'telefones'),
    generoSexualList: state.generoSexual.list,
    escolaridadeList: state.escolaridade.list,
    tipoSanguineoList: state.tipoSanguineo.list,
    situacaoFamiliarList: state.situacaoFamiliar.list,
    estadosList: state.endereco.estadosList
});
const mapDispatchToProps = dispatch => bindActionCreators({
  arrayInsert, arrayRemove, getGeneroSexual, getEscolaridade, getTipoSanguineo, getSituacaoFamiliar, getEstados, init
}, dispatch);
PacienteForm = reduxForm({form: 'pacienteForm', destroyOnUnmount: false})(connect(mapStateToProps, mapDispatchToProps)(PacienteForm));
const selector = formValueSelector('pacienteForm');

export default PacienteForm;