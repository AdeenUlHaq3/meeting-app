import React from 'react';
import NotificationsList from './components/lists/Notifications';
import RequestDialog from './components/dialogs/Request';

class Notifications extends React.Component {
    state = {
        isDialog: false
    };

    showDialog = (notification) => {
        this.setState({
            isDialog: true,
            notification
        });
    };

    closeDialog = () => {
        this.setState({
            isDialog: false
        });
    };

    render() {
        const {
            isDialog,
            notification
        } = this.state;

        const {
            notifications
        } = this.props.Notifications;

        return (
            <div>
                {
                    notifications.map(notification => 
                        <NotificationsList
                            notification={notification}
                            showDialog={this.showDialog}
                        />
                    )
                }
                {
                    isDialog && 
                    <RequestDialog 
                        open={isDialog}
                        close={this.closeDialog}
                        request={notification}
                    />
                }
            </div>
        );
    };
};

export default Notifications;