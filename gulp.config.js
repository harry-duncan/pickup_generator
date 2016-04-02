module.exports = function () {
    var client = "./src/client/";
    var server = "./src/server/";
    var dist = './dist/';
    var styles = client + 'scss/';
    var config = {
            /**
             * File paths
             */
            // all javascript that we want to vet
            src: "./src/",
            alljs: [
                client + '**/*.js',
                './src/**/*.js'
            ],
            js: {
                client: client + '**/*.js',
                server: server + '**/*.js'
            },
            html : client + "**/*.html",
            styles: {
                root: styles,
                main: styles + 'main.scss',
                layout: styles + 'layout/*.scss',
                components: styles + 'components/*.scss',
                base: styles + 'base/*.scss',
                all: [styles + '**/*.scss'], 
            },
            assets: {
                images: client + 'img/**/*',
                fonts: client + 'fonts/**/*'
            },
            dist: {
                root: dist,
                styles: dist + "styles/**/*.scss",
                js: dist + "**/*.js",
                html: dist +"**/*.html"
            },
            out: {
                root: dist,
                styles: dist + "client/styles/",
                js: dist + "client/js/"
            }
    };
    console.log(config.styles.main)
    return config;
};