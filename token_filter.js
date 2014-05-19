function setupFilter(filter) {
    setupAutocomplete(filter);

    $(input).change(function(){
        updateSuggestions(input);
    });
}

function setupAutocomplete(filter) {
    var list = $("<ul class='autocomplete'></ul>");
    $(list).hide();

    $(filter).parent().append(list);
}

function updateSuggestions(filter, dependencies) {
    var input = $(filter).val();
    var suggestions = getSuggestions(input, dependencies);
}

function showDependants(token, panel, dependencies) {
    $(panel).find("li").hide();

    $(panel).find("#" + token).show();

    var dependants = dependencies[token];
    for(var d = 0; d < dependants.length; d++) {
        $(panel).find("#" + dependants[d]).show();
    }
}