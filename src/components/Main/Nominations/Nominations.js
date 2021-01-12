import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DiscFullIcon from '@material-ui/icons/DiscFull';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        backgroundColor: "#333533"
    },
    text : {
        color: "#F5CB5C",
    },
    poster: {
        width: theme.spacing(12),
        height: theme.spacing(18),
        marginRight: theme.spacing(2),
    }
}));

function Nominations(props) {
    const classes = useStyles();
    const [nominationList, setNominationList] = useState([]);
    
    useEffect(() => {
        // Convert the nominations object to a list
        setNominationList(Object.entries(props.nominations))
    }, [props])

    return (
        <div>
            <Typography color="primary" variant="h4">NOMINATIONS {props.isComplete && <IconButton onClick={props.handleSnackBarOpen}><DiscFullIcon color="secondary"/></IconButton>}</Typography>
                <div className={classes.root}>
                    <List>
                        {nominationList.map(([key, value]) => (
                            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                                <ListItem>
                                    <img className={classes.poster} src={value.Poster}/>
                                    <ListItemText className={classes.text} id={"someid"} primary={`${value.Title} (${value.Year})`}/>
                                    <IconButton onClick={() => props.handleRemoveNomination(key)}>
                                        <RemoveCircleIcon style={{color:'#800E13'}}/>
                                    </IconButton>
                                </ListItem>
                            </Slide>
                        ))}
                    </List>
                </div>
            </div>
    );
}

export default Nominations;