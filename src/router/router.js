import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import home from '../components/home/home'
import home from 'home'
import Test from '../components/test'
import * as sceneTypes from '../constants/scene.constants'
import Customer from 'Customer'
import subCustomer from 'subCustomer'
import Admin from 'Admin'
import Error from '../components/error'
class Routes extends React.Component {

    render() {
        return (
            <BrowserRouter >
                <Switch>
                    <Route path={sceneTypes.LOGIN_DIR_SCENE} component={Test} />
                    <Route path={sceneTypes.HOME_DIR_SCENE} component={home} />
                    <Route path={sceneTypes.CUSTOMER_DIR_SCENE} component={Customer} />
                    <Route path={sceneTypes.SUB_CUSTOMER_DIR_SCENE} component={subCustomer} />
                    <Route path={sceneTypes.ADMIN_DIR_SCENE} component={Admin} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Routes;