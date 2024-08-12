const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe("LocalStorage Operations", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should store a value", () => {
    localStorage.setItem("key", "value");
    expect(localStorage.getItem("key")).toBe("value");
  });

  test("should remove a key", () => {
    localStorage.setItem("key", "value");
    localStorage.removeItem("key");
    expect(localStorage.getItem("key")).toBeNull();
  });
});
