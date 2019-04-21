import React from 'react';
import { withRouter } from 'react-router'

import './SiderBar.css';

import { Menu, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import {Link} from 'react-router-dom';

const itensMenu = [
    {
        id: 1,
        icon: 'home',
        name: 'Dashboard',
        link: '/',        
    },
    {
        id: 2,
        icon: 'team',
        name: 'Paciente',
        link: '/paciente',
        correlate: [
            {        
                link: '/paciente/novo',
            }
        ]
    },
    {
        id: 3,
        icon: 'team',
        name: 'Fornecedor',
        link: '/fornecedor'
    },
    {
        id: 4,
        icon: 'upload',
        name: 'Upload',
        children: [
            {
                id: 5,
                icon: 'user',
                name: 'Analise',
                link: '/up',
            },
            {
                id: 6,
                icon: 'user',
                name: 'Teste 6',
                link: '/te',
            },
            {
                id: 7,                
                name: 'Teste 7',
                link: '/s',
                children: [
                    {
                        id: 8,
                        name: 'Teste 8',
                        link: '/teste2',
                    }
                ]
            }

        ]
    }
];



class SideBar extends React.Component{

    renderItemMenu = (item) => {
        if (item.hasOwnProperty('children') && Array.isArray(item.children) && item.children.length){
            return (
                <Menu.SubMenu 
                    key={item.id} 
                    title={<span> {item.hasOwnProperty('icon') ? (<Icon type={item.icon} />) : null}<span>{item.name}</span></span>}
                >
                    {item.children.map(child => {
                       return this.renderItemMenu(child);
                    })}
                </Menu.SubMenu>
            );
        } else {
            return (
                <Menu.Item key={item.id}>
                    {item.hasOwnProperty('icon') ? (<Icon type={item.icon} />) : null}
                    <span>{item.name}</span>
                    <Link to={item.link} />
                </Menu.Item>
            );
        }
    }
    renderMenu = () => {
        return itensMenu.map(item => {
            return this.renderItemMenu(item);
        });
    }

    getSelectedItemMenu = () => {
        const { pathname } = this.props.location;    
        return itensMenu.filter(item => {    
            if (item.link === pathname || this.checkPathNameCorrelate(item.correlate))                
                return item;
            return null;
        }).map(item => {
            return `${item.id}`;
        }); 
    }

    checkPathNameCorrelate = correlate => {
        const { pathname } = this.props.location;        
        if (Array.isArray(correlate) && correlate.length) {
            return correlate.map(item => {
                console.log(pathname);                
                if (item.link === pathname){
                    return true
                }                    
            });
        }
        return false;
    }

    render(){
        const {collapsed} = this.props;
        return (
          <React.Fragment>
            <Sider
                trigger={null}
                collapsible          
                breakpoint="lg"          
                collapsed={collapsed}
                width={256}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" selectedKeys={this.getSelectedItemMenu()}>
                    {this.renderMenu()}
                </Menu>
            </Sider>
          </React.Fragment>
        );
    }
}

export default withRouter(SideBar);