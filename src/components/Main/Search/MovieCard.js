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

import { useLazyQuery } from '@apollo/client';
import { GET_MOVIE_BY_ID } from '../../../js/query';

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [getMovie, {loading, data}] = useLazyQuery(GET_MOVIE_BY_ID);

    const classes = useStyles()

    function handleOnMouseEnter(){
        setPaperElevation(20)
    }
    
    function handleOnMouseLeave(){
        setPaperElevation(1)
    }

    function handleOnClick(){
        const id = props.movie.imdbID
        getMovie({ variables: { id } });
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
                    <ListItemText primary={data.movie.Title} secondary="Title"/>
                    <ListItemText primary={data.movie.Released} secondary="Release Date"/>
                    <ListItemText primary={data.movie.Director} secondary="Director"/>
                    <ListItemText primary={data.movie.Genre} secondary="Genre(s)"/>
                    <ListItemText primary={data.movie.Awards} secondary="Awards"/>
                    <ListItemText primary={data.movie.imdbRating} secondary="Rating (IMDB)"/>
                </List>
                <Typography variant="h5">{data.movie.Plot}</Typography>
            </Container>
        )
    }
    
    return (
                <Grid item xs={6} sm={4} md={4} lg={2}>
                    <Grow in={true}>
                        <Paper elevation={paperElevation} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className={classes.root}>
                            <Tooltip title="Click to view more" placement="top">
                                <img onClick={handleOnClick} className={classes.media} src={props.movie.Poster} alt={props.movie.Title}/>
                            </Tooltip>
                            <List dense disablePadding>
                                <ListItem className={classes.content}>
                                    <Typography noWrap>{props.movie.Title}</Typography>
                                </ListItem>
                                <ListItem className={classes.content}>
                                    <Typography variant="caption" >({props.movie.Year})</Typography>
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
                    { data && data.movie &&
                        <Dialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            maxWidth='md'
                            fullWidth
                        >
                            <DialogTitle className={classes.dialog}>Movie Details - {props.movie.Title} ({props.movie.Year})</DialogTitle>
                            <DialogContent className={classes.dialog}>
                                {loading && <CircularProgress/>}
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <img className={classes.detailedMedia} src={props.movie.Poster} alt={props.movie.Title}/>
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