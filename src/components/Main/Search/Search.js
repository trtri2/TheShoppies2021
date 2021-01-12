import React, {useState, useCallback} from 'react';
import MovieCard from './MovieCard';

import LinearProgress from '@material-ui/core/LinearProgress';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import { useLazyQuery } from '@apollo/client';
import { SEARCH_MOVIE } from '../../../js/query';
import {debounce} from "lodash";
import PosterPlaceholder from '../../../img/poster_placeholder.png'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        '&$focused $outline': {
            borderWidth: theme.spacing(0.5),
            borderColor: theme.palette.secondary.main,
        },
    },
    focused:{},
    outline: {},
}));

function Search(props) {
    const [searchTerm, setSearchTerm] = useState(undefined)
    const [getSearchResults, {loading, data}] = useLazyQuery(SEARCH_MOVIE);

    const handleChange = (event) => {
        if (event.target.value) {
            debounceHandler(event.target.value)
        }
    } 

    // A debounce function is used so we only query requests once the user is finished typing (1 second)
    const debounceHandler = useCallback(debounce((term) => {
       setSearchTerm(term)
       getSearchResults({ variables: { term } });
    }, 1000), []);

    const classes = useStyles()
    return (
            <div>
                <Box paddingBottom={5}>
                    <Typography color="primary" variant="h4">WHO ARE YOUR SHOPPINEES?</Typography>
                    <TextField
                        autoFocus
                        id="input-textfield-search"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="large"
                        placeholder="Search a movie by its title"
                        InputProps={{
                        classes: {
                            root: classes.root,
                            focused: classes.focused,
                            notchedOutline: classes.outline
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                    />
                </Box>
                {loading ? 
                <Box paddingBottom={10}><LinearProgress color="secondary"/></Box> 
                :
                <Grid container alignItems="stretch" spacing={3}>
                    {searchTerm !== undefined && <Grid item xs={12}>
                        <Typography color="primary" variant="subtitle1">Search Results for '{searchTerm}'</Typography>
                    </Grid>}
                    {data && data.searchResults && data.searchResults.Search && data.searchResults.Search.map((res) => 
                        {
                            if (res.Poster === 'N/A' || res.Poster === undefined){
                                res.Poster = PosterPlaceholder
                            }
                            return <MovieCard isComplete={props.isComplete} movie={res} nominations={props.nominations} handleAddNomination={props.handleAddNomination} handleRemoveNomination={props.handleRemoveNomination}/>
                        }
                    )}
                    {searchTerm !== undefined && 
                    <Grid item xs={12}>
                        <Typography color="primary" variant="caption">Not finding what you're looking for? Try refining your search query.</Typography>
                    </Grid>}
                </Grid>
                }
            </div>
    );
}

export default Search;