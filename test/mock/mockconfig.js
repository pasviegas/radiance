
function violations(artifact){
	return {
		name: "violations",
		from: "http://s028:9000/api/resources?resource=" + artifact + "&amp;metrics=violations_density",
		source: "sonar",
		threshold: "90",
	}
}

function travis(user, projectName){
	return {
		name: "build",
		from: "https://api.travis-ci.org/repos/" + user + "/" + projectName + ".json",
		source: "travis",
		threshold: "100",
	}
}

function build(projectName){
	return {
		name: "build",
		from: "http://s028:8080/job/" + projectName + "/api/json",
		source: "jenkins",
		threshold: "100",
	}
}

function coverage(artifact){
	return {
		name: "coverage",
		from: "http://s028:9000/api/resources?resource=" + artifact + "&amp;metrics=coverage",
		source: "sonar",
		threshold: "70",
	}
}

function radiator(projectName, artifact, mock){
	return {
		name: projectName,
		metrics: [build(projectName, mock),
				  coverage(artifact, mock),
				  violations(artifact, mock)]
	}
}

module.exports.violations = violations;
module.exports.travis = travis;
module.exports.build = build;
module.exports.coverage = coverage;
module.exports.radiator = radiator;