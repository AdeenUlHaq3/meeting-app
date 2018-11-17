import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const styles = {
    textCenter: {
        textAlign: 'center'
    },
    border: {
        border: '1px solid #ccc'
    }
};

class MuiCard extends React.Component {

    render() {
        const {
            onClickCheck,
            onClickCross,
            recommendedUser,
        } = this.props.MuiCard;

        const {
            classes
        } = this.props;

        return (
            <Card>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    emulateTouch={true}
                    swipeable={true}
                    showArrows={false}
                    showThumbs={false}>
                    {
                        recommendedUser.images.map(path => <img src={path} height='100%' alt="userImg" />)
                    }
                </Carousel>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.border}
                >
                    <Grid item xs={2}>
                        <IconButton
                            aria-label="Add to favorites"
                            onClick={onClickCross}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <CardContent>
                            <Grid direction="row" justify="center" alignItems="center">
                                <Typography variant="caption" className={classes.textCenter}>
                                    <b>{recommendedUser.displayName}</b>
                                </Typography>
                            </Grid>
                            <Grid direction="row" justify="center" alignItems="center">
                                <Typography variant="caption" className={classes.textCenter}>{recommendedUser.nickName}</Typography>
                            </Grid>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            aria-label="Share"
                            onClick={onClickCheck}
                        >
                            <CheckIcon />
                        </IconButton>
                    </Grid>

                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(MuiCard);