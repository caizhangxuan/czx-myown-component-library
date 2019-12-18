let Mock = require('mockjs');


const getList = () => {
    return Mock.mock({
        "data|1-10": [
            {
                "id|+1": 1,
                "name":"@cname",
                "created":"@datetime",
                "update":"@now",
                "email":"@email",
                "role":"@pick(['管理员','员工','超级管理员','合作方'])"
            }
        ]
    });
};

const getAddress = () => {
    return Mock.mock('@city(true)')
}


export {getList,getAddress}


