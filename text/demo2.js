/*
* mysqlDbDev模块text
*
* */

const express = require("express");
const mysqldb = require("../libs/mysqlDbDev");
const app = express();

app.get("/",function (req, res) {
    res.send('.11111111111111111');
})

app.get("/insert",function (req, res) {
    let data = {name:"xyz",age:40,other:"阿斯蒂芬辩护人"};
    mysqldb.Insert("user",data,function (result) {
        console.log(result);
        res.send("插入成功");
    })
});

app.get("/select",function (req, res) {
    mysqldb.Select("user",'name="阿萨德"',{
        page:1,
        limit:4,
        order:'id desc' //根据id字段降序
    },function (result) {
        console.log(result);
        res.send(result);
    })
});

app.get("/update",function (req, res) {
    mysqldb.Update("user",'id=19',{
        name:"cyb",
        age:100,
        other:'刚刚修改的',
    },function (result) {
        console.log(result);
        res.send(result);
    })
});

app.get("/delete",function (req, res) {
    mysqldb.Delete("user",'id=20',function (result) {
        console.log(result);
        res.send(result);
    })
});

app.listen(8088);
console.log("server is running");