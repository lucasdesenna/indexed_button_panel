function setupFilter(filter) {
    setupSugestionList(filter);

    $(input).change(function(){
        autocomplete(filter);
    });
}

function autocomplete(filter) {
    var input = $(filter).val();
    var sugestions = getSugestions(input);
}

function showDependants(token, panel, dependencies) {
    $(panel).find("li").hide();

    $(panel).find("#" + token).show();

    var dependants = dependencies[token];
    for(var d = 0; d < dependants.length; d++) {
        $(panel).find("#" + dependants[d]).show();
    }
}