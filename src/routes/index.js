import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from '../components/AppBar';
import NickNameAndPhone from '../screens/Profile/NickNameAndPhone';
import ChooseImages from '../screens/Profile/ChooseImages';
import BeveragesAndMeetingDuration from '../screens/Profile/BeveragesAndMeetingDuration';
import SelectLocation from '../screens/Profile/SelectLocation';
import DashBoard from '../screens/DashBoard';
import RecommendedPeoples from '../screens/RecommendedPeoples';
import Notifications from '../screens/Notifications';
import EditProfile from '../screens/Profile/EditProfile';
// import Steps from '../screens/Profile';

export default (props) => {
    const {
        isUser,
        notifications,
        pendingNotifications,
        activeUser,
        logOut
    } = props.Routes;
    
    return (
        <div>
            <Route render={(props) => <AppBar {...props} AppBar={{ isUser, notifications, pendingNotifications, activeUser, logOut }} />} />
            <Route path='/profile/nickNameAndPhone' component={NickNameAndPhone} />
            <Route path='/profile/chooseImages' component={ChooseImages} />
            <Route path='/profile/beveragesAndMeetingDuration' component={BeveragesAndMeetingDuration} />
            <Route path='/profile/selectLocation' component={SelectLocation} />
            <Route path='/dashboard' component={DashBoard} />
            <Route path='/recommendedPeoples' component={RecommendedPeoples} />
            <Route path='/notifications' render={(props) => <Notifications {...props} notifications={notifications} />} />
            <Route path='/editProfile' component={EditProfile} />
            {/* <Route path='/' component={Steps} /> */}
        </div>
    );
};