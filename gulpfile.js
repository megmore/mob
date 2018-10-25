/**
 * Created by nocoolyoyo on 2018/6/6.
 */

const gulp = require('gulp'),
		smushit = require('gulp-smushit');
const themeAssetsPath = 'src/theme/default/assets';

gulp.task('min-assets', function () {
	gulp.src(themeAssetsPath + '/*.{png,jpg,gif,ico}')
		.pipe(smushit({
			verbose: true
		}))
		.pipe(gulp.dest(themeAssetsPath));
})

gulp.task('default', ['min-assets'])



