import React, { Component } from 'react';
import {connect} from 'react-redux';
import './footerToolbar.css';

class FooterToolbar extends Component {

  render() {
    const { children, extra, collapsed } = this.props;
    const width = collapsed ? '80px' : '256px';
    return (
      <div className="toolbar" style={{ width: `calc(100% - ${width})` }}>
        <div className="left">{extra}</div>
        <div className="right">{children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.layout.collapsed
});

export default connect(mapStateToProps)(FooterToolbar);