import service from './request'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
import { baseUrl } from '../config'

// 维护列表上传图片地址
export const stickUploadUrl = '/customertrackpic/upload';

export const PICTURE_EXPRESSION = /\.(png|jpe?g|gif|svg)(\?.*)?$/


//login
export const login = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/login', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// 发送验证码
export const sendCode = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/smsfindpwd', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// 登录页找回密码
export const findPws = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/updatepwd', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取session数据
export const sessionGetItem = (params) => {
    return JSON.parse(sessionStorage.getItem(params))
}

// 存储session数据
export const sessionSetItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}




// 登陆后修改密码
export const alterPassword = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/updatepwdbyold', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
} 

// 检测手机号
export const checkmobile = /^1[3456789]\d{9}$/

// 检测身份证号
export const checkidCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 创建用户
export const createUser = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/save', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取用户列表
export const userList = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/list', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// 获取用户详情
export const userDetail = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/detail', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 删除用户
export const userDelete = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/del', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 待办事项列表
export const todoList = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/todo/list', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取客户列表数据
export const getCustomerList = (params, urlType) => {
    let url = ''
    if(urlType == 2) {
        url = '/customer/list'
    }else if(urlType == 3) {
        url = '/customer/auditlist'
    }else if(urlType == 4) {
        url = '/customer/alllist'
    }
    
    return new Promise((resolve, reject) => {
        service.post(baseUrl + url, QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}



// 
export const handlecustomDelete = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/customer/del', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


export const handleUpload = (fileUrl, params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + fileUrl, params)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取系统参数
export const getsystemData = () => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/sys/params')
        
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}



// 添加客户
export const addCustom = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/customer/add', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}


// 编辑客户
export const editCustom = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/customer/edit', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}






// 客户详情
export const getCustomerDetail = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/customer/detail', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}



// 客户经理列表
export const toTransfer = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/customermanagers', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 客户移交
export const sureToTransfer = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/customer/transfer', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 发送营销短信
export const changeSendMsg = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/sms/send/market', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 修改手机号
export const changeMobile = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/updatemobilephone', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 审核拒绝
export const changeCarefull = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/customer/audit', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 更新代办
export const changeTodilist = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/todo/updatereaded', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 删除附件
export const changeattachDel = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/attach/del', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 下载附件
export const changeattachDownload = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/attach/download', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 备份
export const ziliaoDownload = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/sys/backup/db', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 附件备份
export const fujianDownload = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/sys/backup/attach', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}




// /sys/backup/attach

/**
 * 新增多角色用户登录时确实用户角色
 * 2020-04-12
 */

 export const setloginUserType = (params) => {
     return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/setloginusertype', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
     })
 }



  /**
   * 维护记录上传图片删除
   * 2020-06-03
   */

   export const removeStickImg = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customertrackpic/del', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
   }


   /**
    * 维护记录新增
    * 2020-06-08
    */

   export const newlyRecord = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customertrack/save', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }


    /**
     * 维护记录列表
     * 2020-06-08
     */

    export const getNewlyRecordList = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customertrack/list', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    /**
     * 维护记录详情
     * 2020-06-09
     */

     export const getRecordDetail = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customertrack/detail', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
     }

     /**
      * 维护记录删除
      * 2020-06-09
      */

     export const removeRecord = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customertrack/del', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
     }

     /**
      * 公共客户列表
      * 2020-06-09
      */


     export const getPublicList = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customer/commonlist', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
     }


     /**
      * 公共客户认领
      * 2020-06-14
      */

      export const handleTurn = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customer/apply', QS.stringify(params))
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
      }

      /**
       * 客户经理导出功能
       * 2020-06-21
       */

      export const handleExport = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customer/export', QS.stringify(params), {responseType: 'blob'})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
      }


      /**
       * 业务管理员导出功能
       * 2020-06-23
       */

    export const handleAllExport = (params) => {
        return new Promise((resolve, reject) => {
            service.post(baseUrl + '/customer/allexport', QS.stringify(params), {responseType: 'blob'})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }