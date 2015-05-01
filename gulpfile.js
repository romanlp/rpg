var gulp    = require("gulp");
var babel   = require("gulp-babel");
var nodemon = require("gulp-nodemon");
var changed = require("gulp-changed");
var tiny_lr = require("tiny-lr")();

var LIVERELOAD_PORT = 33333;
var HTML_FILES   = "client/*.html";
var CSS_FILES    = "client/css/*.css";
var JS_FILES     = "client/js/*.js";
var COMPILED_JS_FILES_DIR = "client/js/es5";
var COMPILED_JS_FILES = COMPILED_JS_FILES_DIR + "/**/*.js";

gulp.task("livereload-server", function() {
	tiny_lr.listen(LIVERELOAD_PORT);
});

function notifyLivereloadServer(event) {
	var fileName = require('path').relative(__dirname, event.path);
	tiny_lr.changed({
		body: {files: [fileName]}
	});
}

gulp.task("js", function() {
	gulp.src(JS_FILES)
		.pipe(changed(COMPILED_JS_FILES_DIR))
		.pipe(babel())
		.pipe(gulp.dest(COMPILED_JS_FILES_DIR));
});

// Refresh browser when client-side code is changed
gulp.task("watch-client", function() {
	gulp.watch(JS_FILES  , ["js"]);
	gulp.watch(HTML_FILES       , notifyLivereloadServer);
	gulp.watch(CSS_FILES        , notifyLivereloadServer);
	gulp.watch(COMPILED_JS_FILES, notifyLivereloadServer);
});

// Restart Node when server-side code is changed
gulp.task("watch-server", function() {
	nodemon({
		script : 'server/server.js',
		watch  : "server"
	});
});

gulp.task("default", ["livereload-server", "watch-server", "watch-client"]);
