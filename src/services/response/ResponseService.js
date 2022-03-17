const ResponseService = {
  sendError(response, error) {
    response.status(error.status)
        .json({error: error.message});
  },

  raw(response, data, status) {
    response.status(status).send(data);
  },
};

module.exports = ResponseService;
