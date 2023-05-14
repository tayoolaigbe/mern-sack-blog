import fs from 'fs';
import path from 'path';

export const fileRemover = filename => {
	fs.unlink(path.join(__dirname, '../uploads'), function (err) {
		if (err && err.code === 'ENOENT') {
			// file doesnt exist
			console.log(`File ${filename} does not exist`);
		} else if (err) {
			console.log(`Error occured while trying to remove file: ${filename}`);
		} else {
			console.log(`Removed ${filename}`);
		}
	});
};
