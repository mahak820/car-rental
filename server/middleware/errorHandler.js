const errorHandler = (err , req, res ,next) =>{

const statusCode  = res.statusCode <= 200 ? 500 : res.statusCode
res.status (statusCode)
res.json({mssg : err.message,
   stack : process.env.NODE_ENV === 'development' ? err.stack : null
})

}
module.exports = errorHandler