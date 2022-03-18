exports.LogService = {
  log(...data) {
    // process.env.NODE_ENV === 'development' && console.log(data);
    console.log(data);
  },
  error(error) {
    // add sentry
    process.env.NODE_ENV !== 'test' && console.error(error);
  },
};
