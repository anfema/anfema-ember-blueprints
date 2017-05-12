const fs = require('fs');
const path = require('path');
const VersionChecker = require('ember-cli-version-checker');

module.exports = function (blueprint) {
	blueprint.supportsAddon = function () {
		return false;
	};

	blueprint.filesPath = function () {
		let type;

		const dependencies = this.project.dependencies();

		if ('ember-cli-qunit' in dependencies) {
			type = 'qunit';
		} else if ('ember-cli-mocha' in dependencies) {
			const checker = new VersionChecker({ project: this.project });

			if (fs.existsSync(`${this.path}/mocha-0.12-files`) && checker.for('ember-cli-mocha', 'npm').satisfies('>=0.12.0')) {
				type = 'mocha-0.12';
			} else {
				type = 'mocha';
			}
		} else {
			this.ui.writeLine('Couldn\'t determine test style - using QUnit');
			type = 'qunit';
		}

		return path.join(this.path, `${type}-files`);
	};

	return blueprint;
};
