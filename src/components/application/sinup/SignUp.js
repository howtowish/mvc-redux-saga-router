import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from 'actions'
import { bindActionCreators } from 'redux';
import * as selectors from 'selectors';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username || '',
            pws: this.props.pws || '',
            configpws: this.props.pws || '',
            fullname: this.props.fullname || '',
            email: this.props.email || '',
            phone: this.props.phone || '',
            roles: this.props.phone || '',
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit() {
        if (!this.state.username || !this.state.pws || !this.state.configpws || !this.state.fullname || !this.state.email || !this.state.phone) {
            alert("please try it again!!")
            return;
        }
        this.props.onSignupUserRequest({ username: this.state.username, pws: this.state.pws, configpws: this.state.configpws, fullname: this.state.fullname, email: this.state.email, phone: this.state.phone, roles: this.state.roles });
        this.setState({
            username: '',
            pws: '',
            configpws: '',
            fullname: '',
            email: '',
            phone: '',
            roles: '',
        })
    }
    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <input placeholder="Username" value={this.state.username} onChange={evt => this.setState({ username: evt.target.value })} />
                        <input placeholder="password" value={this.state.pws} onChange={evt => this.setState({ pws: evt.target.value })} />
                        <input placeholder="configpassword" value={this.state.configpws} onChange={evt => this.setState({ configpws: evt.target.value })} />
                        <input placeholder="fullname" value={this.state.fullname} onChange={evt => this.setState({ fullname: evt.target.value })} />
                        <input placeholder="email" value={this.state.email} onChange={evt => this.setState({ email: evt.target.value })} />
                        <input placeholder="phone" value={this.state.phone} onChange={evt => this.setState({ phone: evt.target.value })} />
                        <input placeholder="roles" value={this.state.roles} onChange={evt => this.setState({ roles: evt.target.value })} />
                    </div>
                </div>
                <button type="button"  onClick={this.onSubmit} className="btn btn-success">button</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //   getsignupUser:selectors.getsignupUser(state)
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)