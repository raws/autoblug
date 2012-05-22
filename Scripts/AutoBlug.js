/**
 * Since AutoBlog uses some Ajax-y gallery loader, there's not much we can do
 * but naïvely, periodically check for the content we're looking for.
 */

var AutoBlug = {
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
		
		AutoBlug.createButton(url);
	},

	createButton: function(url) {
		var button = $("<a class='autoblug-image-link' target='_blank'>Image Link</a>").attr("href", url);
		var li = $("<li></li>").append(button);
		var gallery = $(".gallery_controls:first").css("width", "inherit");
		gallery.find("ul:first").css("width", "inherit").prepend(li);
	}
};

AutoBlug.queueGalleryCheck();
