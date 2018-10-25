/**
 * Created by nocoolyoyo on 2018/6/7.
 */
let packageJson = require('./package.json')
const fs = require('fs')

function copyFile(from, to) {
	fs.writeFileSync(to, fs.readFileSync(from));
}

packageJson.devDependencies = {}
packageJson.scripts = {}
packageJson = JSON.stringify(packageJson, null, 2)
fs.writeFileSync(
	'package/package.json', packageJson,(err) => {
		if (err) throw err;
	}
);
//复制readMe
copyFile('README.MD', 'package/README.MD');