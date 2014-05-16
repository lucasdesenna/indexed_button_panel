function setupAnchoredScroll(container) {
	var top = $(container).offset().top;
	$(container).css({height: $(window).innerHeight() - top + "px"});

	$(window).resize(function(){
		$(container).css({height: $(window).innerHeight() - top + "px"});
	});

	var upperAnchors = $("<div class='anchors upper'></div>");
	$(upperAnchors).css({position: "fixed", left: "0px", top: top + "px", width: $(container).width() + "px"});

	var lowerAnchors = $("<div class='anchors lower'></div>");
	$(lowerAnchors).css({position: "fixed", left: "0px", bottom: $(window).height() - top - (container).height() + "px", width: $(container).width() + "px"});

	$(container).scroll(function(){
		$(container).children("h1").each(function(index, element){
				toggleAnchor(element, index, container, top);
		});
	});

	$(container).children("h1").each(function(index, element){
		var ePosition = $(element).position().top;
		var eHeight = $(element).outerHeight("true");

		$(upperAnchors).append($(element).clone().click(function(){
			$(container).animate({scrollTop: ePosition - (index + 1) * eHeight}, 400);
		}));
		$(lowerAnchors).append($(element).clone().click(function(){
			$(container).animate({scrollTop: ePosition - (index + 1) * eHeight}, 400);
		}));
	});

	$(upperAnchors).children().hide();
	$(lowerAnchors).children().hide();

	$(container).append(upperAnchors).append(lowerAnchors);

	$(container).children("h1").each(function(index, element){
		toggleAnchor(element, index, container, top);
	});
}

function toggleAnchor(target, index, container, top) {
	var tIndex = index + 1;
	var tHeight = realHeight(target);
	var cHeight = $(container).height();

	var tPosition = $(target).position().top - top;
	var scrolledArea = $(container).scrollTop();

	if(tPosition < index * tHeight) {
		$(container).find(".anchors.upper").children(":nth-child(" + tIndex + ")").show();
	} else if(tPosition > cHeight - ($(container).children("h1").length - index) * tHeight) {
		$(container).find(".anchors.lower").children(":nth-child(" + tIndex + ")").show();
	} else {
		$(container).find(".anchors.upper").children(":nth-child(" + tIndex + ")").hide();
		$(container).find(".anchors.lower").children(":nth-child(" + tIndex + ")").hide();
	}
}

function pixelToInt(px) {
	var integer = parseInt(px.slice(0, -2));

	return integer;
}