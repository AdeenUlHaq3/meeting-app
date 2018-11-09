import React from 'react';
import NotificationsList from './components/lists/Notifications';

class Notifications extends React.Component {
    render() {
        const {
            notifications
        } = this.props.Notifications;

        return(
            <div>
                {
                    notifications.map(notification => {
                        return(
                            <NotificationsList NotificationsList={{notification}} />
                        );
                    })
                }
            </div>
        );
    };
};

export default Notifications;