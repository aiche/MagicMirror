var program = require("commander");
var express  = require("express");
var request = require('request');
var git = require('git-rev')

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

app.use('/api/git', function(req, res) {
    git.long(function (str) {
        var response = {
            gitHash: str
        };
        res.send(JSON.stringify(response));
    })
});

app.use('/api/cal', function(req, res) {
    if (!req.query.url) {
        res.status(400).send('Invalid query');
    } else {
        request({
                url: req.query.url
            },
            function(error, response, body) {
                res.send(body);
            });
    }
});

var server = app.listen(port, function() {

     
    var host = server.address().address; 
    var port = server.address().port;

     
    console.log('MagicMirror node server listining at ', host, port);
    console.log('CTRL + C to shutdown.');
})
