gulp = require "gulp"
$ = do require "gulp-load-plugins"
parallel = (x) -> gulp.parallel.apply gulp, x

module.exports = (context, libs, scripts) ->
    gulp.task "build:#{context}:scripts", ->
        gulp.src scripts.map (x) -> "src/#{context}/#{x}"
            .pipe $.concat 'scripts.js'
            .pipe gulp.dest "dist/#{context}"

    gulp.task "build:#{context}:styles", ->
        gulp.src "src/#{context}/**/*.scss"
            .pipe $.postcss [
                require("precss") import: extension: "scss"
            ]
            .pipe $.concat 'styles.css'
            .pipe gulp.dest "dist/#{context}"

    gulp.task "libs:#{context}:scripts", ->
        jsLibs = libs.filter (x) -> /\.js$/.test x
        return Promise.resolve() unless jsLibs.length > 0
        gulp.src jsLibs
            .pipe $.concat 'libs.js'
            .pipe gulp.dest "dist/#{context}"

    gulp.task "libs:#{context}:styles", ->
        cssLibs = libs.filter (x) -> /\.css$/.test x
        return Promise.resolve() unless cssLibs.length > 0
        gulp.src cssLibs
            .pipe $.concat 'libs.css'
            .pipe gulp.dest "dist/#{context}"

    gulp.task "build:#{context}", parallel [
        "build:#{context}:scripts"
        "build:#{context}:styles"
        "libs:#{context}:scripts"
        "libs:#{context}:styles"
    ]