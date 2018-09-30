import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from 'actions'
import { bindActionCreators } from 'redux';
import {withRouter} from 'react-router-dom'

import * as constants from 'constants';
import * as selectors from 'selectors'

class Admin extends Component {
  constructor(props){
    super(props)
    this.onLogout=this.onLogout.bind(this);
  }
  onLogout(){
    this.props.onLogoutUserRequest({data:"",history:this.props.history});
  }
  render() {
    return (
      <div style={{ flex: 1 }}>
        Admin
        <button type="button" onClick={this.onLogout} className="btn btn-danger">Logout</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        //   getsignupUser:selectors.getsignupUser(state)
        getData:selectors.getData(state)
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
