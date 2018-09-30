import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from 'actions'
import { bindActionCreators } from 'redux';
// import * as sceneTypes from '../../constants/scene.constants'
import {withRouter} from 'react-router-dom'
import * as constants from 'constants';
import * as selectors from 'selectors'
class Home extends Component {
  constructor(props){
    super(props)
    this.onLogout=this.onLogout.bind(this);
  }
  onLogout(){
    // localStorage.removeItem("jwtToken")
    this.props.onLogoutUserRequest({data:"",history:this.props.history});
    console.log("getLogin",this.props.getData)
    // this.props.history.push(constants.LOGIN_DIR_SCENE)
  }
  render() {
      console.log(this.props);
      console.log(this.props.match.params.id);
    return (
      <div style={{ flex: 1 }}>
        <p>{this.props.match.params.id}</p>
        <h1>HOME </h1>
        {/* this.props.history.push(ceneTypes.LOGIN_DIR_SCENE) */}
        <button onClick={()=>{this.props.history.push(constants.LOGIN_DIR_SCENE)}} type="button" className="btn btn-success">PUSH</button>
        <button onClick={this.onLogout} type="button" className="btn btn-success">Logout</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
