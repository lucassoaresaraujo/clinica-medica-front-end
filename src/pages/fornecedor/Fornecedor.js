import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';
import { Row, Button, Table } from 'antd';

const dataSource = [{
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  }, {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }];
  
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }];

class Fornecedor extends Component {
    render() {
        return (
             <React.Fragment>
                <PageHeader 
                    title="Cadastro de Fornecedor"
                    breadcrumb={[{name: 'Home', href: '/'}, {name: 'Fornecedor'}]}
                    description="Todas as informações dos seus fornecedores estão aqui." />

                <PageContent>
                    <Row>
                        <Link to="/"><Button type="primary" icon="plus-circle">Novo</Button></Link>
                    </Row>
                    <Row style={{marginTop: '30px'}}>
                        <Table dataSource={dataSource} columns={columns} size="middle" />
                    </Row>                    
                </PageContent>
             </React.Fragment>
        );
    }
}
 
export default Fornecedor;