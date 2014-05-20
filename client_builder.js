function createIndexedButtonPanel() {
	localDb.transaction(function (tr) {
		tr.executeSql("SELECT DISTINCT search_attr FROM keywords", [], function(tr, results){
			console.log(results);
		});
    });
}