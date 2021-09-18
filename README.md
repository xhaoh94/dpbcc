# dpbcc  
做ts游戏开发的，多多少少都会上各个平台小游戏。  
protobuf生成的代码实在太大了，使用proto文件动态加载，有时候又会被平台拒绝。  
所以找了个时间做了个根据proto文件生成配置来动态解析protobuf的。  
使用的是protobufjs,不是官方的google-protobuf.  
例子用的是cocos creator引擎。代码自己看吧，很简单的。  
配置生成的ts。  
也可以生成json。
通过生成配置动态加载protobuf  
pbtool:[https://github.com/xhaoh94/pbtool](https://github.com/xhaoh94/pbtool)
