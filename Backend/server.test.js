const request = require('supertest');
const app = require('./server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Myfav = mongoose.model('Myfav');

jest.mock('mongoose', () => {
    const originalMongoose = jest.requireActual('mongoose');
    const save = jest.fn();
    const findOne = jest.fn();

    const MockModel = jest.fn().mockImplementation(() => {
        return { save };
    });

    MockModel.findOne = findOne;

    return {
        ...originalMongoose,
        connect: jest.fn(),
        model: jest.fn().mockReturnValue(MockModel),
        Schema: originalMongoose.Schema,
    };
});


describe('POST /favorites', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should allow two different users to favorite the same place', async () => {
        const tokenUser1 = jwt.sign({ id: 'user1' }, 'PES2UG23CS363');
        const tokenUser2 = jwt.sign({ id: 'user2' }, 'PES2UG23CS363');
        const favoritePlace = {
            placeName: 'Eiffel Tower',
            genuse: 'Landmark',
            image1: 'url',
            countryName: 'France',
            stateName: 'Paris',
        };

        const MyfavModel = mongoose.model();
        MyfavModel.findOne.mockResolvedValueOnce(null);
        const myfavInstance = new MyfavModel();
        myfavInstance.save.mockResolvedValueOnce(true);


        await request(app)
            .post('/favorites')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send(favoritePlace);

        MyfavModel.findOne.mockResolvedValueOnce(null);

        const response = await request(app)
            .post('/favorites')
            .set('Authorization', `Bearer ${tokenUser2}`)
            .send(favoritePlace);

        expect(response.status).toBe(201);
    });
});
