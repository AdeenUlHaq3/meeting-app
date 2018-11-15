import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
        borderRadius: '0',
        border: '1px solid #ccc',
        margin: '5px 5px 0px 0px',
        maxWidth: 200
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
        height: 140
    },
};

const ImageCard = (props) => {
    const {
        url,
        title,
        classes,
        handleChange
    } = props;
    
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={url}
                    title={title}
                />
                <CardActions>
                    <input type='file' onChange={handleChange} />
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default withStyles(styles)(ImageCard);