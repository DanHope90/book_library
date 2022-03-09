/* eslint-disable indent */
const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');
const genre = require('../src/models/genre');
const author = require('../src/models/author');

describe('/genres', () => {
    before(async () => Genre.sequelize.sync());

    beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST / genres', () => {
        it('creates a new genre in the database', async () => {
            const response = await request(app).post('/genres').send({
                genre: 'Science Fiction',
            });
            const newGenreRecord = await Genre.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(201);
            expect(response.body.genre).to.equal('Science Fiction');
            expect(newGenreRecord.genre).to.equal('Science Fiction');
        });

        it('sends error if there is no genre', async () => {
            const response = await request(app).post('/genres').send({
                genre: '',
            });
            const newGenreRecord = await Genre.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(500);
            expect(newGenreRecord).to.equal(null);
        });
        it('sends error if Genre is null', async () => {
            const response = await request(app).post('/genres').send({
                author: null,
            });
            const newGenreRecord = await Genre.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(500);
            expect(newGenreRecord).to.equal(null);
        });
      });
  });

  describe('with records in the database', () => {
    let genres;

    beforeEach(async () => {
      await Genre.destroy({ where: {} });

      genres = await Promise.all([
        Genre.create({
          genre: 'Science Fiction',
        }),
        Genre.create({
            genre: 'Fantasy',
        })
      ])
    });

    describe('GET /genres', () => {
        it('gets all genre records', async () => {
            const response = await request(app).get('/genres');

            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(2);

            response.body.forEach((genre) => {
                const expected = genres.find((a) => a.id === genre.id);

                expect(genre.genre).to.equal(expected.genre);
            });
        });

    describe('GET /genres/:id', () => {
        it('gets genre record by id', async () => {
            const genre = genres[0];
            const response = await request(app).get(`/genres/${genre.id}`);
      
            expect(response.status).to.equal(200);
            expect(response.body.genre).to.equal(genre.genre);
            });
      
        it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app).get('/genres/12345');
      
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
            });
          });

    describe('PATCH /genres/:id', () => {
        it('updates genres by id', async () => {
            const genre = genres[0];
            const response = await request(app)
              .patch(`/genres/${genre.id}`)
              .send({ genre: 'Horror' });
            const updatedGenreRecord = await Genre.findByPk(genre.id, {
              raw: true,
              });
    
            expect(response.status).to.equal(200);
            expect(updatedGenreRecord.genre).to.equal('Horror');
            });
      
        it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app)
              .patch('/genres/12345')
              .send({ genre: 'random genre' });
      
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
            });
          });

    describe('DELETE /genres/:id', () => {
        it('deletes genre record by id', async () => {
            const genre = genres[0];
            const preGenreCheck = await Genre.findByPk(genre.id, { raw: true });
            const response = await request(app).delete(`/genres/${genre.id}`);
            const deletedGenre = await Genre.findByPk(genre.id, { raw: true });
      
            expect(response.status).to.equal(204);
            expect(deletedGenre).to.equal(null);
            expect(!!preGenreCheck).to.equal(true);
            });
      
        it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app).delete('/genres/12345');
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
            });
        });
    });
  });
});
