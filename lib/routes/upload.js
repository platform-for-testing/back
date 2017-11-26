const path = require('path');
const fs = require('fs');
const glob = require('glob');

class Upload {
	constructor(db, logger, config) {
		this.db = db;
		this.logger = logger;
		this.config = config;
	}

	async uploadQuizBg(ctx) {
		const filePath = './' + ctx.request.body.files.upload.path;
		const fileId = ctx.request.body.fields.id;
		const fileFormat = 'quiz-image';
		const fileName = fileFormat + '_' + fileId;
		const contentType = ctx.request.body.files.upload.type;

		if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/jpg') {
			fs.unlink(filePath);
			return ctx.res.status(400).send('Unsupported file type. Expected: png, jpeg, jpg');
		}

		if (ctx.request.body.files.upload.size > this.config.maxFileSize) {
			fs.unlink(uploadedFilePath);
			return ctx.res.status(400).send('Oversized file. Max size 20Mb');
		}

		await uploadFile(ctx, fileName, filePath);
	}

	async uploadQuestionImg(ctx) {
		const filePath = './' + ctx.request.body.files.upload.path;
		const fileId = ctx.request.body.fields.id;
		const fileFormat = 'question-image';
		const fileName = fileFormat + '_' + fileId;
		const contentType = ctx.request.body.files.upload.type;

		if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/jpg') {
			fs.unlink(filePath);
			return ctx.res.status(400).send('Unsupported file type. Expected: png, jpeg, jpg');
		}

		if (ctx.request.body.files.upload.size > this.config.maxFileSize) {
			fs.unlink(uploadedFilePath);
			return ctx.res.status(400).send('Oversized file. Max size 20Mb');
		}

		await uploadFile(ctx, fileName, filePath);
	}

	async uploadQuestionVideo(ctx) {
		const filePath = './' + ctx.request.body.files.upload.path;
		const fileId = ctx.request.body.fields.id;
		const fileFormat = 'question-image';
		const fileName = fileFormat + '_' + fileId;
		const contentType = ctx.request.body.files.upload.type;

		if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/jpg') {
			fs.unlink(filePath);
			return ctx.res.status(400).send('Unsupported file type. Expected: png, jpeg, jpg');
		}

		if (contentType !== 'video/m4v' && contentType !== 'video/avi' && contentType !== 'video/mpg' && contentType !== 'video/mp4') {
			fs.unlink(uploadedFilePath);
			return ctx.res.status(400).send('Unsupported file type. Expected: m4v, avi, mpg, mp4');
		}

		await uploadFile(ctx, fileName, filePath);
	}

	async uploadFile(ctx, name, path) {
		return new Promise((resolve, reject) => {
			const fileExtension = path.substring(path.lastIndexOf(".") + 1);
			const contentType = ctx.request.body.files.upload.type;

			glob('./uploads/' + name + '.*', function (error, files) {
				if (error) ctx.throw(400, 'Uploading error');

				if (files.length) fs.unlinkSync(files[0]);

				fs.rename(path, './uploads/' + name + '.' + fileExtension, function (err) {
					if (err) ctx.throw(400, 'Renaming error.');;

					console.log('rename complete');
					//console.log(ctx.res)
					console.log(ctx.request.body);
					//ctx.response.writeHead(200, {'Content-Type': 'text/plain'});
					ctx.res.statusCode = 200;
					return ctx.res.end('OK');
				});
			})
		});
	}
}

module.exports = Upload;