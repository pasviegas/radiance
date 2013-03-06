clear:
	@rm -rf lib-cov && rm -rf coverage

mkdir:
	@mkdir coverage

test:
	@./node_modules/.bin/mocha

travis-cov:
	@./node_modules/.bin/mocha --reporter travis-cov

test-cov:
	@./node_modules/.bin/mocha --reporter html-cov > coverage/coverage.html

test-lcov:
	@./node_modules/.bin/mocha --reporter mocha-lcov-reporter > coverage/coverage.lcov

test-xunit:
	@./node_modules/.bin/mocha --reporter xunit > coverage/TEST-all.xml

jscoverage: mkdir
	@./node_modules/visionmedia-jscoverage/jscoverage lib lib-cov

sonar: clear jscoverage test-lcov test-xunit
	@sonar-runner

.PHONY: clear test test-cov test-lcov test-xunit jscoverage sonar travis-cov