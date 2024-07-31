const { where } = require("sequelize");
const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  describe("Testing the CREATE operation", () => {
    test("can create a Band", async () => {
      const testBand = await Band.create({ name: "AC/DC", genre: "rock" });
      expect(testBand.name).toBe("AC/DC");
      expect(testBand.genre).toBe("rock");
    });
    test("can create a Musician", async () => {
      const testMusician = await Musician.create({
        name: "Stevie Young",
        instrument: "guitar",
      });
      expect(testMusician.name).toBe("Stevie Young");
      expect(testMusician.instrument).toBe("guitar");
    });

    test("can create a Song", async () => {
      const testSong = await Song.create({
        title: "Thunderstruck",
        year: 1990,
        length: 5,
      });
      expect(testSong.title).toBe("Thunderstruck");
      expect(testSong.year).toBe(1990);
      expect(testSong.length).toBe(5);
    });
  });

  describe("Testing the UPDATE operation", () => {
    test("can update a Musician", async () => {
      const testMusician = await Musician.create({
        name: "Stevie Young",
        instrument: "guitar",
      });
      await testMusician.update(
        { name: "Malcolm Young" },
        {
          where: {
            name: "Stevie Young",
          },
        }
      );
      expect(testMusician.name).toBe("Malcolm Young");
    });

    test("can update a Band", async () => {
      const testBand = await Band.create({ name: "AC/DC", genre: "rock" });
      await testBand.update(
        { name: "Rolling Stones" },
        { where: { name: "AC/DC" } }
      );
      expect(testBand.name).toBe("Rolling Stones");
    });

    test("can update a Song", async () => {
      const testSong = await Song.create({
        title: "Thunderstruck",
        year: 1990,
        length: 5,
      });
      testSong.update(
        { title: "Sympathy For The Devil" },
        { where: { title: "Thunderstruck" } }
      );
      expect(testSong.title).toBe("Sympathy For The Devil");
    });
  });

  describe("Testing the DELETE operation", () => {
    test("can delete a Band", async () => {
      // TODO - test deleting a band
      expect("NO TEST").toBe("EXPECTED VALUE HERE");
    });

    test("can delete a Musician", async () => {
      // TODO - test deleting a musician
      expect("NO TEST").toBe("EXPECTED VALUE HERE");
    });
  });
});
