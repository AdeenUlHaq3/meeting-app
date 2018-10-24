import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles = {
    list: {
        width: 250,
    },
    button: {
        background: 'transparent',
        boxShadow: 'none',
        color: '#FF8E53',
        width: '100%'
    }
};

class TemporaryDrawer extends React.Component {
    state = {
        drawer: false,
    };

    toggleDrawer = () => {
        const {
            drawer
        } = this.state;

        this.setState({
            drawer: !drawer
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <Button className={classes.button}>Adeen</Button>
                {/* <List>{mailFolderListItems}</List> */}
                <Divider />
                <Button className={classes.button}>Najam</Button>
                {/* <List>{otherMailFolderListItems}</List> */}
            </div>
        );

        return (
            <Drawer open={this.state.drawer} onClose={this.toggleDrawer}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer}
                    onKeyDown={this.toggleDrawer}
                >
                    {sideList}
                </div>
            </Drawer>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);