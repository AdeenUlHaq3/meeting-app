import React from 'react';
import firebase from '../../config/firebase';

class ChooseImages extends React.Component {
    constructor() {
        super();

        this.state = {

        };
    };

    handleFile = (e) => {
        const file = e.target.files[0];
        var storage = firebase.storage();
        storage.ref(`images/${file.name}`).put(file)
        .then(snapshot => {
            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        })
        .then(downloadURL => console.log(`Successfully uploaded file and got download link - ${downloadURL}`))
        
    }

    render() {
        const {
            nickName,
            phoneNo
        } = this.props.location.state;
        
        return (

            <form>
                <input type='file' required onChange={ this.handleFile } />
                <input type='file' required />
                <input type='file' required />
            </form>
        );
    };
};

export default ChooseImages;