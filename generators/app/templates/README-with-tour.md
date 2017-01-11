# <%=projectName%> 

刚刚生成的项目并不能直接运行,我们需要准备一个mysql环境以及一张表. 

我们可以

```
docker pull mysql
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql
```

在本地简单的启动一个mysql实例用于测试工程

使用软件访问mysql,新建一个database,并在其中建立一张表. 

比如示例里我新建了一个test库,库里有一张user表,内含id,name,age等简单列. 


将项目导入idea,推荐环境是jdk8

我们可以看到项目的分层,可以通过左上角的package与project进行切换

此时我们可以进行DAO代码生成,具体的配置在common-dal module下的两个generatorConfig配置文件中.

> 如果你是第一次运行这个生成,那么一般情况不需要修改这两个文件. 

我们可以使用自带插件或者进入common/dal目录下,运行代码生成

`mvn mybatis-generator:generate`



于是所有步骤都完结了,我们可以搜索RootApplication进行项目运行项目. 
