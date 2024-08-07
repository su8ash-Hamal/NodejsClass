module.exports = func = (error, req, res, next) => {
  // This will be our last middleware so that means it occures when there is error which is thrown by asyncHandler

  console.error("Error Found:", error);
  res.status(400).send({
    success: false,
    error: error.message,
  });
};
