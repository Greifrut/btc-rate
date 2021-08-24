import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const { expect } = chai;

import { UserService } from "../../../src/services/user.service";
import { MockDatabase } from "../../mocks/database.mock";

const testUser = { email: "test@test.com", password: "test" };
const wrongTestUser = { ...testUser, password: "tst" };

describe("User service", () => {
  describe("#login", () => {
    it("When user is registered, expect user to be logged in", async () => {
      const database = new MockDatabase();
      const userService = new UserService(database, "users");

      await database.createTable("users");
      await database.write("users", testUser);

      const loggedUser = await userService.login(testUser);

      expect(loggedUser).is.deep.equal(testUser);
    });
    it("When user is didn't registered, expect error 'User doesn't exist'", async () => {
      const database = new MockDatabase();
      const userService = new UserService(database, "users");

      await database.createTable("users");

      await expect(userService.login(testUser)).to.be.rejectedWith(
        "User doesn't exist"
      );
    });
    it("When user provided wrong password, expect error 'Wrong password'", async () => {
      const database = new MockDatabase();
      const userService = new UserService(database, "users");

      await database.createTable("users");
      await database.write("users", testUser);

      await expect(userService.login(wrongTestUser)).to.be.rejectedWith(
        "Wrong password"
      );
    });
  });
  describe("#register", () => {
    it("When is a new user, expect it to be registered", async () => {
      const database = new MockDatabase();
      const userService = new UserService(database, "users");

      await database.createTable("users");

      const registeredUser = await userService.register(testUser);

      expect(registeredUser).is.deep.equal(testUser);
    });
    it("When user is registered, expect error 'User is exist'", async () => {
      const database = new MockDatabase();
      const userService = new UserService(database, "users");

      await database.createTable("users");
      await database.write("users", testUser);

      await expect(userService.register(testUser)).to.be.rejectedWith(
        "User is exist"
      );
    });
    it("When is a new user, but we can't create him, expect error 'Can't create a new user'", async () => {
      const database = new MockDatabase();
      database.write = () => null;
      const userService = new UserService(database, "users");

      await database.createTable("users");

      await expect(userService.register(testUser)).to.be.rejectedWith(
        "Can't create a new user"
      );
    });
  });
});
