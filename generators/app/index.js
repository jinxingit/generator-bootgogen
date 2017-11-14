'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var dot = '.';
var spl = '/';
var land = '-';
var module_app = 'app';
var module_common_util = 'common.util';
var module_common_dal = 'common.dal';
var module_common_service_referer = 'common.service.referer';
var module_common_service_exporter = 'common.service.exporter';
var module_core_model = 'core.model';
var module_core_service = 'core.service';

var modules = [module_app,module_common_util,module_common_dal,module_common_service_referer,module_common_service_exporter,module_core_model,module_core_service];

var main_java_maven = 'src/main/java';
var res_java_maven = 'src/main/resources';
var test_java_maven = 'src/test/java';
var test_res_maven = 'src/test/resources';

var mavens = [main_java_maven,res_java_maven,test_java_maven,test_res_maven];


var GogenGenerator = module.exports = function GogenGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(GogenGenerator, yeoman.generators.Base);

GogenGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    console.log(chalk.green(
                `    +-+-+-+-+-+-+-+-+-+-+-+-+-+\n` +
                `    | Gogen Project Generator |\n` +
                `    +-+-+-+-+-+-+-+-+-+-+-+-+-+\n` +
        chalk.yellow('\n你可以根据本向导构建出一个基本的Spring Boot项目\n\n更多的自定义需求可以联系 @金鑫 进行添加\n\n')));

    var prompts = [
        {
            type: 'string',
            name: 'projectName and artifactId',
            message: '输入project name (eg:ampmind-service-vehiclebiz 形式,创建在当前目录下):',
            default: 'untitled'
        }, {
            type: 'string',
            name: 'packageName and groupId',
            message: '输入package name (eg:com.ampmind.service.vehiclebiz 形式):',
            default: 'com.ampmind.service.vehiclebiz'
        },{
            type: 'string',
            name: 'proVersion',
            message: '输入项目版本 (x.y.z形式):',
            default: '0.0.1'
        }, {
            type: 'checkbox',
            name: 'optionalItem',
            message: '请勾选可选项 (支持多选):',
            choices: [
                {
                    name: 'redis支持',
                    value: 'redis'
                }, {
                    name: 'mybatis支持',
                    value: 'mongodb'
                }, {
                    name: 'websocket支持',
                    value: 'websocket'
                }, {
                    name: 'pubsub支持',
                    value: 'mail'
                }, {
                    name: 'Thymeleaf支持',
                    value: 'velocity'
                }, {
                    name: 'jwt支持',
                    value: 'jwt'
                }
            ]
        }, {
            type: 'string',
            name: 'bootVersion',
            message: '可选自定义Spring Boot版本:',
            default: '1.5.3.RELEASE'
        }, {
            type: 'string',
            name: 'mysqlConn',
            message: '可选初始化mysql连接 (ip:port:user:pwd:database):',
            default: '127.0.0.1:3306:root:root:test'
        }, {
            type: 'confirm',
            name: 'needSwagger',
            message: '是否需要自动生成接口文档?',
            default: true
        }, {
            type: 'confirm',
            name: 'needGatling',
            message: '是否需要内置Gatling压测框架?',
            default: false
        }, {
            type: 'confirm',
            name: 'supportDocker',
            message: '是否需要支持打包成Docker镜像?',
            default: true
        }, {
            type: 'confirm',
            name: 'needReadme',
            message: '是否需要在README中加入新手文档?',
            default: true
        }
    ];

    this.prompt(prompts, function(props) {

        this.projectName = props.projectName.toLowerCase();
        this.packageName = props.packageName;
        this.proVersion = props.proVersion;
        this.optionalItem = props.optionalItem;
        this.supportDocker = props.supportDocker;
        this.needReadme = props.needReadme;
        this.needSwagger = props.needSwagger;
        this.bootVersion = props.bootVersion;
        this.needGatling = props.needGatling;
        this.mysqlConn = props.mysqlConn;

        var checkOptional = function(item) {
            return props.optionalItem.indexOf(item) !== -1;
        };
        this.redis = checkOptional('redis');
        this.mongodb = checkOptional('mongodb');
        this.mail = checkOptional('mail');
        this.websocket = checkOptional('websocket');
        this.velocity = checkOptional('velocity');
        this.jwt = checkOptional('jwt');

        this.mysqlHost = this.mysqlConn.split(':')[0];
        this.mysqlPort = this.mysqlConn.split(':')[1];
        this.mysqlUser = this.mysqlConn.split(':')[2];
        this.mysqlPwd = this.mysqlConn.split(':')[3];
        this.mysqlDb = this.mysqlConn.split(':')[4];
        //模板值定义
        this.fullApp = this.packageName+dot+module_app;
        this.fullCommonUtil = this.packageName+dot+module_common_util;
        this.fullCommonDal = this.packageName+dot+module_common_dal;
        this.fullCommonServiceExporter = this.packageName+dot+module_common_service_exporter;
        this.fullCommonServiceReferer = this.packageName+dot+module_common_service_referer;
        this.fullCoreModel = this.packageName+dot+module_core_model;
        this.fullCoreSrvice = this.packageName+dot+module_core_service;

        this.artApp = pac2land(this.projectName,module_app);
        this.artCommonUtil = pac2land(this.projectName,module_common_util);
        this.artCommonDal =pac2land(this.projectName,module_common_dal) ;
        this.artCommonServiceExporter = pac2land(this.projectName,module_common_service_exporter);
        this.artCommonServiceReferer = pac2land(this.projectName,module_common_service_referer);
        this.artCoreModel = pac2land(this.projectName,module_core_model);
        this.artCoreSrvice = pac2land(this.projectName,module_core_service);

        cb();
    }.bind(this));
};

