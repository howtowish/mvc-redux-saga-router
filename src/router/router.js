import React from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
// import home from '../components/home/home'
import home from 'home'
import Test from '../components/test'
import * as sceneTypes from '../constants/scene.constants'
import history from "../_helper";
import Error from '../components/error'
// import {Router,Route,browe } from 'react-router'
class Routes extends React.Component {

    render() {
        return (
            <BrowserRouter >
                <Switch>
                    <Route path={sceneTypes.LOGIN_DIR_SCENE} component={Test} />
                    <Route path={sceneTypes.HOME_DIR_SCENE} component={home} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Routes;