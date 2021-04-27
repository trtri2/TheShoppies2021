# THE SHOPPIES 2021 AWARDS

My challenge submission for Shopify's UX & Web Developer Intern position for 2021. A webpage where you can search OMDB for movie titles, nominate and share your Shoppinees for the Shoppies Awards!

[Portfolio Website](https://trtri2.github.io/) | [LinkedIn Profile](https://www.linkedin.com/in/trtri2/)

# Demo: 
### You can visit the live demo app here: [The Shoppies Demo](http://vote-shoppies-2021.herokuapp.com/)
<br/>

## TECHSTACK
### Front End
* Javascript
* ReactJS
* Material-UI

### Back End
* NodeJS
* Express
* ApolloClient
* GraphQL

## REQUIREMENTS
1. Users are able to find related movies by using a search term by title, using the [OMDB Database](http://www.omdbapi.com/)
2. Search results are displayed to the user, listing the movie title, year of release, poster image if available, and the ability to select the movie for a nomination.
3. As the user is updating the search terms, the search results are updated to match.
4. The user can remove movies from their nominations list.
5. If the user nominates a movie, the movie will not be able to be nominated again.
6. When the user has successfully nominated five movies, the user will be prompted of their completion.


 
## DESIGN CONSIDERATIONS

### APOLLO & GRAPHQL
I used Apollo Client & GraphQL as my query language framework for fetching data from the API. Despite it not being necessary for the solution (I initially just used React Fetch), I took this as an opportunity to learn some exciting, modern technologies and expand my skills, since Shopify also uses Apollo & GraphQL within their development stacks.

I found it to be incredibly valuable and cool to use because of the following:
- Built in query caching & request cycle management
- Scalable, clean query language schema syntax
- Versatile, even though for this project there was no control of the backend (OMDB API), I was still able to use the Apollo Client to fetch data from the REST Data Source and mangle the data to fit my requirements.
- Everything came out of the box!

Overall, this alone allowed for a great learning experience, and will definitely be using it again in future projects.

### MATERIAL-UI 
For the UX and styling, I used Google's [Material Design](https://material.io/design) as a guideline, to create a simple, responsive, user centered design. The Material-UI Library for React was great and easy to use, allowing for high customizability at the same time.




