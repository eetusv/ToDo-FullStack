const express = require('express');
const connectMongoDB = require('./db/mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const passport = require('passport');
const config = require('./utils/config');
const errorHandler = require('./middleware/errorHandler');
require('./utils/passport');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SESSION_SECRET = config.SESSION_SECRET;
app.use(session({
    name: 'sessionId',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
        secure: false
    },
    store: MongoDBStore.create({
        mongoUrl: config.MONGO_URI,
        collectionName: 'sessions',
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/', authRoutes);
app.use('/todos', todoRoutes);
app.use('/profile', userRoutes);
app.use(errorHandler);

const start = async () => {
    try {
        await connectMongoDB(config.MONGO_URI);
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

start();