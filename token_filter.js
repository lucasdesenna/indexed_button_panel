function setupFilter(filter) {
    //setupAutocomplete(filter);

    $(filter).keyup(function(){
        var input = $(filter).val();
        if(input != "") {
            $("ul.searchAttribute").children().hide();
            $("ul.searchAttribute").children(":contains(" + input + ")").show();
        } else {
            $("ul.searchAttribute").children().show();
        }
    });
}