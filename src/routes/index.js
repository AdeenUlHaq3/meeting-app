import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NickNameAndPhone from '../screens/Profile/NickNameAndPhone/NickNameAndPhone';
import ChooseImages from '../screens/ChooseImages/ChooseImages'; 
import Login from '../screens/Login/Login';

export default () =>  (
    <Switch>
        <Route exact path='/' component={ Login } />
        <Route path='/profile/nickNameAndPhone' component={ NickNameAndPhone } />
        <Route path='/profile/chooseImages' component={ ChooseImages } />
    </Switch>
);