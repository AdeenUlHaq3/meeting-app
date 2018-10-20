import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import Login from '../screens/Login/Login';
import NickNameAndPhone from '../screens/Profile/NickNameAndPhone/NickNameAndPhone';
import ChooseImages from '../screens/ChooseImages/ChooseImages'; 
import BeveragesAndMeetingDuration from '../screens/BeveragesAndMeetingDuration/BeveragesAndMeetingDuration';
import SelectLocation from '../screens/SelectLocation/SelectLocation';
import DashBoard from '../screens/DashBoard/DashBoard';
import RecommendedPeoples from '../screens/RecommendedPeoples/RecommendedPeoples';

export default () =>  (
    <div>
        <Route component={ AppBar } />
        {/* <Route exact path='/' component={ Login } /> */}
        <Route path='/profile/nickNameAndPhone' component={ NickNameAndPhone } />
        <Route path='/profile/chooseImages' component={ ChooseImages } />
        <Route path='/profile/beveragesAndMeetingDuration' component={ BeveragesAndMeetingDuration } />
        <Route path='/profile/selectLocation' component={ SelectLocation } />
        <Route path='/dashboard' component={ DashBoard } />
        <Route path='/' component={ RecommendedPeoples } />
    </div>
);