import React, {useState, useEffect} from 'react';

import Search from './Search/Search'
import Nominations from './Nominations/Nominations'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';

import { withApollo } from '@apollo/client/react/hoc';
import { GET_MOVIE_BY_ID } from '../../js/query';

import {CopyToClipboard} from 'react-copy-to-clipboard';

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


function Main({ client }) {
    const [nominations, setNominations] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const classes = useStyles()

    // Function to parse URL parameters and return as an object
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
         * Takes in an object with each movie ID parsed by getHashParams()
         * Uses client.query to return promises so we can use Promise.all() for each query
         */
        let queries = [];
        let newNominations = {}
        for (const key_movieID in params){
            if (key_movieID != 'share'){
                queries.push(
                    client.query({
                        query: GET_MOVIE_BY_ID,
                        variables: { id:key_movieID }
                    })
                    .then(result => {
                        newNominations[result.data.movie.imdbID] = result.data.movie;
                    })
                    .catch(err => console.log(err))
                )
            }
        }
        Promise.all(queries)
            .then(response => (setNominations(newNominations)))
            .catch(err => console.log(err));
    }
    
    function handleAddNomination(movie){
        const numNominations = Object.keys(nominations).length;
        if (numNominations < 5){
            const newNominations = {
                ...nominations,
                [movie.imdbID]: movie
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
        let shareURL = process.env.REACT_APP_BASE_URL +'/#share=true';
        for (var key in nominations){
            shareURL = shareURL + '&' + encodeURIComponent(key);
        }
        return shareURL;
    }
    
    // Upon mount, check if we came from a share link URL
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

export default withApollo(Main);
