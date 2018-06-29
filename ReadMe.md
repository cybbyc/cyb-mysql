极简地封装了mysql数据库的增删改查

tip:
    如需使用/text/目录下的测试用例，请安装express框架---用例是基于express框架编写
    然后将数据库配置项改为有效数据库即可


/libs/setting.js中配置数据库信息

安装：
    npm install cyb-mysql

引入：
    const cybMysql = require('cyb-mysql');

四个接口：

    cybMysql.Insert(tablename,json,callback);
        * 参数：
        *   tablename：要插入数据的表名，string
        *   json：要插入的json类型数据，其中的属性名必须与数据库字段名对应
        *   callback：异步操作的回调函数，带有一个参数result数据库操作返回结果

    cybMysql.Select(tableName,prama2,prama3,prama4);
        *  tableName:要操作的表名称
        *  prama2:可选，查询条件，string
        *  prama3:可选，限制查找、排序，json   ,包含三个属性:page、limit、order分别表示第几页、每页的查询数目、排序规则
        *               tip：如果要使用分页，page、limit这两个属性应该都要有
        *  prama4:必选，callback,返回操作结果
        *  tip:第二、三个参数可按照实际情况省略

    cybMysql.Update(tableName,where,json,callback);
        * 参数：
        *   tableName:要操作的数据表名称
        *   where:修改的数据条件选择，string
        *   json:要修改的内容json，属性名要和数据库的字段名相同
        *   callback:回调函数，返回修改后的结果

    cybMysql.Delete(tableName, where, callback);
        * 参数：
        *   tableName:要操作的数据表名称
        *   where:删除的条件，string
        *   callback:回调函数，返回操作结果