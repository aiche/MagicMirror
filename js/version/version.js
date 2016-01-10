var version = {
	updateInterval: 600000,
	intervalId: null,
	lastHash: null
}

/**
 * Checks the version and refreshes the page if a new version has been pulled
 */
version.checkVersion = function () {

	$.ajax({
		type: 'GET',
		url: 'api/git',
		success: function (data) {
			if (data && data.gitHash) {
				// if we have no hash yet, set it now
				if (!this.lastHash) {
					this.lastHash = data.gitHash;
				}
				if (this.lastHash !== gitHash) {
					window.location.reload();
					window.location.href = window.location.href;
				}
			}
		},
		error: function () {
		}
	});

}

version.init = function () {

	this.intervalId = setInterval(function () {
		this.checkVersion();
	}.bind(this), this.updateInterval);

}
