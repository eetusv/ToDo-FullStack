class APIError extends Error {
  constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
  
module.exports = { APIError };