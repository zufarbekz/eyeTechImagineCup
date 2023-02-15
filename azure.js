var Connection = require('tedious').Connection;
var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  

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
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'EyeTechDatabase'  
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {
    addNewRecord('test2');
    console.log("Connected");  
});

connection.connect();

function addNewRecord(videoData) {
    var request = new Request("INSERT eye_tech_records (video_data) OUTPUT INSERTED.id VALUES (@video_data);", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    request.addParameter('video_data', TYPES.NVarChar,videoData); 
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            console.log("Inserted " + column.value);  
          }  
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}  
