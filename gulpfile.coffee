gulp = require 'gulp'
$ = do require "gulp-load-plugins"
generate = require './tools/generator'

series = (x) -> gulp.series.apply gulp, x
parallel = (x) -> gulp.parallel.apply gulp, x

# #####################################
# Build libraries and scripts for domains
#

generate 'app', [
    'node_modules/jquery/dist/jquery.min.js'
    'node_modules/angular/angular.js'
    'node_modules/@angular/router/angular1/angular_1_router.js'
    'node_modules/materialize-css/dist/js/materialize.min.js'
    'node_modules/materialize-css/dist/css/materialize.min.css'
    'node_modules/mdi/css/materialdesignicons.min.css'
    'node_modules/css-percentage-circle/css/circle.css'
    'node_modules/sortablejs/Sortable.min.js'
    'node_modules/angular-legacy-sortablejs/angular-legacy-sortable.js'
    'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js'
    'node_modules/js-md5/build/md5.min.js'
    'node_modules/ng-tags-input/build/ng-tags-input.js'
    'node_modules/moment/min/moment.min.js'
    'node_modules/rxjs/bundles/Rx.min.js'
], [
    '../shared/integration/pluralsight-urls.service.js'
    '../shared/model/*.js'
    '../shared/storage/storage.service.js'
    '../shared/utils/compare.js'
    '../shared/utils/fetch.js'
    '../shared/utils/time.js'
    'app.module.js'
    'page.component.js'
    'playlists/playlists.module.js'
    'playlists/playlist-edit.component.js'
    'playlists/playlists-list.component.js'
    'playlists/playlists-import.component.js'
    'playlists/sidebar/playlist-summary.component.js'
    'playlists/playlist-factory.service.js'
    'courses/courses.module.js'
    'courses/course-select.component.js'
    'courses/courses-list.component.js'
    'courses/course-autosuggest.service.js'
    'courses/course-details.service.js'
    'courses/course-factory.service.js'
]

generate 'options', [
    'node_modules/jquery/dist/jquery.min.js'
    'node_modules/angular/angular.js'
    'node_modules/materialize-css/dist/js/materialize.min.js'
    'node_modules/materialize-css/dist/css/materialize.min.css'
    'node_modules/mdi/css/materialdesignicons.min.css'
], [
    '../shared/model/*.js'
    '../shared/storage/storage.service.js'
    'scripts/options.js'
]

generate 'popup', [
    'node_modules/jquery/dist/jquery.min.js'
    'node_modules/angular/angular.js'
    'node_modules/materialize-css/dist/js/materialize.min.js'
    'node_modules/materialize-css/dist/css/materialize.min.css'
    'node_modules/mdi/css/materialdesignicons.min.css'
], [
    '../shared/model/*.js'
    '../shared/storage/storage.service.js'
    'scripts/popup.js'
]

# #####################################
# Build tasks for watch
#

gulp.task 'build:scripts', parallel [
    'build:app:scripts'
    'build:options:scripts'
    'build:popup:scripts'
]

gulp.task 'build:styles', parallel [
    'build:app:styles'
    'build:options:styles'
    'build:popup:styles'
]

# #####################################
# Compile templates
#

gulp.task 'build:html', ->
    gulp.src 'src/**/*.pug'
        .pipe $.pug()
        .pipe gulp.dest 'dist'

# #####################################
# Copy static assets
#

gulp.task 'copy:manifest', ->
    gulp.src 'src/manifest.json'
        .pipe gulp.dest 'dist'

gulp.task 'copy:images', ->
    gulp.src 'src/**/*.+(png|svg)'
        .pipe gulp.dest 'dist'

gulp.task 'copy:fonts', ->
    gulp.src [
        'node_modules/materialize-css/dist/fonts/**/*.woff2'
        'node_modules/mdi/fonts/**/*.woff2'
    ]
        .pipe gulp.dest 'dist/fonts'

# #####################################
# Build everything
#

gulp.task 'build', parallel [
    'build:app'
    'build:options'
    'build:popup'
    'build:html'
    'copy:manifest'
    'copy:images'
    'copy:fonts'
]

# #####################################
# Clean everything
#

gulp.task 'clean', ->
    require('del') ['dist', 'bin']

# #####################################
# Create packages
#

gulp.task 'pack:zip', () ->
    {'7z':_7z} = require('7zip')
    {spawn} = require('child_process')
    spawn(_7z, ['a', 'bin\\extension.zip', '.\\dist\\*'])

gulp.task 'pack:crx', () ->
    fs = require 'fs'
    {join} = require 'path'
    ChromeExtension = require 'crx'

    fs.mkdirSync('bin') unless fs.existsSync('bin')

    crx = new ChromeExtension    
        privateKey: fs.readFileSync join(__dirname, 'key.pem')
    crx.load(join(__dirname,'dist'))
        .then ->
            crx.pack()
                .then (crxBuffer) ->
                    fs.writeFile join(__dirname,'bin','extension.crx'), crxBuffer, (err) ->
                        console.log err if err

gulp.task 'pack', parallel [
    'pack:zip'
    'pack:crx'
]

gulp.task 'default', series [
    'clean'
    'build'
    'pack'
]

# #####################################
# Watch for changes (dev mode)
#

gulp.task 'watch', ->
    gulp.watch 'src/**/*.pug',      parallel ['build:html']
    gulp.watch 'src/**/*.js',       parallel ['build:scripts']
    gulp.watch 'src/**/*.scss',     parallel ['build:styles']
    gulp.watch 'src/manifest.json', parallel ['copy:manifest']
