import React from 'react';
import firebase from '../../config/firebase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//Styles
const styles = theme => ({
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        textAlign: 'center',
    },
    imagePlaceholder: {
        margin: theme.spacing.unit*2
    }
})

class ChooseImages extends React.Component {
    constructor() {
        super();

        this.state = {
            image1URL: '',
            image2URL: '',
            image3URL: ''
        };
    };

    componentDidUpdate() {
        const {
            image1URL,
            image2URL,
            image3URL
        } = this.state;
        
        const {
            nickName,
            phoneNo
        } = this.props.location.state;

        if(image1URL && image2URL && image3URL)
            this.props.history.push('/profile/beveragesAndMeetingDuration', {
                nickName,
                phoneNo,
                image1URL,
                image2URL,
                image3URL
            });
    };

    handleFile = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            imageOne,
            imageTwo,
            imageThree
        } = this.state;

        var storage = firebase.storage();
        const files = [imageOne, imageTwo, imageThree];
        
        files.map((file, index) => {
            return storage.ref(`images/${file.name}`).put(file)
        .then(snapshot => {
            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        })
        .then(downloadURL => {
            this.setState({
                [`image${index+1}URL`]: downloadURL
            })   
        })
        })
    };

    render() {
        const {
            classes
        } = this.props;
        
        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container>
                    <Grid item lg={12}>
                        <input type='file' className={classes.imagePlaceholder} name='imageOne' required onChange={this.handleFile} />
                    </Grid>
                    <Grid item lg={12}>
                        <input type='file' className={classes.imagePlaceholder} name='imageTwo' required onChange={this.handleFile} />
                    </Grid>
                    <Grid item lg={12}>
                        <input type='file' className={classes.imagePlaceholder} name='imageThree' required onChange={this.handleFile} />
                    </Grid>
                    <Grid item lg={12}>
                        <Button type='submit'>Next</Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
};

export default withStyles(styles)(ChooseImages);