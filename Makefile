clear:
	@rm -rf lib-cov && rm -rf coverage

mkdir:
	@mkdir coverage

test: clear jscoverage
	@./node_modules/.bin/mocha

travis-cov: clear jscoverage
	@./node_modules/.bin/mocha --reporter travis-cov

test-cov: clear jscoverage
	@./node_modules/.bin/mocha --reporter html-cov > coverage/coverage.html

test-lcov: clear jscoverage
	@./node_modules/.bin/mocha --reporter mocha-lcov-reporter > coverage/coverage.lcov

test-xunit: clear jscoverage
	@./node_modules/.bin/mocha --reporter xunit > coverage/TEST-all.xml

jscoverage: mkdir
	@./node_modules/visionmedia-jscoverage/jscoverage lib lib-cov

sonar: clear jscoverage test-lcov test-xunit
	@sonar-runner

.PHONY: clear test test-cov test-lcov test-xunit jscoverage sonar travis-cov