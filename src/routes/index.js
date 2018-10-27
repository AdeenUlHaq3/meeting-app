import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import NickNameAndPhone from '../screens/Profile/NickNameAndPhone/NickNameAndPhone';
import ChooseImages from '../screens/Profile/ChooseImages/ChooseImages';
import BeveragesAndMeetingDuration from '../screens/Profile/BeveragesAndMeetingDuration/BeveragesAndMeetingDuration';
import SelectLocation from '../screens/Profile/SelectLocation/SelectLocation';
import DashBoard from '../screens/DashBoard/DashBoard';
import RecommendedPeoples from '../screens/RecommendedPeoples/RecommendedPeoples';
import Notifications from '../screens/Notifications/Notifications';

export default (props) => {
    const {
        isUser,
        notifications,
        activeUser,
        logOut
    } = props.Routes;

    return (
        <div>
            <Route render={(props) => <AppBar {...props} AppBar={{ isUser, notifications, activeUser, logOut }} />} />
            <Route path='/profile/nickNameAndPhone' component={NickNameAndPhone} />
            <Route path='/profile/chooseImages' component={ChooseImages} />
            <Route path='/profile/beveragesAndMeetingDuration' component={BeveragesAndMeetingDuration} />
            <Route path='/profile/selectLocation' component={SelectLocation} />
            <Route path='/dashboard' component={DashBoard} />
            <Route path='/recommendedPeoples' component={RecommendedPeoples} />
            <Route path='/notifications'  render={(props) => <Notifications {...props} Notifications={{ notifications }} />} />
        </div>
    );
};