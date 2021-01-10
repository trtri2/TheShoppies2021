import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Grow from '@material-ui/core/Grow';
import { getOMDBMovieByID } from '../../../js/omdb_api';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#333533",
    },
    media:{
        width: "100%",
        height: "25vh",
    },
    detailedMedia:{
        width: "100%",
        height: "100%",
    },
    content:{
        color:theme.palette.primary.main
    },
    dialog:{
        backgroundColor:"#CFDBD5"
    },
    dialogActions:{
        backgroundColor: "#CFDBD5",
    },
}));

function MovieCard(props) {
    const [paperElevation, setPaperElevation] = useState(1);
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const classes = useStyles()

    async function handleFetch(movieID) {
        const response = await getOMDBMovieByID(movieID);
        setMovieDetails(response);
        setLoading(false);
    }

    function handleOnMouseEnter(){
        setPaperElevation(20)
    }
    
    function handleOnMouseLeave(){
        setPaperElevation(1)
    }

    function handleOnClick(){
        setLoading(true);
        handleFetch(props.movie.imdbID);
        setDialogOpen(true);
    }

    function handleDialogAdd(){
        props.handleAddNomination(props.movie)
        setDialogOpen(false);
    }

    function handleDialogRemove(){
        props.handleRemoveNomination(props.movie.imdbID)
        setDialogOpen(false);
    }

    function handleDialogClose(){
        setDialogOpen(false);
    }

    function displayMovieDetails(){
        return (
            <Container>
                <List>
                    <ListItemText primary={movieDetails.Title} secondary="Title"/>
                    <ListItemText primary={movieDetails.Released} secondary="Release Date"/>
                    <ListItemText primary={movieDetails.Director} secondary="Director"/>
                    <ListItemText primary={movieDetails.Genre} secondary="Genre(s)"/>
                    <ListItemText primary={movieDetails.Awards} secondary="Awards"/>
                    <ListItemText primary={movieDetails.imdbRating} secondary="Rating (IMDB)"/>
                </List>
                <Typography variant="h5">{movieDetails.Plot}</Typography>
            </Container>
        )
    }
    
    return (
                <Grid item xs={6} sm={4} md={4} lg={2}>
                    <Grow in={true}>
                        <Paper elevation={paperElevation} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className={classes.root}>
                            <Tooltip title="Click to view more" placement="top">
                                <img onClick={handleOnClick} className={classes.media} src={props.movie.img} alt={props.movie.title}/>
                            </Tooltip>
                            <List dense disablePadding>
                                <ListItem className={classes.content}>
                                    <Typography noWrap>{props.movie.title}</Typography>
                                </ListItem>
                                <ListItem className={classes.content}>
                                    <Typography variant="caption" >({props.movie.year})</Typography>
                                </ListItem>
                            </List>
                            {props.movie.imdbID in props.nominations ? 
                                <Button fullWidth disabled>
                                    Nominated
                                </Button>
                                :
                                <Button fullWidth disabled={props.isComplete} color="secondary" onClick={() => props.handleAddNomination(props.movie)}>
                                    Nominate
                                </Button>
                                }
                        </Paper>
                    </Grow>
                    { movieDetails &&
                        <Dialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            maxWidth='md'
                            fullWidth
                        >
                            <DialogTitle className={classes.dialog}>{props.movie.title} ({props.movie.year})</DialogTitle>
                            <DialogContent className={classes.dialog}>
                                {loading && <CircularProgress/>}
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <img className={classes.detailedMedia} src={props.movie.img} alt={props.movie.title}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        {displayMovieDetails()}
                                    </Grid>

                                </Grid>
                            </DialogContent>
                            <DialogActions className={classes.dialogActions}>
                                <Button onClick={handleDialogClose}>CLOSE</Button>
                                {props.movie.imdbID in props.nominations ? 
                                <Button style={{color:'red'}}onClick={handleDialogRemove}>
                                    REMOVE NOMINATION
                                </Button>
                                :
                                <Button variant="contained" color="secondary" onClick={handleDialogAdd}>
                                    NOMINATE
                                </Button>
                                }
                            </DialogActions>
                        </Dialog>
                    }
                </Grid>
    );
}

export default MovieCard;