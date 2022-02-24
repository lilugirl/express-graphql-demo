var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
// const mysql =require("mysql")

// var pool =mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"root123",
//     database:"test"
// })
// 定义schema，查询和类型
var schema = buildSchema(`
  """
    用户信息
    """
  type User{
      id:String
      "姓名"
      name:String
      age:Int
      gender:Boolean
      email:String
      hobbies:[String]
  }
  type Query {
    hello: String
    name: String
    "请求用户"
    getUser(id:String):User
  }

`);
// 查询对应的处理器
var root = { 
  hello: () => "Hello world!",
  name:()=>'liuyi',
  getUser:({id})=>{
    const userList = {
      1: {
          name: "张三",
          age: 18,
          gender: 0
      },
      2: {
          name: "李四",
          age: 24,
          gender: 31
      }
  }
  return userList[id];

  }
 };

var app = express();

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
