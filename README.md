# dpbcc  
做ts游戏开发的，多多少少都会上各个平台小游戏。  
protobuf生成的代码实在太大了，使用proto文件动态加载，有时候又会被平台拒绝。  
所以找了个时间做了个根据proto文件生成配置来动态解析protobuf的。  
使用的是protobufjs,是官方的google-protobuf.  
代码自己看吧，很简单的。例子用的是生成的ts。其实也可以生成json.要改成json,稍微改下就o了。
通过生成配置动态加载protobuf  
dpc:[https://github.com/xhaoh94/dpb](https://github.com/xhaoh94/dpb)  
protogen:[https://github.com/xhaoh94/protogen](https://github.com/xhaoh94/protogen)
