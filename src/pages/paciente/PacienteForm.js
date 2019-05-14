import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getGeneroSexual } from '../../actions/generoSexualActions';
import { getEscolaridade } from '../../actions/escolaridadeActions';
import { getTipoSanguineo } from '../../actions/tipoSanguineoActions';
import { getSituacaoFamiliar } from '../../actions/situacaoFamiliarActions';
import { getEstados, getCidades } from '../../actions/enderecoActions';

import { Form, Input, Select, Icon, Button, Collapse, DatePicker } from 'antd';
import NumberFormat from 'react-number-format';
import FooterToolbar from '../../common/widget/FooterToolbar/FooterToolbar';


const Option = Select.Option;
const Panel = Collapse.Panel;

let id = 0;

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
    }

    renderOptions(list) {
      const options = list || [{}];  
      return options.map(item => (
        <Option key={item.id} value={item.id}>{item.nome}</Option>
      ));
    }

    addTelefone = () => {
      const { form } = this.props;
      const telefones = form.getFieldValue('fones');
      console.log(telefones);
      const nextTelefone = telefones.concat(id++);
      form.setFieldsValue({
        fones: nextTelefone
      });
    }

    removeTelefone = t => {
      const { form } = this.props;
      const telefones = form.getFieldValue('fones');
      if (telefones.length === 1) {
        return;
      }      
      form.setFieldsValue({
        fones: telefones.filter(telefone => telefone !== t),
      });
    }

    onChangeEstado = value => {
      console.log(value);
      this.setState({loadingCidades: true});
      if (value) {
        this.props.getCidades(value);
        this.props.form.setFieldsValue({
          'enderecos[0].cidadeId': null
        });
      }
      this.setState({loadingCidades: false});      
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
      const { getFieldDecorator, getFieldProps, getFieldValue } = this.props.form;

      const cidades = cidadesList || [];

      getFieldDecorator('fones', {initialValue: []});
      const telefones = getFieldValue('fones');
      const fieldsTelefone = telefones.map((t, index) => (
        <Form.Item 
          key={t}
          {...(index === 0 ? formItemLayoutSmall : formItemLayoutSmallWithOutLabel)}
          label={index === 0 ? 'Telefones' : ''}
          required={false}
          id="form.fones.label"
        >
          <NumberFormat 
            {...getFieldProps(`telefones[${t}].numero`)}
            className='ant-input' 
            format='(##)#####-####' 
            placeholder="(__)_____-____" 
            readOnly={readOnly}
            style={{ width: '60%', marginRight: 8 }} 
          />

          {telefones.length > 1 ? ( 
            <Icon key={`ic-${index}`}             
              className="dynamic-delete-button"
              type="minus-circle"
              onClick={() => this.removeTelefone(t)}
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
                    getFieldDecorator('documentoIdentidade')(<Input name="documentoIdentidade" readOnly={readOnly}  />)
                  }                    
                </Form.Item>
                <Form.Item {...formItemLayoutMedium} label="Naturalidade:" id="form.naturalidade.label">
                  {
                    getFieldDecorator('naturalidade')(
                      <Input name="naturalidade" readOnly={readOnly} placeholder="Cidade de nascimento" />
                      )
                  }                    
                </Form.Item>
                <Form.Item {...formItemLayoutMedium} label="Nacionalidade:" id="form.nacionalidade.label">
                  {
                    getFieldDecorator('nacionalidade')(
                      <Input name="nacionalidade" readOnly={readOnly} placeholder="País de nascimento" />
                    )
                  }                    
                </Form.Item>
               
              </Panel>
              
              <Panel header="Informações de Endereço" key="2">
                  <Form.Item {...formItemLayout} label="Logradouro:" id="form.logradouro.label">
                    {
                      getFieldDecorator('enderecos[0].logradouro')(
                        <Input name="enderecos[0].logradouro" readOnly={readOnly} placeholder="Ex.: Rua Sete de Setembro" />
                      )
                    }                      
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Bairro:" id="form.bairro.label">
                    {
                      getFieldDecorator('enderecos[0].bairro')(
                        <Input name="enderecos[0].bairro" readOnly={readOnly} placeholder="Ex.: Centro" />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutSmall} label="Número:" id="form.numero.label">
                    {
                      getFieldDecorator('enderecos[0].numero')(
                        <Input name="enderecos[0].numero" readOnly={readOnly} />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Complemento:" id="form.complemento.label">
                    {
                      getFieldDecorator('enderecos[0].complemento')(
                        <Input name="enderecos[0].complemento" readOnly={readOnly} />
                      )
                    }
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Referência:" id="form.referencia.label">
                    {
                      getFieldDecorator('enderecos[0].referencia')(
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
                      })(
                      <Input name="email" readOnly={readOnly} placeholder="exemplo@gmail.com" />
                      )
                    }                      
                  </Form.Item>
                  {fieldsTelefone}
                  <Form.Item {...formItemLayoutSmallWithOutLabel}>
                    <Button type="dashed" style={{ width: '60%' }} onClick={this.addTelefone}>
                      <Icon type="plus" /> Telefone
                    </Button>
                  </Form.Item>
                  
              </Panel>
            
              <Panel header="Informações sobre Família" key="4">
                  <Form.Item {...formItemLayout} label="Nome do Pai:" id="form.nomePai.label">
                    {
                      getFieldDecorator('nomePai')(
                        <Input readOnly={readOnly} placeholder="Digite o nome completo do pai do paciente" />
                      )
                    }                      
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Nome da Mãe:" id="form.nomeMae.label">
                    {
                      getFieldDecorator('nomeMae')(
                        <Input readOnly={readOnly} placeholder="Digite o nome completo da mãe do paciente" />
                      )
                    }                      
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Situação Familiar:" id="form.SituacaoFamiliar.label">
                    {
                      getFieldDecorator('SituacaoFamiliarId')(
                        <Select readOnly={readOnly} placeholder="Selecione">
                          {this.renderOptions(situacaoFamiliarList)}
                        </Select>
                      )
                    }                      
                  </Form.Item>
              
              </Panel>

              <Panel header="Informações profissionais e acadêmicas" key="5">               
                  <Form.Item {...formItemLayoutMedium} label="Profissão:" id="form.profissao.label">
                    {
                      getFieldDecorator('profissao')(
                        <Input readOnly={readOnly} placeholder="Ex.: Analista de Sistemas" />
                      )
                    }                      
                  </Form.Item>
                  <Form.Item {...formItemLayoutMedium} label="Escolaridade:" id="form.EscolaridadeId.label">
                    {
                      getFieldDecorator('EscolaridadeId')(
                        <Select readOnly={readOnly} placeholder="Selecione">
                          {this.renderOptions(escolaridadeList)}
                        </Select>
                      )
                    }                      
                  </Form.Item>                  
              </Panel>
              
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
  getGeneroSexual, getEscolaridade, getTipoSanguineo, getSituacaoFamiliar, getEstados, getCidades
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedPacienteForm);