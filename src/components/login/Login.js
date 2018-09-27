import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../../actions'
import { bindActionCreators } from 'redux';
import * as selectors from '../../selectors';
import * as constants from 'constants';
import history from '../../_helper'
import {withRouter} from 'react-router-dom'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username || '',
            pws: this.props.pws || '',
            password:'',
            submitted: false,
            tabIndex: 0
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onSubmit() {
        this.setState({
            submitted: true
        })
        if (!this.state.username || !this.state.pws || this.state.submitted) {
            // alert(this.state.submitted)
            return;
        }
        else {
            
            this.props.onLoginUserRequest({ username: this.state.username, pws: this.state.pws });
            
            // this.setState({
            //     username: '',
            //     pws: '',
            //     submitted: true
            // })
        }
        // this.setState({
        //     submitted: false
        // })

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        
        if (username && password) {
            this.props.onLoginUserRequest({ username: username, pws: password,history:this.props.history });
           //this.props.history.push(constants.HOME_DIR_SCENE)
    //             let user = localStorage.getItem('jwtToken');
    //    console.log("ac",JSON.parse(user))
        }
    }
    render() {
       // const { loggingIn } = this.props;
  
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                {this.props.getData.message?<h2>{this.props.getData.message}</h2>:<h2>Login</h2>}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {/* {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } */}
                    </div>
                </form>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))