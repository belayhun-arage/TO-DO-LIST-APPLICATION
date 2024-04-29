const handleErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: { message } });
  };
  
 export default handleErrors;
  