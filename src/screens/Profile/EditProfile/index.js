import React from 'react';

//Import Material UI Components
import Button from '@material-ui/core/Button';
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
import GoogleMap from '../components/maps/GoogleMap';

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
    updateButton: {
        width: '100%',
        marginTop: '20px'
    },
    marginBottom: {
        marginBottom: '20px'
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
        },
        coords: null,
        images: []
    };

    componentDidMount = () => {
        this.getUserDetails();
    }

    getUserDetails = () => {
        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
            .once('value', snapshot => {
                const user = snapshot.val();
                const nickName = user.nickName;
                const phoneNo = user.phoneNo;
                const images = user.images;
                const drinks = user.drinks;
                const durations = user.duration;
                const latitude = user.latitude;
                const longitude = user.longitude;

                this.setState({
                    nickName,
                    phoneNo,
                    coords: {
                        latitude,
                        longitude
                    },
                    images
                });

                drinks.map(drink => {
                    const { drinks } = this.state;
                    drinks[drink][0] = true;
                    drinks[drink][1] = drink;

                    return this.setState({ drinks })
                });

                durations.map(duration => {
                    const { durations } = this.state;
                    const durationInWords = duration === 20 ? 'twentyMin' : duration === 60 ? 'sixtyMin' : 'oneTwentyMin';

                    durations[durationInWords][0] = true;
                    durations[durationInWords][1] = duration;

                    return this.setState({ durations })
                });
            });
    }

    updateCoords = ({ latitude, longitude }) => {
        this.setState({ coords: { latitude, longitude } })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleCheckBoxChange = (e, type) => {
        const {
            drinks,
            durations
        } = this.state;

        if (type === 'drink')
            drinks[e.target.name] = [e.target.checked, parseInt(e.target.value), type];
        else
            durations[e.target.name] = [e.target.checked, parseInt(e.target.value), type];
        
        this.setState({
            drinks,
            durations
        });
    };

    handleSubmit = () => {
        const {
            nickName,
            phoneNo,
            coords,
            images,
            drinks,
            durations
        } = this.state;

        const Fdrinks = [], Fdurations = [];
        var storage = firebase.storage();

        for (let drink in drinks)
            if (drinks[drink][0])
                Fdrinks.push(drinks[drink][1]);

        for (let duration in durations)
            if (durations[duration][0])
                Fdurations.push(durations[duration][1]);

        images.map((image, index) => {
            if (image.indexOf('http') === 0) {
                if(index === 2)
                    this.updateUser(nickName, phoneNo, Fdrinks, Fdurations, images, coords.latitude, coords.longitude);
                return 0;
            }
            else
                return storage.ref(`images/${new Date().getTime()}`).putString(image, 'data_url')
                    .then(snapshot => {
                        return snapshot.ref.getDownloadURL();
                    })
                    .then(downloadURL => {
                        images[index] = downloadURL;
                        if (index === 2)
                            this.updateUser(nickName, phoneNo, Fdrinks, Fdurations, images, coords.latitude, coords.longitude);
                });
        });
    };

    updateUser = (nickName, phoneNo, drinks, duration, images, latitude, longitude) => {
        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
            .update({
                nickName,
                phoneNo,
                latitude,
                longitude,
                images,
                drinks,
                duration
            });
    };

    handleImageChange = (e, index) => {
        if (e.target.files && e.target.files[0]) {
            const { images } = this.state;
            const reader = new FileReader();
            reader.onload = (e) => {
                images[index] = e.target.result;
                this.setState({ images });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    render() {
        const {
            phoneNo,
            nickName,
            images,
            drinks,
            durations,
            coords
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
                            url={images[0]}
                            handleChange={(e) => this.handleImageChange(e, 0)}
                        />
                    </Grid>
                    <Grid>
                        <ImageCard
                            title='Image 2'
                            url={images[1]}
                            handleChange={(e) => this.handleImageChange(e, 1)}
                        />
                    </Grid>
                    <Grid>
                        <ImageCard
                            title='Image 3'
                            url={images[2]}
                            handleChange={(e) => this.handleImageChange(e, 2)}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.marginBottom}
                >
                    <Grid
                        item
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
                        item
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
                {
                    coords &&
                    <GoogleMap
                        coords={coords}
                        updateCoords={this.updateCoords}
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                }
                <Button
                    className={classes.updateButton}
                    type='submit'
                >
                    Update
                </Button>
            </ValidatorForm>
        );
    };
};

export default withStyles(styles)(EditProfile);