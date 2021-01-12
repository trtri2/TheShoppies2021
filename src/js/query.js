import { gql } from '@apollo/client';

export const SEARCH_MOVIE = gql`
    query($term: String!) {
        searchResults(term: $term)
            @rest(type: "SearchResults", path: "&s={args.term}") {
                Search @type(name: "Movie") {
                    imdbID
                    Title
                    Year
                    Poster
                }
            }
    }
`;

export const GET_MOVIE_BY_ID = gql`
    query($id: String!) {
        movie(id: $id)
            @rest(type:"Movie", path: "&i={args.id}"){
                imdbID
                Title
                Year
                Poster
                Released
                Director
                Genre
                Awards
                imdbRating
                Plot
            }
    }
`;

