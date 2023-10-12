export const promiseAllAwait = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    if (arrayOfPromise.length === 0) {
      resolve(results);
      return;
    }

    arrayOfPromise.forEach(async (promise, index) => {
      try {
        const result = await Promise.resolve(promise);
        results[index] = result;

        if (index === arrayOfPromise.length - 1) {
          resolve(results);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const promiseRaceAwait = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    if (arrayOfPromise.length === 0) {
      resolve(undefined);
      return;
    }

    arrayOfPromise.forEach(async (promise) => {
      try {
        const result = await Promise.resolve(promise);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const promiseLastAwait = <T>(arrayOfPromise: Promise<T>[]) => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve(undefined);
  }
  let result: T;
  return new Promise<T>((resolve, reject) => {
    arrayOfPromise.forEach(async (promise, index) => {
      try {
        result = await Promise.resolve(promise);
      } catch (error) {
      } finally {
        if (index === arrayOfPromise.length - 1) {
          resolve(result);
        }
      }
    });
  });
};

export const promiseIgnoreErrorsAwait = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise<T[]>((resolve) => {
    const results: T[] = [];
    if (arrayOfPromise.length === 0) {
      resolve(results);
      return;
    }
    arrayOfPromise.forEach(async (promise, index) => {
      try {
        const result = await Promise.resolve(promise);
        results.push(result);
      } catch (err) {}
    });
    resolve(results);
  });
};
// 1 generyczny
// 2 catch finnaly ify
