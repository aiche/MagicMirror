var version = {
	updateInterval: 100000,
	intervalId: null,
	lastHash: null
}

version.requestVersion = function (handler) {
	$.ajax({
		type: 'GET',
		url: 'api/git',
		success: function (res) {
			var data = JSON.parse(res);
			if (data && data.gitHash) {
				handler(data.gitHash);
			}
		},
		error: function () {
		}
	});
};

/**
 * Checks the version and refreshes the page if a new version has been pulled
 */
version.checkVersion = function () {
	var that = this;
	this.requestVersion(function(gitHash) {
		if (that.lastHash !== gitHash) {
			window.location.reload();
			window.location.href = window.location.href;
		}
	});
}

version.init = function () {

	var that = this;
	this.requestVersion(function(gitHash) {
		that.lastHash = gitHash;
	});

	this.intervalId = setInterval(function () {
		this.checkVersion();
	}.bind(this), this.updateInterval);

}
