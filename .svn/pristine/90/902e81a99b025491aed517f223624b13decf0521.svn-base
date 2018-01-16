/*
    管理员接口模版
*/
const AdminUsers = {

    // 查询详细
    detail(template) {
        const data = {
                "type": "adminUsers",
                "act": "Select_Detail",
                "para": {
                    "params": {
                        "d_Alive": "",
                        "d_Aname": "",
                        "d_Auid": "",
                        "d_Auid_not": "",
                        "d_Token": "",
                        "s_Total_parameter": "Auid,Sid,Sname,Passwd,Aname,Alive,Aulid,adminUsersLevel,Token,Token_expiry,Token_IP"
                    }
                }
            };

        return {
                "type": "adminUsers",
                "act": "Select_Detail",
                "para": {
                    "params": Object.assign(data.para.params, template)
                }
            };
    }

    // 查询列表
};

export default AdminUsers;
