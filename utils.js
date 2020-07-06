class ApiError extends Error {
  statusCode;
  body;
  constructor(statusCode, body) {
    super();
    if(Array.isArray(body)) {
      this.body = {
        Errors: body
      }
    } else {
      this.body = body;
    }
    this.statusCode = statusCode;
  }
}

module.exports.ApiError = ApiError

const formatApiError = (error) => {
  return ({
    isBase64Encoded: false,
    statusCode: error.statusCode,
    headers: {
      "Content-Type": typeof body === "string" ? "text/html" : "application/json",
    },
    body: typeof error.body === "string" ? error.body : JSON.stringify(error.body)
  });
}
 
module.exports.handleError = (logger, error ) => { 
  if (error instanceof ApiError) {
    const response = formatApiError(error);
    return Promise.resolve(response)
  } else {
    logger.error("Internal Server Error: ", error);
    const response = formatApiError(new ApiError(500, "Internal Server Error"));
    return Promise.resolve(response);
  }
};

module.exports.handleResp = (
  body
) => ({
  isBase64Encoded: false,
  statusCode: 200,
  headers: {
    "Content-Type": typeof body === "string" ? "text/html" : "application/json",
  },
  body: JSON.stringify(body)
});

 