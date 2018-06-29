
/*
*  2018.06.29(完整版)
*  加强版的mysql操作函数封装（直连操作）------ 可以使用
*  每个函数传进的是要操作的参数，sql语句将在函数内部组成
*  该模块支持mysql的增删改查，而且也只暴露了这四个接口：Insert\Update\Select\Delete
*
*  使用前请先安装 mysql 模块
*
* */
const mysql = require("mysql");
var setting = require('../../../mysqlSetting'); //文件创建在用户根目录


//连接数据库,返回一个连接对象
function __connect(callback) {
    //数据库配置
    const connection = mysql.createConnection(setting);
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
function __query(sql, callback) {
    __connect(function (conn) {
        conn.query(sql,function (err, result) {
            if(err){
                console.log('sqlopt error:'+err);
                __end(conn);
                return;
            }
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

/*
* 插入数据
* 参数：
*   tablename：要插入数据的表名，string
*   json：要插入的json类型数据，其中的属性名必须与数据库字段名对应
*   callback：异步操作的回调函数，带有一个参数result数据库操作返回结果
*
* */
exports.Insert = function (tablename,json,callback) {
    if(arguments.length != 3){
        throw new Error("Insert函数必须带三个参数，请认真查看使用说明");
        return;
    }
    //用于存放name和value列表的数组
    let names = '',values = '';
    for(k in json){
        names  += k;
        names += ',';
        values +='"'+json[k]+'",';
    }
    //去掉末尾的逗号
    names = names.replace(/,$/,'');
    values = values.replace(/,$/,'');
    //拼接sql语句
    let sql = 'insert into '+tablename+'('+names+') '+' values('+values+')';
    console.log(sql);
    //分解json对象
    __query(sql,function (result) {
        callback(result);
    });
};

/*
* 查询数据
* 参数：
*  tableName:要操作的表名称
*  prama2:可选，查询条件，string
*  prama3:可选，限制查找、排序，json   ,包含三个属性:page、limit、order分别表示第几页、每页的查询数目、排序规则
*               tip：如果要使用分页，page、limit这两个属性应该都要有
*  prama4:必选，callback,返回操作结果
*  tip:第二、三个参数可按照实际情况省略
*
* */
exports.Select = function(tableName,prama2,prama3,prama4){
    let callback,where='',ops={page:1,limit:0};
    if(arguments.length == 2 ){
        callback = prama2;
    }else if(arguments.length == 3){
        callback = prama3;
        //    判断是字符串还是对象
        if(typeof prama2 == "string"){
            console.log("第二个是字符串");
            where = prama2;
        }else{
            console.log("第二个是对象");
            ops = prama2;
        }
    }else if(arguments.length==4){
        callback = prama4;
        ops = prama3;
        where = prama2;
    }else{
        throw new Error("Select函数必须带2~4个参数,请认真查看使用说明");
        return;
    }
    let sql = 'select * from '+tableName;
    let whereSql = ' where '+where;
    let limitSql = ' limit '+(ops.page)*ops.limit+','+ops.limit;
    let orderSql = ' ORDER BY '+ops.order;
    if(where != ''){
        sql +=whereSql;
    }
    //先拼接orderby
    if(ops.order){
        sql +=orderSql;
    }
    //最后拼接limit
    if(ops.limit){
        sql +=limitSql;
    }
    //分解json对象
    __query(sql,function (result) {
        callback(result);
    });

};

/*
* 更新数据
* 参数：
*   tableName:要操作的数据表名称
*   where:修改的数据条件选择，string
*   json:要修改的内容json，属性名要和数据库的字段名相同
*   callback:回调函数，返回修改后的结果
*
* */

exports.Update = function (tableName,where,json,callback) {
    if(arguments.length !=4){
        throw new Error("Update函数必须带四个参数,请认真查看使用说明");
        return;
    }
    //用于接受json分解成的k=v的形式数组
    jsonStr = '';
    for(k in json){
        jsonStr +=k+'="'+json[k]+'",';
    }
    //去掉末尾的逗号
    jsonStr = jsonStr.replace(/,$/,'');
    //拼接sql语句
    let sql = 'update '+tableName+' set '+jsonStr+' where '+where;
    console.log(sql);

    __query(sql,function (result) {
        callback(result);
    });
};


/*
* 删除数据
* 参数：
*   tableName:要操作的数据表名称
*   where:删除的条件，string
*   callback:回调函数，返回操作结果
*
*
* */
exports.Delete = function (tableName, where, callback) {
    if(arguments.length !=3){
        throw new Error("Delete函数必须有三个参数,请认真查看使用说明");
        return;
    }
    //拼接sql语句
    let sql = 'delete from '+tableName+' where '+where;
    console.log(sql);

    __query(sql,function (result) {
        callback(result);
    });
}