const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const del = require("del");
const minimist = require("minimist");

// env vars
var knownOptions = {
	string: "env",
	boolean: "docs",
	default: {
		env: process.env.NODE_ENV || "dev",
		docs: false
	}
}

var options = minimist(process.argv.slice(2), knownOptions);

// Expected options: dev, test, live
var isLive = options.env === "live";

// Prep typescript
var tsProject = null;
var destinationRoot = "";

if (isLive) {
	tsProject = ts.createProject('tsconfig.json', {
		sourceMap: false,
		outDir: ""
	  //outFile: 'app.js'
	});

	destinationRoot = "./build/dist";
} else {
	destinationRoot = "./build/dev";
	tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
}

console.log("Building for environment " + options.env);

// Clean old build
gulp.task("clean", function() {
	return del([destinationRoot, "./css"]);
});

// Compile
gulp.task('tscompile', function () {
	return tsProject.src('./src/**/*.ts')
		.pipe(gulpif(!isLive, sourcemaps.init()))
		.pipe(ts(tsProject))
		.pipe(gulpif(!isLive, sourcemaps.write()))
		.pipe(gulp.dest(destinationRoot + '/js'));

});

// Clean out the raw compile files
gulp.task("cleancompile", ["compress"], function() {
	return del([destinationRoot + "/js/compile"]);
});

gulp.task("default", ["clean"], function() {
	gulp.start("tscompile");
});