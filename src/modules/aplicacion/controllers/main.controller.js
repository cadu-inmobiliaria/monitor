const status = async (req, res) => {
  return res
    .status(200)
    .json({
      error: false,
      message: 'La API esta funcionando y ejecutandose',
      data: { api: 'mon-api' }
    }).end();
}
module.exports = { status }
