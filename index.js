// s = "jello";
// console.log(typeof s);
// console.log(s);

// var name = "Subash";
// console.log(name);

// let hobbies = "Coding, Nodejs, Reactjs";
// console.log(hobbies);

// const learning = "Always";
// console.log(learning);
// var a = 40;
// var b = 20;

// function test() {
//   let a = 20;
//   b = 30;

//   console.log(a);
//   console.log(b);
// }

// test();

// console.log(b);
// console.log(a);

// prabin2();
// prabin("Test");

// const prabin = (givenName) => {
//   console.log("Hello " + givenName);
//   console.log("Hello ", givenName);
// };

// function prabin2() {
//   console.log("Prabin 2 is printing");
// }

// prabin("Suaper", "Jello");

// function simpletVarAndLetExample() {
//   if (true) {
//     var x = 10;
//     let y = 20;
//   }
//   console.log(x); // Output: ?
//   console.log(y); // Output: ?
// }

// // simpletVarAndLetExample();

// let student = {
//   id: "1",
//   name: "ABC",
// };

// let arr = ["Hello", 1, "2"];

// console.log(student.name, student.id);

// console.log(arr[2]);

// console.log(typeof arr[1]);

// let newArr = arr.map((item) => {
//   console.log(item);
//   return item + " new";
// });

// console.log(newArr);

// let a = [1, 2, 3, 4];

// let b = [...a];

// console.log(b);

// a.push(5);

// console.log(b);

// let m = "Hello";

// let t = m;

// m = "test";

// console.log(t);

// function restTest(...a) {
//   console.log([...a]);
// }

// restTest(10, 20);

// let a = 10;

// let test = {
//   id: "Hello",
//   name: "Jello",
//   age: "trello",
//   test: () => {
//     console.log("Test function from objext");
//     return "return gareko Value";
//   },
// };

// let { name, age } = test;

// console.log(test);
// console.log(name);
// console.log(age);
// console.log(test.test());

// let amrit = (callback) => {
//   setTimeout(() => {
//     console.log("This is after 5 sec");
//     callback(12);
//     // return 12;
//   }, 5000);
// };

// function afterAmrit(val) {
//   console.log("After Calling amrit", val);
// }

// console.log("Initial");
// let value = amrit(afterAmrit);

// function panNikala(callback) {
//   setTimeout(() => {
//     callback("🍳", andaHala);
//   }, 1000);
// }

// function telHala(data, callback) {
//   setTimeout(() => {
//     callback(data + "🛢️");
//   }, 2000);
// }

// function andaHala(data, callback) {
//   setTimeout(() => {
//     console.log(data + "🥚");
//   }, 2000);
// }

// panNikala();

const bcrypt = require("bcrypt");
const saltRounds = 12;

// This is after learning promise
let text;

bcrypt.hash("subash", saltRounds).then((data) => {
  console.log("Using Promise only");
  console.log(data);

  text = data;
  // to compare
  bcrypt.compare("subash", text).then((data) => {
    console.log("Using Promise only");
    console.log(data);
  });

  // to compare
  bcrypt.compare("subash", text).then((data) => {
    console.log("Using Promise only");
    console.log(data);
  });
});

console.log("Using async await");

// This is after learning promise - async await
async function checkName() {
  text = await bcrypt.hash("subash", saltRounds);
  console.log("Using async await");
  console.log(text);
  compare();
}

async function compare() {
  // to compare
  const comparision = await bcrypt.compare("subash", text);
  console.log("Using async await");
  console.log(comparision);

  // to compare
  const comparision2 = await bcrypt.compare("subas", text);
  console.log("Using async await");
  console.log(comparision2);
}

checkName();
