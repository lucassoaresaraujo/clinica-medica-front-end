import React from 'react';
import { Card } from 'antd';

class PageContent extends React.Component{

    render(){
        return (
            <Card bordered={false} style={{margin: '10px 16px', background: '#fff', minHeight: 280}}>
                {this.props.children}
            </Card>
        );
    }
}

export default PageContent;