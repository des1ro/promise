import {
  promiseAll,
  promiseIgnoreErrors,
  promiseLast,
  promiseRace,
} from "../promise";

describe("promiseAll", () => {
  const objectUnderTest = promiseAll;
  it("should resolve with an array of results when all promises resolve", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ];

    const result = await objectUnderTest(promises);

    expect(result).toEqual([1, 2, 3]);
  });

  it("should resolve with an empty array when no promises are provided", async () => {
    const result = await objectUnderTest([]);

    expect(result).toEqual([]);
  });

  it("should reject if any of the promises reject", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject("Error"),
      Promise.resolve(3),
    ];

    await expect(objectUnderTest(promises)).rejects.toEqual("Error");
  });
});

describe("promiseRace", () => {
  const objectUnderTest = promiseRace;
  it("should resolve with the first resolved promise", async () => {
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      new Promise((resolve) => setTimeout(() => resolve(2), 50)),
      new Promise((resolve) => setTimeout(() => resolve(3), 200)),
    ];

    const result = await objectUnderTest(promises);

    expect(result).toBe(2);
  });

  it("should resolve with undefined when no promises are provided", async () => {
    const result = await objectUnderTest([]);

    expect(result).toBeUndefined();
  });

  it("should reject if any of the promises reject", async () => {
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      new Promise((_, reject) => setTimeout(() => reject("Error"), 50)),
      new Promise((resolve) => setTimeout(() => resolve(3), 200)),
    ];

    await expect(objectUnderTest(promises)).rejects.toEqual("Error");
  });
});

describe("promiseLast", () => {
  const objectUnderTest = promiseLast;
  it("should resolve with the result of the last resolved promise", async () => {
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      new Promise((resolve) => setTimeout(() => resolve(3), 50)),
    ];

    const result = await objectUnderTest(promises);

    expect(result).toBe(3);
  });

  it("should resolve with undefined when no promises are provided", async () => {
    const result = await objectUnderTest([]);

    expect(result).toBeUndefined();
  });

  it("should resolve with undefined when all promises reject", async () => {
    const promises = [
      new Promise((_, reject) => setTimeout(() => reject("Error"), 100)),
      new Promise((_, reject) => setTimeout(() => reject("Error"), 200)),
      new Promise((_, reject) => setTimeout(() => reject("Error"), 50)),
    ];

    const result = await objectUnderTest(promises);

    expect(result).toBeUndefined();
  });
});

describe("promiseIgnoreErrors", () => {
  const objectUnderTest = promiseIgnoreErrors;
  it("should resolve with an array of results when some promises resolve and some reject", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject("Error 1"),
      Promise.resolve(3),
      Promise.reject("Error 2"),
    ];

    const result = await objectUnderTest(promises);

    expect(result).toEqual([1, 3]);
  });

  it("should resolve with an empty array when no promises are provided", async () => {
    const result = await objectUnderTest([]);

    expect(result).toEqual([]);
  });
});
