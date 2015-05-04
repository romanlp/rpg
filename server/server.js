"use strict";

const LIVERELOAD_PORT = 33333;

const express    = require("express");
const livereload = require("connect-livereload");
const app = express();

const server = app.listen(3000, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log(`Server running at http://${host}:${port}`);
});

app.use(livereload({ port: LIVERELOAD_PORT }));
app.use(express.static("client"));
