var host = 'www.wxtongteng.com'

var config = {

  host, 
  
  //数据库查询接口
  DBRequestUrl:`https://${host}/tender/api/db`,

  // 搜索接口
  SearchRequestUrl: `https://${host}/tender/api/query/`
};

module.exports = config
