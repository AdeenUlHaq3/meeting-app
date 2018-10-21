import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import NickNameAndPhone from '../screens/Profile/NickNameAndPhone/NickNameAndPhone';
import ChooseImages from '../screens/ChooseImages/ChooseImages'; 
import BeveragesAndMeetingDuration from '../screens/BeveragesAndMeetingDuration/BeveragesAndMeetingDuration';
import SelectLocation from '../screens/SelectLocation/SelectLocation';
import DashBoard from '../screens/DashBoard/DashBoard';
import RecommendedPeoples from '../screens/RecommendedPeoples/RecommendedPeoples';

export default (props) =>  {
    const {
        isUser,
        activeUser
    } = props.Routes;
    
    return(
        <div>
        <Route render={(props) => <AppBar {...props} AppBar={{isUser, activeUser}} />} />
        <Route path='/profile/nickNameAndPhone' component={ NickNameAndPhone } />
        <Route path='/profile/chooseImages' component={ ChooseImages } />
        <Route path='/profile/beveragesAndMeetingDuration' component={ BeveragesAndMeetingDuration } />
        <Route path='/profile/selectLocation' component={ SelectLocation } />
        <Route path='/dashboard' component={ DashBoard } />
        <Route path='/recommendedPeoples' component={ RecommendedPeoples } />
    </div>
    );
};