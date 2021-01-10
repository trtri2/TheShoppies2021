import React, {useState, useEffect} from 'react';

import Search from './Search/Search'
import Nominations from './Nominations/Nominations'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {makeStyles} from '@material-ui/core/styles';
import {getOMDBMovieByID} from '../../js/omdb_api';
import PosterPlaceholder from '../../img/poster_placeholder.png'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },    
    success:{
        background: "#02C39A",
    },
    error:{
        background: "#f44336",
    },
}));

function Main() {
    const [nominations, setNominations] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const classes = useStyles()

    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
      }
    
    function loadFromShareURL(params){
        /**
         * INPUT: An object of the URL parameters parsed by getHashParams()
         * Iterates the list of movie IDs and calls omdb_api.js to fetch the requests for each movie, and sets nominationLists
         */
        let promises = []
        let newNominations = {}
        for (var key in params){
            if (key != 'share'){
                promises.push(getOMDBMovieByID(key)
                    .then(
                        function(data){
                            if (data.Response === "True"){
                                const poster = (data.Poster !== "N/A") ? data.Poster : PosterPlaceholder;
                                newNominations[data.imdbID] = {
                                    img: poster,
                                    title: data.Title,
                                    year: data.Year,
                                    imdbID: data.imdbID,
                                }
                            } 
                        }
                    )
                    .catch(err => console.log(err))
                ) // end of push
            }
        }
        Promise.all(promises)
                .then(response => {
                    setNominations(newNominations);
                })
                .catch(err => console.log(err));
    }
    
    function handleAddNomination(movieObj){
        const numNominations = Object.keys(nominations).length;
        if (numNominations < 5){
            const newNominations = {
                ...nominations,
                [movieObj.imdbID]: {
                    img: movieObj.img,
                    title: movieObj.title,
                    year: movieObj.year,
                    imdbID: movieObj.imdbID
                },
            };
            setNominations(newNominations);
        } 
    }

    function handleRemoveNomination(movieID){
        if (movieID in nominations){
            let newNominations = {...nominations}
            delete newNominations[movieID]
            setNominations(newNominations);
        }
    }

    function handleSnackBarOpen(){
        setSnackBarOpen(true);
        setIsCopied(false);
    }

    function handleSnackBarClose(){
        setSnackBarOpen(false);
    }

    function handleCopy(){
        setIsCopied(true);
    }

    function getShareURL(){
        //REACT_APP_BASE_URL
        let shareURL = process.env.REACT_APP_BASE_URL +'/#share=true';
        for (var key in nominations){
            shareURL = shareURL + '&' + encodeURIComponent(key);
        }
        return shareURL;
    }

    useEffect(() => {
        const params = getHashParams();
        if (params.share){
            loadFromShareURL(params)
        }
    }, [])

    useEffect(() => {
        if (Object.keys(nominations).length === 5){
            setIsComplete(true);
            setSnackBarOpen(true);
            setIsCopied(false);
        } else {
            setSnackBarOpen(false);
            setIsComplete(false)
        }
    }, [nominations])

    return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item sm={12} md={3}>
                        <Nominations isComplete={isComplete} nominations={nominations} handleRemoveNomination={handleRemoveNomination} handleSnackBarOpen={handleSnackBarOpen}/>
                    </Grid>
                    <Grid item sm={0} md={1}/>
                    <Grid item sm={12} md={8}>
                        <Search isComplete={isComplete} nominations={nominations} handleAddNomination={handleAddNomination} handleRemoveNomination={handleRemoveNomination}/>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={snackBarOpen}
                >
                    <SnackbarContent 
                        className={classes.success}                    
                        action={
                            <React.Fragment>
                                <CopyToClipboard text={getShareURL()} onCopy={handleCopy}>
                                    <Button color="secondary">
                                        {isCopied ? <span>LINK COPIED TO CLIPBOARD</span> : <span>SHARE NOMINATIONS</span>}
                                    </Button>
                                </CopyToClipboard>
                                <IconButton
                                    color="inherit"
                                    onClick={handleSnackBarClose}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </React.Fragment>
                        } 
                        message={"The ballots are in! Thank you for participating in this year's Shoppies Awards!"}
                        />
                </Snackbar>
            </div>
    );
}

export default Main;
