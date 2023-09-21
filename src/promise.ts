export const promiseAll = (arrayOfPromise: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
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
export const promiseRace = (arrayOfPromise: Promise<any>[]) => {
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

export const promiseLast = (arrayOfPromise: Promise<any>[]) => {
  return new Promise((resolve) => {
    if (arrayOfPromise.length === 0) {
      resolve(undefined);
      return;
    }
    let lastResult: any = undefined;
    let resolved = false;

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
export const promiseIgnoreErrors = (arrayOfPromise: Promise<any>[]) => {
  return new Promise((resolve) => {
    let results: any = [];
    let count = 0;
    if (arrayOfPromise.length === 0) {
      resolve(results);
      return;
    }
    arrayOfPromise.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          results.push(result);
          count++;
          if (count === arrayOfPromise.length) {
            resolve(results);
          }
        })
        .catch(() => {
          count++;
          if (count === arrayOfPromise.length) {
            resolve(results);
          }
        });
    });
  });
};
