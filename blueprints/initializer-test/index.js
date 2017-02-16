const testInfo = require('ember-cli-test-info');
const stringUtils = require('ember-cli-string-utils');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates an initializer unit test.',

	locals(options) {
		return {
			friendlyTestName: testInfo.name(options.entity.name, 'Unit', 'Initializer'),
			dasherizedModulePrefix: stringUtils.dasherize(options.project.config().modulePrefix),
		};
	},
});
