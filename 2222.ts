import { promiseLastAwait } from "./src/asyncAwait";
const promises = [
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 1 resolved"), 1000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 2 resolved"), 2000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 3 resolved"), 3000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 4 resolved"), 4000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 5 resolved"), 5000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 6 resolved"), 6000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 7 resolved"), 7000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 8 resolved"), 8000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 9 resolved"), 9000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Promis 10 resolved"), 10000)
  ),
];
const promises2 = [
  new Promise((resolve, reject) => setTimeout(() => reject("Error1"), 100)),
  new Promise((resolve, reject) => setTimeout(() => reject("Error2"), 200)),
  new Promise((resolve, reject) => setTimeout(() => reject("Error3"), 50)),
];
promiseLastAwait(promises2)
  .then((resolve) => console.log(resolve))
  .catch((err) => console.log(err));
