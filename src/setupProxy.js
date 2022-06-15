const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    //미들웨어 사용할때 씀
    //"/hello로 요청이 들어오면 proxy 미들웨어 실행"
    "/api/vi/posts",
    createProxyMiddleware({
      target: "http://localhost:8080", //localhost 주소
      changeOrigin: true,
      withCredentials: true 
    }),
  );

  app.use(
    "/posts",
    createProxyMiddleware({
      target: "http://localhost:8080", //localhost 주소
      changeOrigin: true
    }),
  );
};

