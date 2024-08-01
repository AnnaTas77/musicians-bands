const { where } = require("sequelize");
const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

/**
 * Runs the code prior to all tests
 */
beforeAll(async () => {
  // the 'sync' method will create tables based on the model class
  // by setting 'force:true' the tables are recreated each time the
  // test suite is run
  await sequelize.sync({ force: true });
});

describe("Band, Musician, and Song Models - DAY 1", () => {
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
      const testBand = await Band.create({ name: "AC/DC", genre: "rock" });

      const deletedBand = await testBand.destroy({ where: { name: "AC/DC" } });
      //   console.log(deletedBand.toJSON());

      expect(deletedBand.toJSON()).toEqual(
        expect.objectContaining({
          name: "AC/DC",
          genre: "rock",
        })
      );
    });

    test("can delete a Musician", async () => {
      const testMusician = await Musician.create({
        name: "Stevie Young",
        instrument: "guitar",
      });

      const deletedMusician = await testMusician.destroy({
        where: { name: "Stevie Young" },
      });
      expect(deletedMusician.toJSON()).toEqual(
        expect.objectContaining({
          name: "Stevie Young",
          instrument: "guitar",
        })
      );
    });

    test("can delete a Song", async () => {
      const testSong = await Song.create({
        title: "Thunderstruck",
        year: 1990,
        length: 5,
      });

      const deletedSong = await testSong.destroy({
        where: { title: "Thunderstruck" },
      });
      expect(deletedSong.toJSON()).toEqual(
        expect.objectContaining({
          title: "Thunderstruck",
          year: 1990,
          length: 5,
        })
      );
    });
  });
});

describe.only("One-to-Many Associations - DAY 2", () => {
  test("Band and Musician should have a one-to-one association", async () => {
    const testBand1 = await Band.create({ name: "AC/DC", genre: "rock" });
    // const testBand2 = await Band.create({
    //   name: "Rolling Stones",
    //   genre: "rock",
    // });

    const allMusicians = await Musician.bulkCreate([
      {
        name: "Malcolm Young",
        instrument: "guitar",
      },
      {
        name: "Stevie Young",
        instrument: "guitar",
      },
    ]);
    // console.log("All Musicians: ", allMusicians);

    await testBand1.setMusicians(allMusicians);

    // const bandWithMusicians = await Band.findOne({
    //   where: { name: "AC/DC" },
    //   include: Musician,
    // });

    const foundMusicians = await testBand1.getMusicians();
    // console.log(JSON.stringify(foundMusicians, null, 2));

    expect(foundMusicians.length).toBe(2);
  });
});
