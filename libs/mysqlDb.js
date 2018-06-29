
/*
*  2018.06.29
*  这个mysql操作模块只是将用户传递的sql语句上传，所以只暴露了一个函数 MysqlFun() 接口
*  推荐使用另一个只传递要进行数据库要操作的数据的mysql操作模块 mysqlDbDev.js
*
*
* */

const mysql = require("mysql");

//连接数据库,返回一个连接对象
function __connect(callback) {
    //数据库配置
    const connection = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'055519',
        database:'text',
        port:'3306'
    });
    //连接数据库
    connection.connect(function(err){
        if(err){
            // 打印错误
            console.log('[connect error]:'+err);
            return ;
        }
        console.log('[connect mysql success]');
        callback(connection);
    })
}

//将sql送到数据库执行，返回执行结果
function __query(sql, data, callback) {
    __connect(function (conn) {
        conn.query(sql,data,function (err, result) {
            if(err){
                console.log('insert error:'+err);
                __end(conn);
                return;
            }
            console.log('[insert success],返回结果：');
            console.log(result);
            __end(conn);
            callback(result);
        })
    })
}

//关闭数据库连接
function __end(conn){
    //断开数据库连接
    conn.end(function(err){
        if(err){
            // 打印错误
            console.log('[close mysql error]:'+err);
            return ;
        }
        console.log("close mysql success")
    })
}

//插入
exports.MysqlFun = function (sql,prama2,prama3) {
    console.log(22222222222222);
    let callback,arr;
    if(arguments.length ==2) {
        callback = prama2;
    }else if(arguments.length ==3) {
        callback = prama3;
        arr = prama2;
    }
    __query(sql,arr,function (result) {
        callback(result);
    });
};

// exports.Select = function(sql,prama2,prama3,prama4){
//     let callback,where,ops;
//     if(arguments.length == 2 ){
//         callback = parma2;
//         where = "";
//         ops = {};
//     }else if(arguments.length == 3){
//         callback = prama3;
//         //    判断是字符串还是对象
//         if(typeof prama2 == "string"){
//             console.log("第二个是字符串");
//             where = prama2;
//         }else{
//             console.log("第二个是对象");
//             ops = prama2;
//         }
//     }else if(arguments.length==4){
//         callback = prama4;
//         ops = prama3;
//         where = prama3;
//     }
// }