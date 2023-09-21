export const promiseAllAwait = (arrayOfPromise: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
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

export const promiseRaceAwait = (arrayOfPromise: Promise<any>[]) => {
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

export const promiseLastAwait = (arrayOfPromise: Promise<any>[]) => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve(undefined);
  }
  let result: any = undefined;
  return new Promise((resolve, reject) => {
    arrayOfPromise.forEach(async (promise, index) => {
      try {
        result = await Promise.resolve(promise);
        if (index === arrayOfPromise.length - 1) {
          resolve(result);
        }
      } catch (error) {
        if (index === arrayOfPromise.length - 1) {
          resolve(result);
        }
      }
    });
  });
};

export const promiseIgnoreErrorsAwait = (arrayOfPromise: Promise<any>[]) => {
  return new Promise((resolve) => {
    const results: any[] = [];
    if (arrayOfPromise.length === 0) {
      resolve(results);
      return;
    }
    arrayOfPromise.forEach(async (promise, index) => {
      try {
        const result = await Promise.resolve(promise);
        results.push(result);

        if (index === arrayOfPromise.length - 1) {
          resolve(results);
        }
      } catch (err) {
        if (index === arrayOfPromise.length - 1) {
          resolve(results);
        }
      }
    });
  });
};
