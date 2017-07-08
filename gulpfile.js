var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    rev = require('gulp-rev-append'),
    livereload = require('gulp-livereload'),
    postcss = require('gulp-postcss'),
    shortcss = require('postcss-short'),
    autoprefixer = require('autoprefixer'),
    autoreset = require('postcss-autoreset'),
    eslint = require('gulp-eslint');

var htmlOptions = {
  removeComments: true, // 清除HTML注释
  collapseWhitespace: true, // 压缩HTML
  collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
  minifyJS: true, // 压缩页面JS
  minifyCSS: true // 压缩页面CSS
};

var plugins = [
  shortcss,
  autoprefixer({browsers: [
    'last 5 versions',
    '> 0.01%',
  ],
  cascade: false}),
  autoreset({
    reset: {
      margin: 0,
    }
  })
];

gulp.task("js_eslint", function() {
  gulp.src('./src/js/**/*.js')
    .pipe(eslint({
      rules: {
        'strict': 2
      },
      globals: [
        'jQuery',
        '$'
      ],
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(eslint.result(result => {
      console.log(`ESLint result: ${result.filePath}`);
      console.log(`# Messages: ${result.messages.length}`);
      // console.log(JSON.stringify(result.messages));
      console.log(`# Warnings: ${result.warningCount}`);
      console.log(`# Errors: ${result.errorCount}`);
    }))
    // .pipe(eslint.failAfterError());
})

gulp.task('htmlmin', function() {
  gulp.src('./src/tpl/*.html')
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/tpl'));

})

gulp.task('cssmin', function() {
  gulp.src('./src/css/**/*.css')
    .pipe(postcss(plugins))
    .pipe(cssmin({
      // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      // 类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist/css'));

})

gulp.task('jsmin', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(uglify({
      mangle: true, // 类型：Boolean 默认：true 是否修改变量名
      compress: true, // 类型：Boolean 默认：true 是否完全压缩
      // preserveComments: 'all' // 保留所有注释w
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));

})

gulp.task('revhtml', function() {
  gulp.src('./src/index.html')
    .pipe(rev())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
})

gulp.task('copyLibs', function() {
  gulp.src('./src/libs/*')
    .pipe(gulp.dest('./dist/libs/'))
})

gulp.task('mywatch', function() {
  livereload.listen();
  gulp.watch(['./src/js/**/*.js', './src/views/**/*.js', './src/**/*.html', './src/views/*.html'
  , './src/css/**/*.css', './src/index.html', './src/libs/*'],
  ['js_eslint', 'jsmin', 'htmlmin', 'cssmin', 'revhtml', 'copyLibs'],
  function(event){
    console.log(`${event.path} was ${event.type} , running tasks...`);
  })
})
