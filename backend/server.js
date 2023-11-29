const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRouter.js');

dotenv.config({ path: './config.env' });

const app = require('./app');

app.use('/api/user', userRoutes);

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
