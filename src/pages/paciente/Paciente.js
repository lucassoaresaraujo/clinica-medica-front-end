import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getList} from '../../actions/pacienteActions';

import { Link } from 'react-router-dom';
import { Row, Button, Col, Table, Divider, Pagination, Form, Input } from 'antd';
import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';
  
const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        sorter: (a, b) =>  a.nome.localeCompare(b.nome),
    },
    {
        title: 'Data Nascimento',
        dataIndex: 'dataNascimento',
        key: 'dataNascimento'
    }, {
        title: 'Ações',
        key: 'acoes',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Invite {record.id}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Excluir</a>
          </span>
        ),
      }
];

class Paciente extends Component {

    state = {
        loading: false,
        currentPage: 1,
        pageSize: 2,
        order: "ASC",
        orderBy: "nome"     
    };

    componentWillMount() {
        this.setState({loading: true});
        const options = {
            currentPage: this.state.currentPage,
            pageSize: this.state.pageSize,
            order: this.state.order,
            orderBy: this.state.orderBy
        }
        this.props.getList(options.currentPage, options.pageSize, options.order, options.orderBy);
        this.setState({loading: false});
    }

    onChange = (pagination, filters, sorter) => {
        const order = this.getOrder(sorter.order);
        console.log("Order table", order);
        this.setState({
            order: order,
            orderBy: sorter.field,
            currentPage: pagination.current,
            pageSize: pagination.pageSize,            
        }, this.realizarConsulta);     
    }

    realizarConsulta = () => {
        console.log("State Realizar COnsulta", this.state);
        const options = {
            currentPage: this.state.currentPage,
            pageSize: this.state.pageSize,
            order: this.state.order,
            orderBy: this.state.orderBy
        }
        this.setState({loading: true});
        this.props.getList(options.currentPage, options.pageSize, options.order, options.orderBy);
        this.setState({loading: false});
    }

    getOrder = (order) => {
        if (order==="descend"){
            return "DESC"
        } else {
            return "ASC"
        }
    }

    handleSubmitBuscar = (e) => {
        e.preventDefault();
        console.log("Teste");        
    }

    render() {
        console.log('State Render', this.state);  
        const pacientes = this.props.list.pacientes || [];
        const total = this.props.list.total || 0;
        const pagination = { total: total, pageSize: this.state.pageSize };    
        return (
             <React.Fragment>
                <PageHeader 
                    title="Cadastro de Paciente"
                    breadcrumb={[{name: 'Home', href: '/'}, {name: 'Paciente'}]}
                    description="Todas as informações dos seus pacientes estão aqui." />
                <PageContent>
                    <Form layout="inline" onSubmit={this.handleSubmitBuscar}>
                        <Form.Item label="Nome:">
                            <Input />
                        </Form.Item>
                    
                        <Form.Item label="CPF:">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Buscar
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button>
                                Limpar
                            </Button>
                        </Form.Item>
                        <Form.Item style={{float: "right", marginRight: "0"}}>
                            <Link to="/"><Button type="primary" icon="plus-circle">Novo Paciente</Button></Link>
                        </Form.Item>
                    </Form>
                    
                    <Row style={{marginTop: '30px'}}>
                        <Table 
                            dataSource={pacientes} 
                            columns={columns}
                            rowKey={record => record.id} 
                            size="middle"
                            pagination={pagination}
                            loading={this.state.loading}
                            onChange={this.onChange} />
                    </Row>                    
                </PageContent>
             </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({list: state.paciente.list});
const mapDispathToProps = (dispatch) => bindActionCreators({getList}, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(Paciente);