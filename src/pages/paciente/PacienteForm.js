import React, { Component } from 'react';
import { Form, Input } from 'antd';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

class PacienteForm extends Component {
    state = {  }

    render() { 
        return ( 
            <Form layout="horizontal">
                <Form.Item label="Nome Completo:">
                    <Input />
                </Form.Item>

            </Form>
         );
    }
}
 
export default PacienteForm;