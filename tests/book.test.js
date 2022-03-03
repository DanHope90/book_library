/* eslint-disable indent */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/readers', () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

describe('with books in the database', () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: 'IT',
          auther: 'Stephen King',
          genre: 'Horror',
          ISBN: '12345',
        }),
      ]);
    });

    describe('GET /book/:id', () => {
      it('gets book title by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/book/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.auther).to.equal(book.auther);
      });

      it('returns a 404 if the book title does not exist', async () => {
        const response = await request(app).get('/book/notabook');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });

      it('sends error if title is empty', async () => {
        const response = await request(app).post('/readers').send({
          title: '',
          auther: 'Stephen Kings',
          genre: 'Horror',
          ISBN: '12345',
        });

        const newBookrRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(500);
        expect(response.body.id).to.equal(undefined);
        expect(newBookrRecord).to.equal(null);
      });

      it('sends error of auther is is empty', async () => {
        const response = await request(app).post('/readers').send({
          title: 'IT',
          auther: '',
          genre: 'Horror',
          ISBN: '12345',
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(500);
        expect(response.body.id).to.equal(undefined);
        expect(newBookRecord).to.equal(null);
      });
    });
  });
});
