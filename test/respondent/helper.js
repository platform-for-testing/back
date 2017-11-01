const fs = require('fs');

const respondentSampleFirst = JSON.parse(fs.readFileSync('test/respondent/respondent-test-data.json', 'utf8'));
const respondentSampleSecond = JSON.parse(fs.readFileSync('test/respondent/respondent-test-data-second.json', 'utf8'));
const respondentSampleThird = JSON.parse(fs.readFileSync('test/respondent/respondent-test-data-third.json', 'utf8'));

class Helper {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger;
	}

	async initHelper() {
		await this.setupRespondents();
	}

	async cleanHelper() {
		await this.removeCollection('respondent');
	}

	async removeCollection(collection) {
		this.logger.info('removeRespondents');
		await this.db.removeCollection(collection);
	}

	async setupRespondents() {
		this.logger.info('setupRespondents');
		await this.db.create('respondent', respondentSampleFirst);
		await this.db.create('respondent', respondentSampleSecond);
		await this.db.create('respondent', respondentSampleThird);
	}
}

module.exports = Helper;
