/**
 * Since AutoBlog uses some Ajax-y gallery loader, there's not much we can do
 * but naïvely, periodically check for the content we're looking for.
 */

var AutoBlug = {
	button: null,
	currentUrl: null,
	tick: 0,

	queueGalleryCheck: function() {
		setTimeout(AutoBlug.checkGallery, 1000);
	},

	checkGallery: function() {
		var li = $(".gallery li.active");

		if (li.length > 0) {
			li = $(li[0]);
		} else {
			return AutoBlug.queueGalleryCheck();
		}

		if (!li.css) return AutoBlug.queueGalleryCheck();
		var url = (li.css("backgroundImage") || "").match(/url\((.*)\)/i);
		if (!url || url.length < 2) return AutoBlug.queueGalleryCheck();
		url = url[1];

		if (url == AutoBlug.currentUrl && AutoBlug.tick < 10) {
			AutoBlug.tick++;
			return AutoBlug.queueGalleryCheck();
		} else {
			AutoBlug.tick = 0;
		}
		
		AutoBlug.currentUrl = url;
		AutoBlug.updateButton(url);
		AutoBlug.setupThumbnailListener();
	},

	createButton: function() {
		AutoBlug.button = $("<a id='autoblug-button' target='_blank'>Direct Image Link</a>");
		var actions = $("<div class='autoblug-actions'></div>").append(AutoBlug.button);
		$("#gallery_wallpaper").before(actions);
	},

	updateButton: function(url) {
		if (!AutoBlug.button) AutoBlug.createButton();
		AutoBlug.button.attr("href", url);
	},

	setupThumbnailListener: function() {
		$(".thumbnails").on("click", "li", function(event) {
			AutoBlug.queueGalleryCheck();
		});
	}
};

AutoBlug.queueGalleryCheck();
