const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

class DatabaseConnection{
    constructor(){
        var con = mysql.createConnection({
            host: "localhost",
            user: "rushi",
            password: "Rushi_1192#",
            database: "travelsystem"
        });
        return con;
    }
}   
      
    //   con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //   });

app.use(express.static(__dirname+"/templates/"));

app.get('/',function (req, res){
    res.sendFile(path.join(__dirname+"/templates/home.html"));
})

app.post('/', urlencodedParser,function (req, res) {
    var dc = new DatabaseConnection();

    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var sql = "INSERT INTO contact VALUES ('"+name+"','"+email+"','"+mobile+"');";

    dc.connect(function(err) {
        if (err) throw err;
            console.log("Connected!");
        dc.query(sql, function(err,result) {
            if (err) throw err;
            console.log("record is inserted");
        });
    });
    
    console.log('name:-'+name);
    console.log('mobile:-'+email);
    console.log('mobile:-'+mobile);
    // console.log(req.body)
    // res.sendFile(path.join(__dirname+'/main.html'))
    res.send('<script> alert("We have received your request.Our executive will call you shortly.");window.location = "/"</script>');
})

app.listen(3000)