const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRouter.js');
const matchRoutes = require('./routes/matchRouter.js');
const stadiumRoutes = require('./routes/stadiumRouter.js');
const userRouter = require('./routes/userRouter.js');
const ticketRouter = require('./routes/ticketRouter.js');

dotenv.config({ path: './config.env' });

const app = require('./app');

app.use('/api/user', authRoutes);
app.use('/api/user', userRouter);
app.use('/api/match', matchRoutes);
app.use('/api/stadium', stadiumRoutes);
app.use('/api/ticket', ticketRouter);

// Enable CORS for all routes
app.use(cors());
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
