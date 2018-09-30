import React, { Component } from 'react'
import Routers from '../router/router'
import * as actions from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as selectors from 'selectors'
import * as constants from 'constants'
import { ClipLoader } from 'react-spinners';
import styled, { css } from 'react-emotion'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentWillMount(){
    //check token and fetchData from token
    if (localStorage.jwtToken) {
      this.props.fetchDataRequest()
      if (window.location.pathname.substring(0,6) == constants.LOGIN_DIR_SCENE) {
        window.history.back().then(()=>{console.log("ok")});
      }
    }
    else {
      if (window.location.pathname.substring(0,6) != constants.LOGIN_DIR_SCENE) {
        window.location.assign(constants.LOGIN_DIR_SCENE).then(()=>{console.log("ok")})
      }
    }
  }
  componentDidMount() {
    // if (localStorage.jwtToken) {
     
    //   this.props.fetchDataRequest()
     
    // }
    // else {
    //   if (window.location.pathname != "/login") {
    //     window.location.href = '/login'

    //   }
    //   // this.setState({
    //   //   loading:true
    //   // })
    // }

  }
  render() {
    console.log("Apppp",this.props.getData)
    return (

      <div>
        {
          this.state.loading ? <ClipLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          /> :
            <Routers />
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
         getData:selectors.getData(state)
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App)
