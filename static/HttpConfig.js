
let ApiConfig;
//
// let user = JSON.parse(localStorage.getItem("user"));
//
// let token_type = !!user ? user.token_type : '';
// let access_token = !!user ? user.access_token : '';

if(process.env.NODE_ENV === "development"){
  ApiConfig = {                               // 开发环境
    BaseUrl : "http://localhost:3000"
    // ImgUrl: "https://hm.shbailashu.com",
    // UploadImg:"https://hm.shbailashu.com/admin/upload",
    // ImgToken:{
    //   "Authorization" : token_type +" "+ access_token
    // }
  }
}else{
  ApiConfig = {                               // 生产环境
    // BaseUrl : "https://hm.shbailashu.com",
    // ImgUrl: "https://hm.shbailashu.com",
    // UploadImg:"https://hm.shbailashu.com/admin/upload",
    // ImgToken:{
    //  "Authorization" : token_type +" "+ access_token
    // }
  }
}

export  {ApiConfig}
