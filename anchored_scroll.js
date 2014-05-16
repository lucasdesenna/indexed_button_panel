function setupAnchoredScroll(container) {
	var position = getPosition(container);

	setupPosition(container, position);
	setupAnchors(container, position);

	$(container).children("h1").each(function(index, element){
		updateAnchor(element, index, container);
	});
}

function getPosition(container) {
	var top = $(container).offset().top;
	var height = $(window).innerHeight();
	$(container).siblings().each(function(index, element){
		height -= $(element).outerHeight();
	});

	var bottom = $(window).innerHeight() - top - height;

	var position = {top: top, height: height, bottom: bottom};

	return position;
}

function setupPosition(container, position) {
	$(container).css({height: position.height + "px"});

	$(window).resize(function(){
		$(container).css({height: getPosition(container).height + "px"});
	});

	$(container).scroll(function(){
		$(container).children("h1").each(function(index, element){
			updateAnchor(element, index, container, position);
		});
	});
}

function setupAnchors(container, position) {
	var upperAnchors = $("<div class='anchors upper'></div>");
	var lowerAnchors = $("<div class='anchors lower'></div>");

	$(upperAnchors).css({position: "fixed", left: "0px", top: position.top + "px", width: $(container).width() - 15 + "px"});
	$(lowerAnchors).css({position: "fixed", left: "0px", bottom: position.bottom + "px", width: $(container).width() - 15 + "px"});

	$(container).children("h1").each(function(index, element){
		var anchor = element;

		$(upperAnchors).append($(anchor).clone().click(function(){
			jumpToAnchor(container, element, index);
		}));

		$(lowerAnchors).append($(anchor).clone().click(function(){
			jumpToAnchor(container, element, index);
		}));
	});

	$(upperAnchors).children().hide();
	$(lowerAnchors).children().hide();

	$(container).append(upperAnchors).append(lowerAnchors);
}

function updateAnchor(anchor, index, container) {
	var aIndex = index + 1;
	var aHeight = $(anchor).outerHeight();
	var cHeight = $(container).height();

	var aPosition = $(anchor).position().top - $(container).offset().top;
	var scrolledArea = $(container).scrollTop();

	if(aPosition < index * aHeight) {
		$(container).find(".anchors.upper").children(":nth-child(" + aIndex + ")").show();
	} else if(aPosition > cHeight - ($(container).children("h1").length - index) * aHeight) {
		$(container).find(".anchors.lower").children(":nth-child(" + aIndex + ")").show();
	} else {
		$(container).find(".anchors.upper").children(":nth-child(" + aIndex + ")").hide();
		$(container).find(".anchors.lower").children(":nth-child(" + aIndex + ")").hide();
	}
}

function jumpToAnchor(container, anchor, anchorIndex) {
	var ePosition = $(anchor).position().top;
	var eHeight = $(anchor).outerHeight();

	$(container).animate({scrollTop: ePosition - (anchorIndex + 1) * eHeight}, 400);
}

function pixelToInt(px) {
	var integer = parseInt(px.slice(0, -2));

	return integer;
}