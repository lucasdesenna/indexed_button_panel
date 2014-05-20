var localDb;

function setupLocalDb(callback) {
    var shortName = 'localdb';
    var version = '1.0';
    var displayName = 'Local Database';
    var maxSize = 65536; // in bytes
    localDb = openDatabase(shortName, version, displayName, maxSize, callback);

    localDb.transaction(function (tr) {
        tr.executeSql("CREATE TABLE IF NOT EXISTS keywords (id text PRIMARY KEY, search_attr text, name text, type text, count int)");
        console.log("localDb criado");
    });
    if(typeof callback !== "undefined") {
        callback();    
    }
}