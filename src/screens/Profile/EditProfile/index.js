import React from 'react';

//Import Material UI Components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//Import Firebase
import firebase from 'firebase';

//Import Components
import ImageCard from '../components/cards/Image';
import ValidatorForm from '../components/forms/ValidatorForm';
import NickNameAndPhoneTextFields from '../components/textfields/NickNameAndPhone';
import Beverages from '../components/checkboxes/Beverages';
import MeetingDuration from '../components/checkboxes/MeetingDuration';

const styles = theme => ({
    textField: {
        width: '100%',
    },
    heading: {
        textAlign: 'center',
        marginTop: '10px'
    },
    margin: {
        margin: theme.spacing.unit,
    },
    marginTop: {
        marginTop: '10px'
    },
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%'
    },
    button: {
        color: 'white',
        marginTop: 10,
        float: 'right'
    },
    image: {
        width: '100%'
    }
});

class EditProfile extends React.Component {
    state = {
        nickName: '',
        phoneNo: '',
        drinks: {
            coffee: [false, '', 'drink'],
            juice: [false, '', 'drink'],
            cocktail: [false, '', 'drink']
        },
        durations: {
            twentyMin: [false, '', 'duration'],
            sixtyMin: [false, '', 'duration'],
            oneTwentyMin: [false, '', 'duration']
        }
    };

    componentDidMount = () => {
        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
            .once('value', snapshot => {
                const user = snapshot.val();
                const images = user.images;
                const drinks = user.drinks;
                const durations = user.duration;

                drinks.map(drink => {
                    const { drinks } = this.state;
                    drinks[drink][0] = true;
                    drinks[drink][1] = drink;
                    this.setState({
                        drinks
                    })
                });

                durations.map(duration => {
                    const { durations } = this.state;
                    const d = duration === 20 ? 'twentyMin' : duration === 60 ? 'sixtyMin' : 'oneTwentyMin';

                    durations[d][0] = true;
                    durations[d][1] = d;
                    this.setState({
                        durations
                    })
                });

                images.map((userImage, index) =>
                    this.setState({
                        [`url${index + 1}`]: userImage
                    })
                );
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleCheckBoxChange = () => {

    };

    handleSubmit = () => {

    };

    render() {
        const {
            url1,
            url2,
            url3,
            phoneNo,
            nickName,
            drinks,
            durations
        } = this.state;

        const {
            classes
        } = this.props;

        const drinkError = Object.values(this.state.drinks).filter(v => v[2] === 'drink' && v[0]).length <= 0;
        const durationError = Object.values(this.state.durations).filter(v => v[2] === 'duration' && v[0]).length <= 0;

        return (
            <ValidatorForm
                classes={classes}
                handleSubmit={this.handleSubmit}
            >
                <Typography
                    className={classes.heading}
                    variant='display1'
                >
                    Edit Profile
                </Typography>
                <NickNameAndPhoneTextFields
                    classes={classes}
                    nickName={nickName}
                    phoneNo={phoneNo}
                    handleChange={this.handleChange}
                />
                <Grid container>
                    <Grid>
                        <ImageCard
                            title='Image 1'
                            url={url1}
                        />
                    </Grid>
                    <Grid>
                        <ImageCard
                            title='Image 2'
                            url={url2}
                        />
                    </Grid>
                    <Grid>
                        <ImageCard
                            title='Image 3'
                            url={url3}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid 
                        xs={6} 
                        className={classes.marginTop}
                    >
                        <Beverages        
                            juice={drinks.juice}
                            coffee={drinks.coffee}
                            classes={classes}
                            cocktail={drinks.cocktail}
                            drinkError={drinkError}
                            handleChange={this.handleCheckBoxChange}
                        />
                    </Grid>
                    <Grid 
                        xs={6}
                        className={classes.marginTop}
                    >
                        <MeetingDuration
                            classes={classes}
                            sixtyMin={durations.sixtyMin}
                            twentyMin={durations.twentyMin}
                            oneTwentyMin={durations.oneTwentyMin}
                            durationError={durationError}
                            handleChange={this.handleCheckBoxChange}
                        />
                    </Grid>
                </Grid>
            </ValidatorForm>
        );
    };
};

export default withStyles(styles)(EditProfile);