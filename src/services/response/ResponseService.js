const ResponseService = {
  sendError(response, error) {
    response.status(error.status)
        .json({error: error.message});
  },

  json(response, data, status) {
    response.status(status).json(data);
  },
};

module.exports = ResponseService;
