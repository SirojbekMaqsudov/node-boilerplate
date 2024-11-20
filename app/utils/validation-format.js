const validationFormat = (error) => {
  const errors = error.details.reduce((acc, err) => {
    acc[err.path[0]] = err.message;
    return acc;
  }, {});

  return {
    message: error.details[0].message,
    errors
  }
}

module.exports = {validationFormat}