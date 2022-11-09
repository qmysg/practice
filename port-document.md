http://loclahost/3001

获取便签
get 请求
query:键 type：值 active 未完成 completed 已完成 不传为查询所有
返回{
code:0
msg:""
data:[多个便签对象]
}

新增便签
post 请求
body: title:便签内容 completed 是否完成（布尔值）,completed 可不传，默认为 false
返回{
code:0
msg:""
data:{新增的便签信息}
}

修改便签
put 请求
params:便签 id 值
或填写 query 键 type：值为布尔值，全部完成及全部不完成
返回{
code:0
msg:""
data:{修改后的便签信息}
}

删除一个便签
delete 请求
params:便签 id 值
返回{
code:0
msg:""
data:true
}

删除已完成的便签
delete 请求
params:便签 id 值,不加代表删除所有已完成的
返回{
code:0
msg:""
data:true
}
