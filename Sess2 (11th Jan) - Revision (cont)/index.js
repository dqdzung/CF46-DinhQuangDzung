// function first() {
//   console.log("first");
// }

// function second() {
//   console.log("second");
// }

// first();
// second();

// function first2() {
//   setTimeout(function () {
//     console.log("First 2");
//   }, 3000);
// }

// function second2() {
//   console.log("Second 2");
// }

// first2();
// second2();

// function doAsync(url, onSuccess, onError) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.onload = () => onSuccess(xhr.responseText);
//   xhr.onerror = () => onError(xhr.statusText);
//   xhr.send();
// }

// doAsync(
//   "https://api.github.com/users/hihi-haha-hoho",
//   (value) => {
//     console.log(value);
//   },
//   (error) => {
//     console.log(error);
//   }
// );

// let promise_pending = new Promise((resolve, reject) => {
// })
// console.log("Initial state", promise_pending);

// let promise_fulfilled = new Promise ((resolve, reject) => {
//     resolve();
// })
// console.log("Fulfilled state", promise_fulfilled);

// let promise_rejected = new Promise ((resolve, reject) => {
//     reject("Error");
// })
// console.log("Rejected state", promise_rejected);

let promise_method = new Promise((resolve, reject) => {
  const data = {
    name: "DQD",
    age: "26",
    job: "unemployed",
  };

  //   resolve(data);
  reject(data);
});

promise_method
  .then(function (data) {
    console.log("Data get when resolved called: ", data);
  })
  .catch(function () {
    console.log("Error");
  })
  .finally(function () {
    console.log("Promise done");
  });

function doAsync(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      return resolve(xhr.responseText);
    };
    xhr.onerror = () => {
      console.log(reject(xhr.statusText));
      return reject(xhr.statusText);
    };
    xhr.send();
  });
}

doAsync("https://api.github.com/users/hihi-haha-hoho")
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
