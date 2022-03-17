const http = require('http');
const App = require('./app.js');
const {AppConfigs} = require('./configs/app.js');
const {connectDB} = require('./configs/db.js');
const {LogService} = require('./services/log/LogService.js');

http.createServer(App).listen(AppConfigs.SERVER_PORT, async () => {
  LogService.log('Server running on port ' + AppConfigs.SERVER_PORT);
  try {
    await connectDB();
  } catch (error) {
    LogService.log(error);
  }
});
