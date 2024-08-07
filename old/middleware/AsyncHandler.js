module.exports = (func) => (req, res, next) => {
  // Promise used here
  // if there is no error then it is resolved. which means the function passed in it is going to run.
  // if there is any error the it will not stop the code/server but use next to make code tranfer to another block
  Promise.resolve(func(req, res, next)).catch(next);
};
