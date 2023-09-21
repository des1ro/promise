import {
  promiseAllAwait,
  promiseRaceAwait,
  promiseLastAwait,
  promiseIgnoreErrorsAwait,
} from "../asyncAwait";

describe("promiseAllAwait test suite", () => {
  let objectUnderTest = promiseAllAwait;
  it("should resolve with an array of results when all promises resolve", async () => {
    //Given
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ];
    //When
    const result = await objectUnderTest(promises);
    //Then
    expect(result).toEqual([1, 2, 3]);
  });

  it("should resolve with an empty array when no promises are provided", async () => {
    //When
    const result = await objectUnderTest([]);
    expect(result).toEqual([]);
  });

  it("should reject if any of the promises reject", async () => {
    //Given
    const promises = [
      Promise.resolve(1),
      Promise.reject("Error"),
      Promise.resolve(3),
    ];
    //Then
    await expect(objectUnderTest(promises)).rejects.toEqual("Error");
  });
});

describe("promiseRaceAwait test suite", () => {
  const objectUnderTest = promiseRaceAwait;
  it("should resolve with the first resolved promise", async () => {
    //Given
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      new Promise((resolve) => setTimeout(() => resolve(2), 50)),
      new Promise((resolve) => setTimeout(() => resolve(3), 200)),
    ];
    //When
    const result = await objectUnderTest(promises);
    //Then
    expect(result).toBe(2);
  });

  it("should resolve with undefined when no promises are provided", async () => {
    //When
    const result = await objectUnderTest([]);
    //Then
    expect(result).toBeUndefined();
  });

  it("should reject if any of the promises reject", async () => {
    //Given
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      new Promise((resolve, reject) => setTimeout(() => reject("Error"), 50)),
      new Promise((resolve) => setTimeout(() => resolve(3), 200)),
    ];
    //Then
    await expect(objectUnderTest(promises)).rejects.toEqual("Error");
  });
});

describe("promiseLastAwait test suite", () => {
  const objectUnderTest = promiseLastAwait;
  it("should resolve with the result of the last resolved promise", async () => {
    //Given
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      new Promise((resolve) => setTimeout(() => resolve(3), 50)),
    ];
    //When
    const result = await objectUnderTest(promises);
    //Then
    expect(result).toBe(3);
  });
  it("should resolve with undefined when no promises are provided", async () => {
    //When
    const result = await objectUnderTest([]);
    //Then
    expect(result).toBeUndefined();
  });
  it("should resolve with undefined when all promises reject", async () => {
    //Given
    const promises = [
      new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100)),
      new Promise((resolve, reject) => setTimeout(() => reject("Error"), 200)),
      new Promise((resolve, reject) => setTimeout(() => reject("Error"), 50)),
    ];
    //When
    const result = await objectUnderTest(promises);
    //Then
    expect(result).toBeUndefined();
  });
});
describe("promiseIgnoreErrorsAwait test suite", () => {
  const objectUnderTest = promiseIgnoreErrorsAwait;
  it("should resolve with an array of results when some promises resolve and some reject", async () => {
    //Given
    const promises = [
      Promise.resolve(1),
      Promise.reject("Error 1"),
      Promise.resolve(3),
      Promise.reject("Error 2"),
    ];
    //When
    const result = await objectUnderTest(promises);
    //Then
    expect(result).toEqual([1, 3]);
  });
  it("should resolve with an empty array when no promises are provided", async () => {
    //When
    const result = await objectUnderTest([]);
    //Then
    expect(result).toEqual([]);
  });
});
