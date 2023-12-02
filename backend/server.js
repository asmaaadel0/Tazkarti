const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRouter.js');
const matchRoutes = require('./routes/matchRouter.js');

dotenv.config({ path: './config.env' });

const app = require('./app');

app.use('/api/user', userRoutes);
app.use('/api/match', matchRoutes);

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
