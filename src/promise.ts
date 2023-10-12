export const promiseAll = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    const results: (T | void)[] = [];
    if (arrayOfPromise.length === 0) {
      resolve(results);
      return;
    }

    arrayOfPromise.forEach((promise, index) => {
      Promise.resolve(promise)
        .catch((error) => reject(error))
        .then((result) => {
          results[index] = result;

          if (index === arrayOfPromise.length - 1) resolve(results);
        });
    });
  });
};
export const promiseRace = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    if (arrayOfPromise.length === 0) {
      resolve(undefined);
      return;
    }
    arrayOfPromise.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export const promiseLast = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise((resolve) => {
    if (arrayOfPromise.length === 0) {
      resolve(undefined);
      return;
    }
    let lastResult: T;
    arrayOfPromise.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          lastResult = result;
        })
        .catch(() => {})
        .finally(() => {
          if (index === arrayOfPromise.length - 1) resolve(lastResult);
        });
    });
  });
};
export const promiseIgnoreErrors = <T>(arrayOfPromise: Promise<T>[]) => {
  return new Promise((resolve) => {
    let results: T[] = [];
    arrayOfPromise.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results.push(result);
        })
        .catch(() => {})
        .finally(() => {
          if (index === arrayOfPromise.length - 1) {
            resolve(results);
          }
        });
    });
    resolve(results);
  });
};
