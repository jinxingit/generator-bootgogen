

<p align="center">Gogen Spring Boot Project Generator</p>

<p align="center">
  <a href="https://www.npmjs.com/package/generator-bootgogen"><img src="https://img.shields.io/npm/dt/generator-bootgogen.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/generator-bootgogen"><img src="https://img.shields.io/npm/v/generator-bootgogen.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/generator-bootgogen"><img src="https://img.shields.io/npm/l/generator-bootgogen.svg" alt="License"></a>
</p>


本项目为公司内部项目生成npm package repo. 

并不存在敏感数据. 

项目结构脱胎于支付宝的Sofa框架.做了微服务化的修改.  


## 主要功能 

- 聚合了Spring Boot全家桶的基本功能. 
- 自定义package,避免开发将scope重合.
- 仿支付宝Sofa框架的多module分层以及依赖自动解决
- 可选项支持拓展
- Dockerize支持
- 数据访问代码生成
- 自带Resteasy系统间访问示例代码
- 一应俱全的UT/IT/压测配置
- 更多的feature示例代码见公司内部其他示例工程. 


## USAGE

```
brew install node
npm install -g yo
npm install -g generator-bootgogen
# ...
docker pull mysql
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql
# 建表后进入common/dal目录下
mvn mybatis-generator generate
# 即可使用RootApplication启动项目
```

## LICENSE 

[GPLv3](http://choosealicense.com/licenses/gpl-3.0/) 

Copyright (C) 2016 S1ahs3r

enjoy. 
