import mongoose from 'mongoose';
import config from 'config';

const databaseURL = `mongodb://${config.get('databaseName')}:${config.get(
    'databasePassword'
    )}@localhost:8000/jwtAuth?authSource=admin`;

const connectDB = async () => {
    try {
        await mongoose.connect(databaseURL);
        console.log('Music API - Database connected...');
    } catch (error: any) {
            console.log(error.message);
            setTimeout(connectDB, 5000);
    }
};

export default connectDB;