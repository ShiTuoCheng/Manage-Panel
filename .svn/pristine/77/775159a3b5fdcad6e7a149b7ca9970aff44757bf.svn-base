/*
    广告位接口模版(测试)
*/
const Advertise = {

  // 查询详细
  list(template?: string) {
    const data = {
      "type": "Advertise",
      "act": "Select_List",
      "para": {
        "params": {
          "s_Aid": "",
          "s_Total_parameter": "Aid,Atitle,Url,Pic1"
        }
      }
    };

    return {
      "type": "Advertise",
      "act": "Select_List",
      "para": {
        "params": Object.assign(data.para.params, template)
      }
    };
  },

  // 查询列表
  serverList(template?: string) {
    return {
      "type": "Store_Services",
      "act": "Select_List",
      "para": {
        "params": Object.assign({
          "s_Alive": "",
          "s_Keywords": "",
          "s_Order": "",
          "s_Ssid": "",
          "s_Total_parameter": "Ssid,Stitle,Pic1,Alive,Layer"
        }, template),
        "pages": {
          "s_Keywords": "",
          "s_Order": "",
          "s_Ssid": "",
          "p_c": "",
          "p_First": "",
          "p_inputHeight": "",
          "p_Last": "",
          "p_method": "",
          "p_Next": "",
          "p_Page": "1",
          "p_pageName": "",
          "p_PageStyle": "",
          "p_Pname": "",
          "p_Previous": "",
          "p_Ps": "20",
          "p_sk": "",
          "p_Tp": ""
        }
      }
    };
  },

  layer(template?: object) {
    return {
      "type": "Store_Services",
      "act": "Layer",
      "para": {
        "params": template
      }
    };
  },

  alive(template?: object) {
    return {
      "type": "Store_Services",
      "act": "Alive",
      "para": {
        "params": template
      }
    };
  },

  del(template?: object) {
    return {
      "type": "Store_Services",
      "act": "Del",
      "para": {
        "params": template
      }
    };
  }
};

export default Advertise;
