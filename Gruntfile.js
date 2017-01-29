module.exports = function(grunt) {
    const PUBLIC_PATH = `${__dirname}/public`;
    let fs = require('fs'),
        browserify = require('browserify'),
        watchify = require('watchify'),
        babelify = require('babelify'),
        bsServer = require('browser-sync').create(),
        chokidar = require('chokidar'),
        colors = require('colors/safe')
        less = require('less');

    grunt.initConfig({
        pkg: grunt.file.readJSON(`${__dirname}/package.json`)
    });

    grunt.registerTask('clean', function() {
        let done = this.async(),
            paths = grunt.file.expand(`${PUBLIC_PATH}/js/dest/*.js`),
            start = Date.now(),
            finish;

        paths.forEach((path) => {
            grunt.file.delete(path);
        });
        finish = Date.now();
        grunt.log.writeln('Deleted files and folders:\n', paths.join('\n'));
        grunt.log.writeln(colors.green(`Task ${this.name} finished in ${(finish - start) / 1000} s`));
        done();
    });

    grunt.registerTask('connect', function() {
        // start the Browsersync server
        bsServer.init({
            port: 3000,
            server: {
                baseDir: PUBLIC_PATH,
                index: 'index.html'
            },
            open: false
        });
    });
    grunt.registerTask('compile', function() {
        let done = this.async();

        browserify({
            basedir: '.',
            entries: grunt.file.expand(`${PUBLIC_PATH}/js/src/app.js`)
        }).transform(babelify).bundle((err, src) => {
            let path = `${PUBLIC_PATH}/js/dest/bundle.js`;

            grunt.file.write(path, src);
            grunt.log.writeln(`file: ${path} created`);
            done();
        }).on('error', (err) => {
            grunt.log.writeln(err);
            done();
        });
    });

    grunt.registerTask('watch', function() {
        let done = this.async(),
            watcher = chokidar.watch([
                `${PUBLIC_PATH}/index.html`,
                `${PUBLIC_PATH}/js/dest/**/*.js`,
                `${PUBLIC_PATH}/css/*.less`,
                `${PUBLIC_PATH}/css/*.css`
            ]),
            start = Date.now(),
            child,
            b;

        process.on('SIGINT', onProcessExit);

        function onProcessExit() {
            let finish = Date.now();

            grunt.log.writeln(colors.magenta(`\nTask ${grunt.task.current.name} finished in ${(finish - start) / 1000} s`));
            process.exit();
        }

        watcher.on('ready', () => {
            watcher.on('all', (event, file) => {
                switch (true) {

                    // matchBase is provided to match filenames with slashes, eg.: path/to/file.js
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.html', file):
                        bsServer.reload();
                        break;
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.js', file) && event !== 'unlink':
                        bsServer.reload();
                        break;
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.css', file) && event !== 'unlink':
                        bsServer.reload();
                        break;
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.less', file) && event !== 'unlink':
                        let paths = grunt.file.expand(`${PUBLIC_PATH}/css/*.less`),
                          css = '';
                        paths.forEach((path) => {
                          less.render(fs.readFileSync(path, {encoding: 'utf8'}))
                            .then((data) => {
                              css += data.css;
                              fs.writeFileSync(`${PUBLIC_PATH}/css/style.css`, css);
                            });
                        });
                        break;
                }
            });
        });

        b = browserify({
            basedir: '.',
            entries: grunt.file.expand(`${PUBLIC_PATH}/js/src/app.js`),
            cache: {},
            packageCache: {}
        })
        .plugin(watchify)
        .transform(babelify, {
            presets: ['es2015']
        })
        .on('update', bundle);

        bundle();

        function bundle() {
            let startBundle = Date.now();

            b.bundle((err, src) => {
                let startClean = Date.now();

                child = grunt.util.spawn({
                    grunt: true,
                    args: ['clean']
                }, (err, result, code) => {
                    let path = `${PUBLIC_PATH}/js/dest/bundle.js`,
                        finishClean = Date.now(),
                        finishBundle;

                    grunt.log.writeln(colors.green(`Task clean finished in ${(finishClean - startClean) / 1000} s`));
                    grunt.file.write(path, src);
                    finishBundle = Date.now();
                    grunt.log.writeln(colors.green(`Browserify bundle finished in ${(finishBundle - startBundle) / 1000} s`));
                });
            })
            .on('error', (err) => {
                grunt.log.writeln(colors.red(err));
            });
        }
    });

    grunt.registerTask('dev', ['connect', 'watch']);
};
