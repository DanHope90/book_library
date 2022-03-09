/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable indent */
const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');
const author = require('../src/models/author');

describe('/authors', () => {
    before(async () => Author.sequelize.sync());

    beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST / authors', () => {
        it('creates a new author in the database', async () => {
            const response = await request(app).post('/authors').send({
                author: 'Frank Herbert',
            });
            const newAuthorRecord = await Author.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(201);
            expect(response.body.author).to.equal('Frank Herbert');
            expect(newAuthorRecord.author).to.equal('Frank Herbert');
        });

        it('sends error if there is no author', async () => {
            const response = await request(app).post('/authors').send({
                author: '',
            });
            const newAuthorRecord = await Author.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(500);
            expect(newAuthorRecord).to.equal(null);
        });
        it('sends error if author is null', async () => {
            const response = await request(app).post('/authors').send({
                author: null,
            });
            const newAuthorRecord = await Author.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(500);
            expect(newAuthorRecord).to.equal(null);
        });
      });
  });

  describe('with records in the database', () => {
    let authors;

    beforeEach(async () => {
        await Author.destroy({ where: {} });

      authors = await Promise.all([
        Author.create({
          author: 'Frank Herbert',
        }),
        Author.create({
          author: 'J.R.R Tolkien',
        }),
      ]);
    });

    describe('GET /authors', () => {
        it('gets all author records', async () => {
            const response = await request(app).get('/authors');

            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(2);

            response.body.forEach((author) => {
                const expected = authors.find((a) => a.id === author.id);

                expect(author.author).to.equal(expected.author);
            });
        });
    });

    describe('GET /authors/:id', () => {
        it('gets author record by id', async () => {
          const author = authors[0];
          const response = await request(app).get(`/authors/${author.id}`);
  
          expect(response.status).to.equal(200);
          expect(response.body.author).to.equal(author.author);
        });
  
        it('returns a 404 if the author does not exist', async () => {
          const response = await request(app).get('/authors/12345');
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The author could not be found.');
        });
      });

      describe('PATCH /authors/:id', () => {
        it('updates authors by id', async () => {
          const author = authors[0];
          const response = await request(app)
            .patch(`/authors/${author.id}`)
            .send({ author: 'Roald Dalh' });
          const updatedAuthorRecord = await Author.findByPk(author.id, {
            raw: true,
          });

          expect(response.status).to.equal(200);
          expect(updatedAuthorRecord.author).to.equal('Roald Dalh');
        });
  
        it('returns a 404 if the author does not exist', async () => {
          const response = await request(app)
            .patch('/authors/12345')
            .send({ author: 'random author' });
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The author could not be found.');
        });
      });
      
      describe('DELETE /authors/:id', () => {
        it('deletes author record by id', async () => {
          const author = authors[0];
          const preAuthorCheck = await Author.findByPk(author.id, { raw: true });
          const response = await request(app).delete(`/authors/${author.id}`);
          const deletedAuthor = await Author.findByPk(author.id, { raw: true });
  
          expect(response.status).to.equal(204);
          expect(deletedAuthor).to.equal(null);
          expect(!!preAuthorCheck).to.equal(true);
        });
  
        it('returns a 404 if the author does not exist', async () => {
          const response = await request(app).delete('/authors/12345');
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The author could not be found.');
        });
      });
  });
});
