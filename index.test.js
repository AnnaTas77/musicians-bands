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

  describe("Testing the Band Model", () => {
    test("can create a Band", async () => {
      const testBand = await Band.create({ name: "AC/DC", genre: "rock" });
      expect(testBand.name).toBe("AC/DC");
      expect(testBand.genre).toBe("rock");
    });
  });

  describe("Testing the Musician Model", () => {
    test("can create a Musician", async () => {
      const testMusician = await Musician.create({
        name: "Stevie Young",
        instrument: "guitar",
      });
      expect(testMusician.name).toBe("Stevie Young");
      expect(testMusician.instrument).toBe("guitar");
    });
  });

  describe("Testing the Song Model", () => {
    test("can create a Band", async () => {
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

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });

  test("can update a Band", async () => {
    // TODO - test updating a band
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });

  test("can update a Musician", async () => {
    // TODO - test updating a musician
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });

  test("can delete a Band", async () => {
    // TODO - test deleting a band
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });

  test("can delete a Musician", async () => {
    // TODO - test deleting a musician
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });
});
