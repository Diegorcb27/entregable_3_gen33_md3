const { getAll, create, getOne, remove, update, SetMoviesActors, SetMoviesGenres, SetMoviesDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/movies/:id/actors')
    .post(SetMoviesActors)

movieRouter.route('/movies/:id/genres')
    .post(SetMoviesGenres)

movieRouter.route('/movies/:id/directors')
    .post(SetMoviesDirectors)


module.exports = movieRouter;