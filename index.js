"use strict"

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		part: "snippet",
		key: "AIzaSyBZcoFcX2hjtIRehNbhQyocEprrx2cOAfM",
		q: `${searchTerm}`,
		maxResults: "5",
		type: "video",
		order: "viewCount",
    nextPageToken: "next",
    prevPageToken: "prev"
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  let thumb = result.snippet.thumbnails.medium.url;
  let title = result.snippet.title;
  let id = result.id.videoId;
  let channel = result.snippet.channelId;

  return `
	<div>
	<h3>${title}</h3>
	<a href="https://www.youtube.com/watch?v=${id}"><img src="${thumb}"></a>
  <p><a href="https://www.youtube.com/channel/${channel}">Click here</a> for more videos from this channel </p>
	</div><hr>`;   
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