import React, {useState, useCallback, useEffect} from 'react';
import MovieCard from './MovieCard';
import {debounce} from "lodash";

import LinearProgress from '@material-ui/core/LinearProgress';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { searchOMDBMovieByTitle } from '../../../js/omdb_api';
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
    const [resultList, setResultList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    } 

    const debounceHandler = useCallback(debounce((query) => {
        handleSearch(query)
    }, 1000), []);

    async function handleSearch(query) {
        setLoading(true);
        const response = await searchOMDBMovieByTitle(query);
        setLoading(false);
        if (response && response.Search){
            const results = response.Search.map((movie) => {
                const poster = (movie.Poster !== "N/A") ? movie.Poster : PosterPlaceholder;
                return {
                    img: poster,
                    title: movie.Title,
                    year: movie.Year,
                    imdbID: movie.imdbID,
                }
            })
            setResultList(results);
        } else {
            setResultList([]);
        }
    }

    useEffect(() => {
        setLoading(true);
        debounceHandler(searchTerm);
    }, [searchTerm, debounceHandler])

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
                {loading ? <Box paddingBottom={10}><LinearProgress color="secondary"/></Box>:
                <Grid container alignItems="stretch" spacing={3}>
                    { (searchTerm !== '') &&
                    <Grid item xs={12}>
                        <Typography color="primary" variant="subtitle1">Search Results for '{searchTerm}'</Typography>
                    </Grid>
                    }
                    {resultList.map((res) => (
                        <MovieCard isComplete={props.isComplete} movie={res} nominations={props.nominations} handleAddNomination={props.handleAddNomination} handleRemoveNomination={props.handleRemoveNomination}/>
                    ))}
                    { (searchTerm !== '') &&
                    <Grid item xs={12}>
                        <Typography color="primary" variant="caption">Not finding what you're looking for? Try refining your search query.</Typography>
                    </Grid>
                    }
                </Grid>
                }
            </div>
    );
}

export default Search;