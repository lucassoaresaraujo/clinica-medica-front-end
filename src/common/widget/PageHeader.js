import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Breadcrumb } from 'antd';
import {isBlank} from 'underscore.string';
import {Link} from 'react-router-dom';

class PageHeader extends React.Component{

    validBreadcrumb = breadcrumb => {
        if (Array.isArray(breadcrumb) && breadcrumb.length) {            
            return true;
        }
        return false;
    }

    renderBreadcrumb = breadcrumb => {
        return breadcrumb.map(function (item, index) {
            if (isBlank(item.href)){
                return (<Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>);
            } else {
                return (
                    <Breadcrumb.Item key={index}> 
                        <Link to={item.href}>
                            {item.name}
                        </Link>        
                    </Breadcrumb.Item>
                );
            }            
        });
    }
    
    render(){
        const {title, breadcrumb, description} = this.props;
        return (    
            <div 
                style={{
                    background: '#fff',                     
                    borderBottom: '1px solid #e8e8e8',
                    padding: '16px 32px 0',
                }}
            >
                <Row>
                    <Col span={24}>
                        {this.validBreadcrumb(breadcrumb) ? 
                            <Breadcrumb style={{marginBottom: '10px'}}>
                                {this.renderBreadcrumb(breadcrumb)}
                            </Breadcrumb> : null }
                    </Col>                    
                </Row>
                <Row>
                    <Col span={24}>
                        <h1 style={{fontSize: '20px', fontWeight: '500', marginBottom: '10px'}}>
                            {title}
                        </h1>
                    </Col>
                    <Col>
                        <p>{description}</p>
                    </Col>
                </Row>
            </div>
        );
    }

}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumb: PropTypes.array,
    description: PropTypes.string
}

export default PageHeader;