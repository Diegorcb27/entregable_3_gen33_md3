//RELACIONES ENTRE TABLAS

const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//RELACIONES MUCHOS A MUCHOS (MOVIES-ACTORS)

Movie.belongsToMany(Actor, {through: "movie_actor"})
Actor.belongsToMany(Movie, {through: "movie_actor"})

//RELACIONES MUCHOS A MUCHOS (MOVIES-GENRES)

Movie.belongsToMany(Genre, {through: "movie_genre"})
Genre.belongsToMany(Movie, {through: "movie_genre"})


//RELACIONES MUCHOS A MUCHOS (MOVIES-DIRECTORS)

Movie.belongsToMany(Director, {through: "movie_director"})
Director.belongsToMany(Movie, {through: "movie_director"})

