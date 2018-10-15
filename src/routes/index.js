import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NickNameAndPhone from '../screens/Profile/NickNameAndPhone/NickNameAndPhone';

export default () =>  (
    <Switch>
        <Route key='nickAndPh' path='/profile/nickNameAndPhone' component={NickNameAndPhone} />
    </Switch>
)