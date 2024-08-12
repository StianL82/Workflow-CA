import { login } from "./login";

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: "mockToken" }),
  }),
);

afterEach(() => {
  global.fetch.mockClear();
  global.localStorage.clear();
});

describe("Login Functionality", () => {
  it("creates a token with a successful login", async () => {
    const email = "summer24@test.com";
    const password = "summer-holidays2024";

    await login(email, password);

    const storedToken = localStorage.getItem("token");
    const parsedToken = JSON.parse(storedToken);
    expect(parsedToken).toEqual("mockToken");
  });

  it("does not create a token with invalid credentials", async () => {
    const email = "invalid@test.com";
    const password = "wrongpassword";

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Unauthorized",
        json: () => Promise.resolve({ error: "Invalid credentials" }),
      }),
    );

    await expect(login(email, password)).rejects.toThrow("Unauthorized");

    const storedToken = localStorage.getItem("token");
    expect(storedToken).toBeNull();
  });
});
