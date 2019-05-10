import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { arrayInsert, arrayRemove, reduxForm, Field } from 'redux-form';
import { formValueSelector } from 'redux-form';

import { getGeneroSexual } from '../../actions/generoSexualActions';
import { getEscolaridade } from '../../actions/escolaridadeActions';
import { getTipoSanguineo } from '../../actions/tipoSanguineoActions';
import { getSituacaoFamiliar } from '../../actions/situacaoFamiliarActions';
import { getEstados, getCidades } from '../../actions/enderecoActions';
import { init } from '../../actions/pacienteActions';

import MaskedInput from 'react-text-mask';
import { Form, Input, Select, Icon, Button, Collapse, DatePicker, InputNumber } from 'antd';
import NumberFormat from 'react-number-format';
import FooterToolbar from '../../common/widget/FooterToolbar/FooterToolbar';


const Option = Select.Option;
const Panel = Collapse.Panel;

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  //const hasError = meta.touched && meta.invalid;
  return (  
      <Component {...input} {...rest} children={children} />  
  );
};

const AInput = makeField(Input);
const ASelect = makeField(Select);
const ANumberFormat = makeField(NumberFormat);
const AMaskedInput = makeField(MaskedInput);


class PacienteForm extends Component {
    state = {
      loadingCidades: false
    };

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

