/* eslint-disable no-undef */
/* eslint-disable eol-last */
const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models');
const app = require('../src/app');

describe('/readers', () => {
  before(async () => Reader.sequelize.sync());

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /readers', () => {
      it('creates a new reader in the database', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'darcy12345',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Elizabeth Bennet');
        expect(response.body.password).to.equal('darcy12345');
        expect(newReaderRecord.name).to.equal('Elizabeth Bennet');
        expect(newReaderRecord.email).to.equal('future_ms_darcy@gmail.com');
      });

      it('sends error if there is no name', async () => {
        const response = await request(app).post('/readers').send({
          name: '',
          email: 'future_ms_darcy@gmail.com',
          password: 'darcy12345',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(newReaderRecord).to.equal(null);
      });

      it('sends error if name is null', async () => {
        const response = await request(app).post('/readers').send({
          name: null,
          email: 'datboi@gmail.com',
          password: '12345678',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(newReaderRecord).to.equal(null);
      });
      it('sends error if email is empty', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Dat Boi',
          email: '',
          password: '12345678',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(response.body.email).to.equal();
        expect(newReaderRecord).to.equal(null);
      });
      it('sends error if email is null', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Dat Boi',
          email: null,
          password: '12345678',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(response.body.email).to.equal(undefined);
        expect(newReaderRecord).to.equal(null);
      });
      it('sends error if email not a valid email', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Dat Boi',
          email: 'datboigmail.com',
          password: '12345678',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(response.body.email).to.equal(undefined);
        expect(newReaderRecord).to.equal(null);
      });
      it('sends error if password is empty', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Dat Boi',
          email: 'datboi@gmail.com',
          password: '',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(response.body.password).to.equal();
        expect(newReaderRecord).to.equal(null);
      });
      it('sends error if password is null', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Dat Boi',
          email: 'datboi@gmail.com',
          password: null,
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(response.body.password).to.equal(undefined);
        expect(newReaderRecord).to.equal(null);
      });
      it('error if password length is less that 8', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Dat Boi',
          email: 'datboi@gmail.com',
          password: '123456',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(500);
        expect(response.body.password).to.equal(undefined);
        expect(newReaderRecord).to.equal(null);
      });
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'darcy12345',
        }),
        Reader.create({
          name: 'Arya Stark',
          email: 'vmorgul@me.com',
          password: '12345678',
        }),
        Reader.create({
          name: 'Lyra Belacqua',
          email: 'darknorth123@msn.org',
          password: '12345678',
        }),
      ]);
    });

    describe('GET /readers', () => {
      it('gets all readers records', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
        });
      });
    });

    describe('GET /readers/:id', () => {
      it('gets readers record by id', async () => {
        const reader = readers[0];
        const response = await request(app).get(`/readers/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/readers/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('PATCH /readers/:id', () => {
      it('updates readers email by id', async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: 'miss_e_bennet@gmail.com' });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal('miss_e_bennet@gmail.com');
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/readers/12345')
          .send({ email: 'some_new_email@gmail.com' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('DELETE /readers/:id', () => {
      it('deletes reader record by id', async () => {
        const reader = readers[0];
        const preReaderCheck = await Reader.findByPk(reader.id, { raw: true });
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
        expect(!!preReaderCheck).to.equal(true);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/readers/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });
  });
});