GogenGenerator.prototype.app = function app() {

    for (var i=0; i<modules.length; i++) {
        var w = pac2path(modules[i]);
        var x = this.projectName+ spl + w;
        for (var j=0; j<mavens.length; j++) {
            //创建所有maven目录
            mkdirp(x+ spl + mavens[j]);
        }
        //创建src with package目录
        mkdirp(x+ spl + main_java_maven+spl+pac2path(this.packageName+'.'+modules[i]));
        //module pom填充
        this.template(w + spl + 'pom.xml',x + spl + 'pom.xml');
    }

    // 根目录填充
    this.template('pom.xml',this.projectName+ spl +'pom.xml');
    this.template('editorconfig',this.projectName+ spl +'.editorconfig');
    this.template('gitattributes',this.projectName+ spl +'.gitattributes');
    this.template('gitignore',this.projectName+ spl +'.gitignore');
    this.template('gitlab-ci.yml',this.projectName+ spl +'.gitlab-ci.yml');

    if(this.needReadme){
        this.template('README-with-tour.md',this.projectName+ spl +'README.md');
    }else{
        this.template('README-simple.md',this.projectName+ spl +'README.md');
    }

    //app module填充
    if(this.supportDocker){
        var template_module_app_docker = module_app + '/docker';
        var project_module_app_docker = this.projectName + spl + template_module_app_docker;
        mkdirp(project_module_app_docker);
        //docker文件填充
        this.template(template_module_app_docker + '/Dockerfile',project_module_app_docker + '/Dockerfile');
    }

    //velocity填充
    if(this.velocity){
        mkdirp(this.projectName + spl+module_app+spl+res_java_maven+spl+'templates');
    }

    //代码填充
    this.template(module_app+spl+main_java_maven+spl+'RootApplication.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'RootApplication.java');
    this.template(module_app+spl+main_java_maven+spl+'RootConfig.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'RootConfig.java');
    this.template(module_app+spl+main_java_maven+spl+'ServletInitializer.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'ServletInitializer.java');

    this.template(module_app+spl+main_java_maven+spl+'config/MvcConfig.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'config/MvcConfig.java');
    if(this.needSwagger){
        this.template(module_app+spl+main_java_maven+spl+'config/SwaggerConfig.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'config/SwaggerConfig.java');
    }
    this.template(module_app+spl+main_java_maven+spl+'config/WebConfig.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'config/WebConfig.java');

    this.template(module_app+spl+main_java_maven+spl+'controller/TtController.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'controller/TtController.java');
    this.template(module_app+spl+main_java_maven+spl+'controller/advice/TtControllerAdvice.java',this.projectName+spl+module_app+spl+main_java_maven+spl+pac2path(this.fullApp)+spl+'controller/advice/TtControllerAdvice.java');
    //resources填充
    this.template(module_app+spl+res_java_maven+spl+'application.yml',this.projectName+spl+module_app+spl+res_java_maven+spl+'application.yml');
    this.template(module_app+spl+res_java_maven+spl+'banner.txt',this.projectName+spl+module_app+spl+res_java_maven+spl+'banner.txt');
    this.template(module_app+spl+res_java_maven+spl+'logback-spring.xml',this.projectName+spl+module_app+spl+res_java_maven+spl+'logback-spring.xml');

    //common-dal代码填充
    this.template(pac2path(module_common_dal)+spl+main_java_maven+spl+'config/MyBatisConfig.java',this.projectName+spl+pac2path(module_common_dal)+spl+main_java_maven+spl+pac2path(this.fullCommonDal)+spl+'config/MyBatisConfig.java');
    this.template(pac2path(module_common_dal)+spl+main_java_maven+spl+'config/MyBatisMapperScannerConfig.java',this.projectName+spl+pac2path(module_common_dal)+spl+main_java_maven+spl+pac2path(this.fullCommonDal)+spl+'config/MyBatisMapperScannerConfig.java');

    //resources填充
    this.template(pac2path(module_common_dal)+spl+res_java_maven+spl+'generatorConfig.properties',this.projectName+spl+pac2path(module_common_dal)+spl+res_java_maven+spl+'generatorConfig.properties');
    this.template(pac2path(module_common_dal)+spl+res_java_maven+spl+'generatorConfig.xml',this.projectName+spl+pac2path(module_common_dal)+spl+res_java_maven+spl+'generatorConfig.xml');

    //common-service-exporter填充
    this.template(pac2path(module_common_service_exporter)+spl+main_java_maven+spl+'TtJaxrs.java',this.projectName+spl+pac2path(module_common_service_exporter)+spl+main_java_maven+spl+pac2path(this.fullCommonServiceExporter)+spl+'TtJaxrs.java');
    this.template(pac2path(module_common_service_exporter)+spl+main_java_maven+spl+'TtRequest.java',this.projectName+spl+pac2path(module_common_service_exporter)+spl+main_java_maven+spl+pac2path(this.fullCommonServiceExporter)+spl+'TtRequest.java');
    this.template(pac2path(module_common_service_exporter)+spl+main_java_maven+spl+'config/JaxrsApplication.java',this.projectName+spl+pac2path(module_common_service_exporter)+spl+main_java_maven+spl+pac2path(this.fullCommonServiceExporter)+spl+'config/JaxrsApplication.java');

    //common-service-referer填充
    this.template(pac2path(module_common_service_referer)+spl+main_java_maven+spl+'TtJaxrsProxy.java',this.projectName+spl+pac2path(module_common_service_referer)+spl+main_java_maven+spl+pac2path(this.fullCommonServiceReferer)+spl+'TtJaxrsProxy.java');
    this.template(pac2path(module_common_service_referer)+spl+main_java_maven+spl+'TtRequest.java',this.projectName+spl+pac2path(module_common_service_referer)+spl+main_java_maven+spl+pac2path(this.fullCommonServiceReferer)+spl+'TtRequest.java');
    this.template(pac2path(module_common_service_referer)+spl+main_java_maven+spl+'config/RefererConfig.java',this.projectName+spl+pac2path(module_common_service_referer)+spl+main_java_maven+spl+pac2path(this.fullCommonServiceReferer)+spl+'config/RefererConfig.java');

    //common-util填充

    //core-model填充
    this.template(pac2path(module_core_model)+spl+main_java_maven+spl+'jaxrs/JaxrsResponse.java',this.projectName+spl+pac2path(module_core_model)+spl+main_java_maven+spl+pac2path(this.fullCoreModel)+spl+'jaxrs/JaxrsResponse.java');

    //core-service填充
    this.template(pac2path(module_core_service)+spl+main_java_maven+spl+'service/TtService.java',this.projectName+spl+pac2path(module_core_service)+spl+main_java_maven+spl+pac2path(this.fullCoreSrvice)+spl+'service/TtService.java');
    this.template(pac2path(module_core_service)+spl+main_java_maven+spl+'service/impl/TtServiceImpl.java',this.projectName+spl+pac2path(module_core_service)+spl+main_java_maven+spl+pac2path(this.fullCoreSrvice)+spl+'service/impl/TtServiceImpl.java');
};

function pac2path(tt){
    return tt.replace(/\./g, spl);
}

function pac2land(ss,tt){
    return ss+land+tt.replace(/\./g, land);
}

GogenGenerator.prototype.projectfiles = function projectfiles() {};
