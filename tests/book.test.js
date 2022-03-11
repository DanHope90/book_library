/* eslint-disable indent */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no books in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/book').send({
          title: 'IT',
          author: 'Stephen King',
          ISBN: '12345',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('IT');
        expect(response.body.author).to.equal('Stephen King');
        expect(newBookRecord.title).to.equal('IT');
        expect(newBookRecord.author).to.equal('Stephen King');
        expect(newBookRecord.ISBN).to.equal('12345');
      });

      it('cannot create book if there is not author or title', async () => {
        const response = await request(app).post('/book').send({});
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
      });

      expect(response.status).to.equal(500);
      expect(response.body.id).to.equal(undefined);
      expect(newBookRecord).to.equal(null);
    });
  });
});

describe('with books in the database', () => {
  let books;

  beforeEach(async () => {
    await Book.destroy({ where: {} });

       books = await Promise.all([
        Book.create({
          title: 'IT',
          author: 'Stephen King',

        }),
        Book.create({
          title: 'The Hobbit',
          author: 'J.R.R Tolkien',
        }),
        Book.create({
          title: 'Lord of the Rings',
          author: 'J.R.R Tolkien',
        }),
      ]);
  });

  describe('GET /books', () => {
      it('gets all books records', async () => {
          const response = await request(app).get('/book');

          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(3);

          response.body.forEach((book) => {
              const expected = books.find((a) => a.id === book.id);

              expect(book.title).to.equal(expected.title);
              expect(book.author).to.equal(expected.author);
          });
      });
  });
  describe('GET /book/:id', () => {
    it('gets book title by id', async () => {
      const book = books[0];
      const response = await request(app).get(`/book/${book.id}`);
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal(book.title);
      expect(response.body.author).to.equal(book.author);
    });

    it('returns a 404 if the book title does not exist', async () => {
      const response = await request(app).get('/book/notabook');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The book could not be found.');
    });

    it('cannot find book if there is no author or title', async () => {
      const response = await request(app).post('/book').send({});
      const newBookRecord = await Book.findByPk(response.body.id, {
        raw: true,
    });

    expect(response.status).to.equal(500);
    expect(response.body.id).to.equal(undefined);
    expect(newBookRecord).to.equal(null);
      });
      });

  describe('PATCH /books/:id', () => {
    it('updates books title by id', async () => {
      const book = books[0];
      const response = await request(app)
        .patch(`/book/${book.id}`)
        .send({ title: 'Jurassic Park' });
      const updatedBookRecord = await Book.findByPk(book.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedBookRecord.title).to.equal('Jurassic Park');
    });

    it('returns a 404 if the book does not exist', async () => {
      const response = await request(app)
        .patch('/book/12345')
        .send({ title: 'Jurassic Park' });
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The book could not be found.');
    });
  });

  describe('DELETE / readers/:id', () => {
    it('deletes book record by id', async () => {
      const book = books[0];
      const preBookCheck = await Book.findByPk(book.id, { raw: true });
      const response = await request(app).delete(`/book/${book.id}`);
      const deletedBook = await Book.findByPk(book.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedBook).to.equal(null);
      expect(!!preBookCheck).to.equal(true);
    });
    it('returns a 404 if the book does not exist', async () => {
      const response = await request(app).delete('/book/12345');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The book could not be found.');
    });
  });
  });
  });
