function createDummyData(keywordCount, callback) {
    /*for(var k = 0; k < keywordCount; k++) { 
        var f = function(val) { 
            localDb.transaction(function(tr) {  
                tr.executeSql("INSERT INTO keywords (text, text, text, text, int) VALUES ('" + val + "', 'Característica " + Math.round(Math.random() * 3) + "', '" + val + "', 'dummy', 999)");
            });
        };
        f(k);
     };*/

    localDb.transaction(function(tr) {  
        tr.executeSql("INSERT INTO keywords (text, text, text, text, int) VALUES ('5', 'Característica 6', '7', 'dummy', 999)");
    });

    if(typeof callback !== "undefined") {
        callback();    
    }
}