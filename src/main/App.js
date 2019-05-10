import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Routes from './routes';
import {Router} from 'react-router-dom';

import { Layout } from 'antd';
import SideBar from '../common/template/sidebar/SideBar';
import TopBar from '../common/template/topbar/TopBar';
import history from './history';

import { toggle } from '../actions/layoutActions';

import './App.css';

const {Content} = Layout;

class App extends Component {

  state = {    
    date: null,
  };

  render() {
    const {collapsed} = this.props;
    return (
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar collapsed={collapsed} />
          <Layout>
            <TopBar collapsed={collapsed} />
            <Content>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.layout.collapsed
});

const mapDispatchToProps = dispatch => bindActionCreators({toggle}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);