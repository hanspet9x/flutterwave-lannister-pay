const mongoose = require('mongoose');
const {AppConfigs} = require('../configs/app');

beforeAll(async () => {
    try {
        await mongoose.connect(AppConfigs.DATABASE_URL_TEST);
    } catch (error) {
        console.error(error.message);
    }
})

afterAll(async () => {
    try {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    } catch (error) {
        console.error(error.message);
    }
})
