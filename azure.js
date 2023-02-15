var Connection = require('tedious').Connection;
var config = {
  server: 'eyetechserver.database.windows.net',
  authentication: {
    type: 'default',
    options: {
      userName: 'eyetechuser',
      password: 'Umsl@8932'
    }
  },
  options: {
    encrypt: true,
    database: 'EyeTechDatabase'
  }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
  // If no error, then good to proceed.
  console.log("Connected");
});

connection.connect();

