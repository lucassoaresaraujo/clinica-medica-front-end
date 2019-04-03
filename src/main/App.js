import React, { Component } from 'react';
import './App.css';

import Routes from './routes';

import {Router} from 'react-router-dom';

import { Layout } from 'antd';
import SideBar from '../common/template/sidebar/SideBar';
import TopBar from '../common/template/topbar/TopBar';
import history from './history';
const {Content} = Layout;

class App extends Component {

  state = {
    collapsed: false,
    date: null,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    
    return (
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar collapsed={this.state.collapsed} />
          <Layout>
            <TopBar toggle={this.toggle} collapsed={this.state.collapsed} />
            <Content>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;