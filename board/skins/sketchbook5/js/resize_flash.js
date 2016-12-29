jQuery(function($){
	$(".xe_content").each(function(){

 		var outerWidth = $(this).innerWidth();
		if(!outerWidth) return;

		$("iframe, embed, object", this).each(function(){
			var width = $(this).width();
			var height = $(this).height();
			if( !width || width <= outerWidth) return;

			var ratio = outerWidth / width;
			var newHeight = parseInt(height * ratio);

			$(this).width(outerWidth);
			$(this).height(newHeight);
		});

		$("iframe", this).each(
			function(index, elem) {
				elem.setAttribute('allowFullScreen', '');
				elem.setAttribute('webkitallowfullscreen', '');
				elem.setAttribute('mozallowfullscreen', '');
			}
		);

	});
});
