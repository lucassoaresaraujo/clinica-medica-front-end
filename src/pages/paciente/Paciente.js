import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getList} from '../../actions/pacienteActions';

import { Link } from 'react-router-dom';
import { Row, Button, Col, Table, Divider, Pagination, Form, Input } from 'antd';
import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';

import moment from 'moment';
import NumberFormat from 'react-number-format';
  
const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        sorter: true,
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        key: 'cpf',
        render: text => text ? <NumberFormat value={text} displayType={'text'} format="###.###.###-##" /> : <em>não informado</em>
    },
    {
        title: 'Data Nascimento',
        dataIndex: 'dataNascimento',
        key: 'dataNascimento',
        render: text => moment(text).format("DD/MM/YYYY")
    }, {
        title: 'Ações',
        key: 'acoes',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Visualizar</a>
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
        pageSize: 5,
        order: "ASC",
        orderBy: "nome",
        filtro: ''
    };

    componentDidMount() {
        this.setState({loading: true});
        const options = {
            currentPage: this.state.currentPage,
            pageSize: this.state.pageSize,
            order: this.state.order,
            orderBy: this.state.orderBy,
            filtro: this.state.filtro
        }
        this.props.getList(options.currentPage, options.pageSize, options.order, options.orderBy,options.filtro);
        this.setState({loading: false});
    }

    onChange = (pagination, filters, sorter) => {
        const order = this.getOrder(sorter.order);        
        this.setState({
            order: order,
            orderBy: sorter.field,
            currentPage: pagination.current,
            pageSize: pagination.pageSize,            
        }, this.realizarConsulta);     
    }

    realizarConsulta = () => {    
        const options = {
            currentPage: this.state.currentPage,
            pageSize: this.state.pageSize,
            order: this.state.order,
            orderBy: this.state.orderBy,
            filtro: this.state.filtro,
        }
        this.setState({loading: true});
        this.props.getList(options.currentPage, options.pageSize, options.order, options.orderBy, options.filtro);
        console.log(this.props.list);
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
        this.realizarConsulta();
    }

    handleSubmitLimpar = e => {
        e.preventDefault();
        this.setState({
            sortedInfo: null,
            filtro: '',
            currentPage: 1
        }, this.realizarConsulta);
    }

    handleChangeFiltro = (e) => {
        this.setState({ filtro: e.target.value });
    }

    showTotal = (total) => {
        return `Total de ${total} registros encontrados`;
    }

    render() {         
        const pacientes = this.props.list.pacientes || [];
        const total = this.props.list.total || 0;
        const pagination = {
            total: total,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showTotal: this.showTotal,
            showQuickJumper: true,
            current: this.state.currentPage
        };
        return (
             <React.Fragment>
                <PageHeader 
                    title="Lista de Pacientes"
                    breadcrumb={[{name: 'Home', href: '/'}, {name: 'Paciente'}]}
                    description="Todas os seus pacientes estão aqui." />
                <PageContent>
                    <Form layout="inline" onSubmit={this.handleSubmitBuscar}>
                        <Form.Item label="Nome ou CPF:">
                            <Input                                
                                onChange={this.handleChangeFiltro}
                                value={this.state.filtro} />
                        </Form.Item>            
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Buscar
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={this.handleSubmitLimpar}>
                                Limpar
                            </Button>
                        </Form.Item>
                        <Form.Item style={{float: "right", marginRight: "0"}}>
                            <Link to="/paciente/novo"><Button type="primary" icon="plus-circle">Novo Paciente</Button></Link>
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