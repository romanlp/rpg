"use strict";

// const LIVERELOAD_PORT = 35729;
const LIVERELOAD_PORT = 33333;

let express = require("express");
let livereload = require("connect-livereload");
let app = express();

let server = app.listen(3000, function() {
	let host = server.address().address;
	let port = server.address().port;

	console.log('Server running at http://%s:%s', host, port);
});

app.use(livereload({ port: LIVERELOAD_PORT }));
app.use(express.static("client"));
