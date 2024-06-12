import { logout } from "./logout";
import { remove } from "../../storage/index";

jest.mock("../../storage/index", () => ({
  remove: jest.fn(),
}));

describe("Logout Functionality", () => {
  test("should clear the token and profile from browser storage", () => {
    logout();
    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledWith("profile");
    expect(remove).toHaveBeenCalledTimes(2);
  });
});
