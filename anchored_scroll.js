function createIndexedButtonPanel(target, clientData, buttonCap) {
	buttonCap = typeof buttonCap !== 'undefined' ? buttonCap : 200;

	for(var sA in clientData) {
		var header = $("<header class='searchAttribute'></header>");

		var attrName = sA[0].toUpperCase() + sA.slice(1);
		var title = $("<h1>" + attrName + "</h1>");

		var buttonCount;
		if(clientData[sA].length <= buttonCap) {
			buttonCount = clientData[sA].length;
		} else {
			buttonCount = buttonCap;
		}
		var counter = $("<span>(" + buttonCount + "/" + clientData[sA].length + ")</span>");

		$(header).append(title).append(counter);

		var tnkList = clientData[sA];
		var panel = $("<ul id='" + sA + "' class='searchAttribute'></ul>");
		var tknName;
		var button;

		for(var tkn = 0; tkn < buttonCap; tkn++) {
			tknName = tnkList[tkn].name.slice(0, 10);
			button = $("<li>" + tknName + "</li>");
			$(panel).append(button);
		}

		$(target).append(header).append(panel);
	}
}

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
		updateAnchors(container);
	});

	$(container).scroll(function(){
		updateAnchors(container);
	});
}

function setupAnchors(container, position) {
	var upperAnchors = $("<div class='anchors upper'></div>");
	var lowerAnchors = $("<div class='anchors lower'></div>");
	var scrollBarWidth = 17;

	$(upperAnchors).css({position: "fixed", left: "0px", top: position.top + "px", width: $(container).width() - scrollBarWidth + "px"});
	$(lowerAnchors).css({position: "fixed", left: "0px", bottom: position.bottom + "px", width: $(container).width() - scrollBarWidth + "px"});

	$(container).children("header").each(function(index, element){
		var anchor = element;

		$(element).click(function(){
			jumpToAnchor(container, element, index + 1);
		});

		$(upperAnchors).append($(anchor).clone().removeClass().click(function(){
			jumpToAnchor(container, element, index + 1);
		}));

		$(lowerAnchors).append($(anchor).clone().removeClass().click(function(){
			jumpToAnchor(container, element, index + 1);
		}));
	});

	$(upperAnchors).children().hide();
	$(lowerAnchors).children().hide();

	$(container).append(upperAnchors).append(lowerAnchors);
}

function updateAnchors(container) {
	$(".anchors").css("position", "inherit");
	$(container).children("header").each(function(index, header){
		var sAIndex = index + 1;
		var sAHeight = $(header).outerHeight(true);
		var sAPosition = $(header).position().top - $(container).offset().top;

		var cHeight = $(container).innerHeight();
		var scrolledArea = $(container).scrollTop();

		if(sAPosition < index * sAHeight) {
			$(container).find(".anchors.upper").children(":nth-child(" + sAIndex + ")").show();
		} else if(sAPosition > cHeight - ($(container).children("header").length - sAIndex) * sAHeight) {
			$(container).find(".anchors.lower").children(":nth-child(" + sAIndex + ")").show();
		} else {
			$(container).find(".anchors.upper").children(":nth-child(" + sAIndex + ")").hide();
			$(container).find(".anchors.lower").children(":nth-child(" + sAIndex + ")").hide();
		}
	});
	$(".anchors").css("position", "fixed");
}

function jumpToAnchor(container, header, sAIndex) {
	var sAPosition = $(header).position().top - $(container).offset().top;
	var sAHeight = $(header).outerHeight(true);

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