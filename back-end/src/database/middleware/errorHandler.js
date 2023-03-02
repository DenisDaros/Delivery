const errorHandler = (err, res, next) => {

  const status = err.status
  const message = err.message

  return res.status(status).json({ error: message });

  next();
  
};


module.exports = errorHandler;