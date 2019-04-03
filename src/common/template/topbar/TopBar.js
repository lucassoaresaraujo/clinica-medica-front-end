import React from 'react';

import './TopBar.css';

import { Layout, Icon } from 'antd';
const { Header } = Layout;

class TopBar extends React.Component{

    render(){
        const {toggle, collapsed} = this.props;
        return (
            <React.Fragment>
                <Header style={{ background: '#fff', padding: 0, boxShadow: '0 1px 4px rgba(0,21,41,.08)', position: 'relative' }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                </Header>
            </React.Fragment>
        );
    }
}

export default TopBar;