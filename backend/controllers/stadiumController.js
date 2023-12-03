const Stadium = require('../models/stadiumModel');

const createStadium = async (req, res) => {
  const { name } = req.body;
  const { city } = req.body;
  const { address } = req.body;
  const { rows } = req.body;
  const { rowSeats } = req.body;

  const stadium = new Stadium({
    name,
    city,
    address,
    rows,
    rowSeats
  });

  const stadiumName = await Stadium.findOne({
    name: name,
    city: city
  });
  if (stadiumName) {
    return res.status(403).send({ err: 'This stadium already exists.' });
  }

  stadium
    .save()
    .then(result => {
      res.status(200).send({ msg: 'Stadium added successfully!' });
    })
    .catch(err => {
      res.status(500).send({ err: err.message });
      console.log(err);
    });
};

const getStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find();

    res.status(200).send(
      stadiums.map(stadium => {
        return { ...stadium.toObject() };
      })
    );
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
module.exports = { createStadium, getStadiums };
