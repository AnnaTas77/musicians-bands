const { Band } = require("./models/Band");
const { Musician } = require("./models/Musician");
const { Song } = require("./models/Song");
// Define associations here

// Task 1 - Day 2 - One-to-Many Associations
Band.hasMany(Musician);
Musician.belongsTo(Band);

// Task 2 - Day 2 - Many-to-Many Associations

Song.belongsToMany(Band, { through: "SongBands" });
Band.belongsToMany(Song, { through: "SongBands" });

module.exports = {
  Band,
  Musician,
  Song,
};
