function setupAnchoredScroll(container) {
	setupPosition(container, getPosition(container));
	setupAnchors(container, getPosition(container));

	updateAnchors(container);
}

function getPosition(container) {
	var top = $(container).offset().top;
	var height = $(window).innerHeight();
	$(container).siblings().each(function(index, element){
		height -= $(element).outerHeight(true);
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
		updateAnchors(container);
	});
}

function setupAnchors(container, position) {
	var upperAnchors = $("<div class='anchors upper'></div>");
	var lowerAnchors = $("<div class='anchors lower'></div>");

	$(upperAnchors).css({position: "fixed", left: "0px", top: position.top + "px", width: $(container).width() - 15 + "px"});
	$(lowerAnchors).css({position: "fixed", left: "0px", bottom: position.bottom + "px", width: $(container).width() - 15 + "px"});

	$(container).children("h1").each(function(index, element){
		var anchor = element;

		$(element).click(function(){
			jumpToAnchor(container, element, index + 1);
		});

		$(upperAnchors).append($(anchor).clone().click(function(){
			jumpToAnchor(container, element, index + 1);
		}));

		$(lowerAnchors).append($(anchor).clone().click(function(){
			jumpToAnchor(container, element, index + 1);
		}));
	});

	$(upperAnchors).children().hide();
	$(lowerAnchors).children().hide();

	$(container).append(upperAnchors).append(lowerAnchors);
}

function updateAnchors(container) {
	$(container).children("h1").each(function(index, searchAttr){
		var sAIndex = index + 1;
		var sAHeight = $(searchAttr).outerHeight(true);
		var sAPosition = $(searchAttr).position().top - $(container).offset().top;

		var cHeight = $(container).innerHeight();
		var scrolledArea = $(container).scrollTop();

		if(sAPosition < index * sAHeight) {
			$(container).find(".anchors.upper").children(":nth-child(" + sAIndex + ")").show();
		} else if(sAPosition > cHeight - ($(container).children("h1").length - sAIndex) * sAHeight) {
			$(container).find(".anchors.lower").children(":nth-child(" + sAIndex + ")").show();
		} else {
			$(container).find(".anchors.upper").children(":nth-child(" + sAIndex + ")").hide();
			$(container).find(".anchors.lower").children(":nth-child(" + sAIndex + ")").hide();
		}
	});
}

function jumpToAnchor(container, searchAttr, sAIndex) {
	var sAPosition = $(searchAttr).position().top - $(container).offset().top;
	var sAHeight = $(searchAttr).outerHeight(true);

	var cScrollHeight = $(container)[0].scrollHeight;

	var targetScroll = $(container).scrollTop() + sAPosition - (sAIndex - 1) * sAHeight;
	
	$(container).animate({scrollTop: targetScroll}, 400, "swing", function() {
		updateAnchors(container);
	});
}

function pixelToInt(px) {
	var integer = parseInt(px.slice(0, -2));

	return integer;
}