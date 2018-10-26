import React from 'react';

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
                            <div>{notification.venue}</div>
                        );
                    })
                }
            </div>
        );
    };
};

export default Notifications;