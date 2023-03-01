const errorHendle = (err, res) => {

  const status = err.status
  const message = err.message

  return res.status(status).json({ error: message })
}

module.exports = errorHendle;