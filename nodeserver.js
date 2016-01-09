var program = require("commander");
var express = require("express");
var app = express();

// set time zone of this process to Europe/Berlin
process.env.TZ = 'Europe/Berlin' 

program
  .version('0.0.1')
  .option('-p, --port [port_number]', 'set web server port (8888)', '8888')
  .parse(process.argv);

port = program.port;

// list of paths
app.use(express.static(__dirname));

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at ', host, port);
  console.log('CTRL + C to shutdown.');
})
