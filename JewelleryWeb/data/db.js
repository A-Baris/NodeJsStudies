const myssql12 = require("mysql2");
const config = require("../config");

let connection = myssql12.createConnection(config.db);

connection.connect((err)=>{
    if(err){
        return console.log(err);
    }
    console.log("veritabanı bağlantısı başarılı");
});
module.exports = connection.promise();