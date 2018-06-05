"use strict"

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		part: "snippet",
		key: "AIzaSyBZcoFcX2hjtIRehNbhQyocEprrx2cOAfM",
		q: `${searchTerm}`,
		maxResults: "5",
		type: "video",
		order: "viewCount"
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
	return `
	<div>
	<h2>${result.snippet.title}</h2>
	<iframe src="https://www.youtube.com/embed/${result.id.videoId}/${result.snippet.thumbnails.medium.url}"></iframe>
	//need help getting the thumbnails right
	</div>`;
}

function displayYouTubeSearchData(data) {
	const results = data.items.map((item, index) => renderResult(item));
	$(".js-search-results").html(results);
}

function watchSubmit() {
	$(".js-search-form").submit(function () {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find(".js-query");
		const query = queryTarget.val();
		queryTarget.val("");
		getDataFromApi(query, displayYouTubeSearchData);
	});
}

$(watchSubmit);