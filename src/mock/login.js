import queryString from "query-string";

const userMap = {
  admin: {
    roles: ["admin"],
    token: "admin",
    introduction: "i am admin",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    name: "Admin"
  },
  sakuya: {
    roles: ["sakuya"],
    token: "sakuya",
    introduction: "i am sakuya",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    name: "Sakuya"
  }
};
const  newUserMao = {
  admin:{

  }
}
const userPermission = {
  data:[
    {contentType:'view',content:'dashboard'},
    {contentType:'view',content:'supportManage:appList:index'},
    {contentType:'view',content:'supportManage:userList:index'},
    {contentType:'view',content:'updateCenter:projectList:index'},
    {contentType:'view',content:'updateCenter:esealFirmware:index'}
  ]
}

export default {
  loginbyUser: config => {
    let { username } = JSON.parse(config.body);
    let response = {};
    if (username in userMap) {
      response = {
        code: 200,
        data: userMap[username],
        message: "Login success, Welcome"
      };
    } else {
      response = {
        code: 200,
        data: null,
        message: "Login failed, User does not exist"
      };
    }
    return response;
  },
  logout: () => {
    return {
      code: 200,
      data: {
        state: 1
      },
      message: "Logout success"
    };
  },
  info: config => {
    let params = queryString.parse(config.url.replace(/^\S+(?=\?)/, ""));
    let response = {
      code: 200,
      data: userMap[params.username],
      message: "Login success, Welcome"
    };
    return response;
  },
  permission:()=>{
    let response = {
      code: 200,
      message: "get permission success",
      ...userPermission
    }
    return response;
  }
};
