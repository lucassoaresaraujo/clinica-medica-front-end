import React from 'react';
import { connect } from 'react-redux'
import './TopBar.css';

import { Layout, Icon, Menu, Dropdown, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { toggle } from '../../../actions/layoutActions';
const { Header } = Layout;
const menu = (
    <Menu >
      <Menu.Item key="1"><Icon type="user" />1st menu item</Menu.Item>
      <Menu.Item key="2"><Icon type="user" />2nd menu item</Menu.Item>
      <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
    </Menu>
  );

class TopBar extends React.Component{
      
    render(){
        const {toggle, collapsed} = this.props;
        return (
            <React.Fragment>
                <Header  style={{ background: '#fff', padding: 0, boxShadow: '0 1px 4px rgba(0,21,41,.08)', overflow: 'hidden'}}>                                                                    
                            
                            
                                    <Icon
                                        className="trigger"
                                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={toggle}
                                    />                        
                            
                                
                                    <Dropdown overlay={menu} style={{float: 'rigth'}} >
                                        <Button style={{ marginLeft: 8 }}>
                                        Button <Icon type="down" />
                                        </Button>
                                    </Dropdown>                                     
                                
                                
                            
                </Header>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({toggle}, dispatch);

export default connect(null, mapDispatchToProps)(TopBar);