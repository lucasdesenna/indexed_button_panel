function setupFilter(filter, sAttrsContainer) {
    setupAutocomplete(filter);

    $(filter).bind("keyup", function(e) { //BIND SÓ PARA EFEITO DE TESTE
        filterButtons(filter, sAttrsContainer);
        updateAnchors(sAttrsContainer);
    });
}

function setupAutocomplete(filter) {
    var list = $("<ul class='autocomplete'></ul>");
    $(list).hide();

    $(filter).parent().append(list);
}

function updateSuggestions(filter, dependencies) {
    var keyword = replaceSpecialChars($(filter).val());
    var suggestions = getSuggestions(keyword, dependencies);
}

function filterButtons(filter, sAttrsContainer, callback) {
    var keyword = replaceSpecialChars($(filter).val());

    $(sAttrsContainer).find("ul > li").hide();
    $(sAttrsContainer).find("ul > li:contains(" + keyword + ")").show();
    
    if(typeof callback !== "undefined") {
        callback();
    }
}

function showDependants(token, panel, dependencies) {
    $(panel).find("li").hide();

    $(panel).find("#" + token).show();

    var dependants = dependencies[token];
    for(var d = 0; d < dependants.length; d++) {
        $(panel).find("#" + dependants[d]).show();
    }
}

/* NÃO COPIAR DAQUI PARA BAIXO */
function replaceSpecialChars(str) {
    if (typeof str == "string") {
        var specialChars = [
            {val:"a",let:"áàãâä"},
            {val:"e",let:"éèêë"},
            {val:"i",let:"íìîï"},
            {val:"o",let:"óòõôö"},
            {val:"u",let:"úùûü"},
            {val:"c",let:"ç"},
            {val:"",let:"?!()"}
        ];

        var $spaceSymbol = '-';
        var regex;
        var returnString = str.toLowerCase();

        for (var i = 0; i < specialChars.length; i++) {
            regex = new RegExp("["+specialChars[i].let+"]", "g");
            returnString = returnString.replace(regex, specialChars[i].val);
            regex = null;
        }
        return returnString.replace(/\s/g,$spaceSymbol);
    }

    return '';
};