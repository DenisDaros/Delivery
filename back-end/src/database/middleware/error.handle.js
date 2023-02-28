const errorHendle = (err, res) => {
  console.log(err)

  const status = err.status
  const message = err.message

  return res.status(status).json({ error: message })
}

module.exports = errorHendle;