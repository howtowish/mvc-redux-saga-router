import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Routers from '../router/router'
import setAuthToken from '../utils/setAuthToken';
import * as actions from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as selectors from 'selectors'
// const store = configureStore()
// import History from 'History'
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   setAuthToken(false);
//   // Decode token and get user info and exp
//   //  const decoded = jwt_decode(localStorage.jwtToken);
//   // Set user and isAuthenticated
//   //store.dispatch(setCurrentUser(decoded));
//   console.log("jwttoken", localStorage.jwtToken);
//   // if (window.location.pathname == "/login") {
//   //   window.location.reload()
//   // }
//   console.log(window.location)
//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   // if (decoded.exp < currentTime) {
//   //   // Logout user
//   //  // store.dispatch(logoutUser());
//   // console.log(store)
//   store.dispatch(actions.onLogoutUserRequest({data:"aa"}))
//   //   // Clear current Profile
//   // //  store.dispatch(clearCurrentProfile());
//   //   // Redirect to login
//   // window.location.href = '/login';
//   // }
// }
// else {
//   if (window.location.pathname != "/login") {
//     window.location.href = '/login'
//   }
// }
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
    if (localStorage.jwtToken) {
      this.props.fetchDataRequest()
      if (window.location.pathname.substring(0,6) == "/login") {
        window.history.back().then(()=>{console.log("ok")});
      }
    }
    else {
      if (window.location.pathname.substring(0,6) != "/login") {
        window.location.assign('/login').then(()=>{console.log("ok")})
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