    onChangeEstado = value => {
      console.log(value);
      this.setState({loadingCidades: true});
      if (value) {
        this.props.getCidades(value);
      }
      this.setState({loadingCidades: false});
      console.log(this.props.cidades);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
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

      const {readOnly, generoSexualList, escolaridadeList, situacaoFamiliarList, estadosList, cidadesList } = this.props;
      const { getFieldDecorator, getFieldProps } = this.props.form;
      const telefones = this.props.telefones || [];
      const dateFormatList = ['DD/MM/YYYY','DD/MM/YY'];
      const cidades = cidadesList || [];
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
            props={{
                className: 'ant-input', 
                format: '(##)#####-####', 
                placeholder: "(__)_____-____",                
              }} 
            component={ANumberFormat} 
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
          <Form onSubmit={this.handleSubmit}>
            
            <Collapse defaultActiveKey={['1']} style={{marginBottom: '15px'}}>
              <Panel header="Informações Básicas" key="1">
              
                <Form.Item {...formItemLayout} label="Nome Completo:" id="form.nome.label" required>
                  {
                    getFieldDecorator('nome', {
                    rules: [
                      {
                        required: true, message: 'Por favor, insira o nome do paciente!',
                      }
                    ],
                    })(
                      <Input name="nome" readOnly={readOnly} placeholder="Digite aqui o nome completo do paciente" />
                    )
                  }                    
                </Form.Item>
                <Form.Item {...formItemLayoutSmall} label="Gênero Sexual:" id="form.GeneroId.label">
                  {
                    getFieldDecorator('GeneroId')(
                      <Select name="nome" readOnly={readOnly} placeholder="Selecione">
                        {this.renderOptions(generoSexualList)}
                      </Select>
                    )
                  }                    
                </Form.Item>
                 <Form.Item {...formItemLayoutSmall} label="Data de Nascimento:" id="form.datanascimento.label" required>
                  {
                    getFieldDecorator('dataNascimento', {
                    rules: [
                      {
                        type: 'object',
                        required: true,
                        message: 'Por favor, insira a data de nascimento do paciente!',
                      }
                    ],
                    })(
                      <DatePicker name="dataNascimento" format='DD/MM/YYYY' readOnly={readOnly} />
                    )
                  }                    
                </Form.Item>
                 <Form.Item {...formItemLayoutSmall} label="CPF:" id="form.cpf.label">                  
                  <NumberFormat {...getFieldProps('cpf')} name="cpf" className='ant-input' format='###.###.###-##' placeholder="___.___.___-__" readOnly={readOnly} />
                </Form.Item>
                <Form.Item {...formItemLayoutSmall} label="Documento de Identidade:" id="form.documentoIdentidade.label">
                  {
                    getFieldDecorator('documentoIdentidade')
                    (
                      <Input name="documentoIdentidade" readOnly={readOnly}  />
                    )
                  }                    
                </Form.Item>
                <Form.Item {...formItemLayoutMedium} label="Naturalidade:" id="form.naturalidade.label">
                  {
                    getFieldDecorator('naturalidade')
                    (
                      <Input name="naturalidade" readOnly={readOnly} placeholder="Cidade de nascimento" />
                    )
                  }                    
                </Form.Item>
                <Form.Item {...formItemLayoutMedium} label="Nacionalidade:" id="form.nacionalidade.label">
                  {
                    getFieldDecorator('nacionalidade')
                    (
                      <Input name="nacionalidade" readOnly={readOnly} placeholder="País de nascimento" />
                    )
                  }                    
                </Form.Item>
               
              </Panel>
              
              <Panel header="Informações de Endereço" key="2">
                  <Form.Item {...formItemLayout} label="Logradouro:" id="form.logradouro.label">
                    {
                      getFieldDecorator('enderecos[0].logradouro')
                      (
                        <Input name="enderecos[0].logradouro" readOnly={readOnly} placeholder="Ex.: Rua Sete de Setembro" />
                      )
                    }                      
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Bairro:" id="form.bairro.label">
                    {
                      getFieldDecorator('enderecos[0].bairro')
                      (
                        <Input name="enderecos[0].bairro" readOnly={readOnly} placeholder="Ex.: Centro" />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutSmall} label="Número:" id="form.numero.label">
                    {
                      getFieldDecorator('enderecos[0].numero')
                      (
                        <Input name="enderecos[0].numero" readOnly={readOnly} />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Complemento:" id="form.complemento.label">
                    {
                      getFieldDecorator('enderecos[0].complemento')
                      (
                        <Input name="enderecos[0].complemento" readOnly={readOnly} />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Referência:" id="form.referencia.label">
                    {
                      getFieldDecorator('enderecos[0].referencia')
                      (
                        <Input name="enderecos[0].referencia" readOnly={readOnly} />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutSmall} label="CEP:" id="form.cep.label">                    
                      <NumberFormat {...getFieldProps('enderecos[0].cep')} name="enderecos[0].cep" className='ant-input' format='##.###-###' placeholder="__.___-___" readOnly={readOnly} />                      
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Estado:" id="form.estado.label">
                    {
                      getFieldDecorator('estado')(
                        <Select name="estado" readOnly={readOnly} placeholder="Selecione" onChange={this.onChangeEstado}>
                          {this.renderOptions(estadosList)}
                        </Select>
                      )
                    }
                  </Form.Item>
                 <Form.Item {...formItemLayoutMedium} label="Cidade:" id="form.cidade.label">
                    {
                      getFieldDecorator('enderecos[0].cidadeId')(
                        <Select name="enderecos[0].cidadeId" loading={this.state.loadingCidades} readOnly={readOnly} placeholder="Selecione">
                          {this.renderOptions(cidades)}
                        </Select>
                      )
                    }                      
                  </Form.Item>
              
              </Panel>
               
              <Panel header="Informações para Contato" key="3">

                  <Form.Item {...formItemLayoutMedium} label="Email:" id="form.email.label">
                    {
                      getFieldDecorator('email', {
                        rules: [
                          {
                          type: 'email', message: 'Por favor, insira um email válido!',
                          }
                        ]
                      })
                      (
                      <Input name="email" readOnly={readOnly} placeholder="exemplo@gmail.com" />
                      )
                    }                      
                  </Form.Item>
                  {fieldsTelefone}
                  <Form.Item {...formItemLayoutSmallWithOutLabel}>
                    <Button type="dashed" style={{ width: '60%' }} onClick={() => this.addTelefone(telefones.length)}>
                      <Icon type="plus" /> Telefone
                    </Button>
                  </Form.Item>
                  
              </Panel>
            {/*
              <Panel header="Informações sobre Família" key="4">
                  <Form.Item {...formItemLayout} label="Nome do Pai:" id="form.nomePai.label">
                      <Field name="nomePai" readOnly={readOnly} component={AInput} placeholder="Nome completo do pai do paciente" />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Nome da Mãe:" id="form.nomeMae.label">
                      <Field name="nomeMae" readOnly={readOnly} component={AInput} placeholder="Nome completo da mãe do paciente" />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Situação Familiar:" id="form.SituacaoFamiliar.label">
                      <Field name="SituacaoFamiliarId" readOnly={readOnly} placeholder="Selecione" component={ASelect}>
                        {this.renderOptions(situacaoFamiliarList)}
                      </Field>
                  </Form.Item>
              
              </Panel>

              <Panel header="Informações profissionais e acadêmicas" key="5">               
                  <Form.Item {...formItemLayoutMedium} label="Profissão:" id="form.profissao.label">
                      <Field name="profissao" readOnly={readOnly} component={AInput} placeholder="Profissão"/>
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Escolaridade:" id="form.EscolaridadeId.label">
                      <Field name="EscolaridadeId" readOnly={readOnly} placeholder="Selecione" component={ASelect}>
                        {this.renderOptions(escolaridadeList)}
                      </Field>
                  </Form.Item>                  
              </Panel>*/}
              
            </Collapse>

            
            <FooterToolbar>
              <Button htmlType="submit" type="primary">Salvar Paciente</Button>
            </FooterToolbar>
                
          </Form>
        );
    }
}


const WrappedPacienteForm = Form.create({name: 'pacienteForm'})(PacienteForm);

const mapStateToProps = state => ({
  generoSexualList: state.generoSexual.list,
  escolaridadeList: state.escolaridade.list,
  tipoSanguineoList: state.tipoSanguineo.list,
  situacaoFamiliarList: state.situacaoFamiliar.list,
  estadosList: state.endereco.estadosList,
  cidadesList: state.endereco.cidadesList
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGeneroSexual, getEscolaridade, getTipoSanguineo, getSituacaoFamiliar, getEstados, getCidades, init
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedPacienteForm);