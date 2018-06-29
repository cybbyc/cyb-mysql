/*
* mysqlDb模块text
*
* */

const express = require("express");
const mysqldb = require("../libs/mysqlDb");
const app = express();

app.get("/",function (req, res) {
    res.send('.11111111111111111');
})

app.get("/insert",function (req, res) {
    let sql = "insert into user(name,age,other) values(?,?,?)";
    let data = ['阿萨德','23','录给我二号'];
    mysqldb.MysqlFun(sql,data,function (result) {
        console.log(result);
        res.send("插入成功");
    })
});

app.get("/update",function (req, res) {
    let sql = "update user set name='cyb',age=5,other='呃呃呃呃呃' where id=10";
    mysqldb.MysqlFun(sql,function (result) {
        console.log(result);
        res.send("修改成功");
    })
});


app.get("/delete",function (req, res) {
    let sql = "delete from user where id = 11";
    mysqldb.MysqlFun(sql,function (result) {
        console.log(result);
        res.send("删除成功");
    })
});

app.listen(8088);
