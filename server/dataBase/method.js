const db = require('./db')
const mysql = require('mysql')
const sql = require('./sql')

let pool = mysql.createPool(db.mysql)

let method = {
    Login: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(params)
            var sql_name = sql.queryUser + "where u_account =" + conn.escape(params.account)
            if (error) {
                throw error
            } else {
                conn.query(sql_name,params.account, (error, rows) => {
                    if (error) throw error
                    else {
                        if (rows.length == 0) {
                            res.send({
                                'msg': '该用户不存在!',
                                'status': -1,
                                "info": req.body,
                                "ots": typeof params.account,
                                'name': params.account
                            }).end()
                    } else {
                        let dataw = rows[0];
                        //login sucess
                        if (dataw.u_password === params.password) {
                            //save the session 
                            // req.session['user_id'] = dataw.user_id;
                            dataw.msg = "登录成功";
                            dataw.status = 1;
                            dataw.info = req.body;
                            dataw.u_password=''
                            res.send(dataw).end();
                        } else {
                            res.send({
                                'msg': '密码不正确',
                                'status': -2,
                                'psw': params.password,
                                "info": req.body, //req.body
                            }).end();
                        }
                    }
                    // res.json(rows)
                    // conn.release()
                }})
            }
        })
    },
    Register: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.addUser
            if (error) {
                throw error
            } else {
                conn.query(sql_name,[params.name,params.mobile,params.password,params.school,params.sex,params.birthday], (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "注册成功";
                        result.status = 1;
                        result.info = req.body.name;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    addPost: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.addPost
            if (error) {
                throw error
            } else {
                conn.query(sql_name,[params.id,params.title,params.createtime,params.pay,params.job,params.position,params.count,params.desc,params.name,params.class], (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "发帖成功";
                        result.status = 1;
                        result.info = req.body.title;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryPost:  (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(req)
            var sql_name = sql.queryPost
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        // result.msg = "查询成功";
                        // result.status = 1;
                        // result.info = req.body;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    updatePostCount: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.updatePostCount + "where p_id =" + conn.escape(params.p_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "点击成功";
                        result.status = 1;
                        result.info = req.body.p_count;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    addChat: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.addChat
            if (error) {
                throw error
            } else {
                conn.query(sql_name,[params.ac_id,params.id,params.p_id,params.content,params.createtime,params.read], (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "发送成功";
                        result.status = 1;
                        result.info = req.body.title;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryChat:  (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(req)
            var sql_name = sql.queryChat + "where (u_id =" + conn.escape(params.u_id) + " and u_accept_id =" + conn.escape(params.u_accept_id) + ") or " +
                                                "(u_id =" + conn.escape(params.u_accept_id) + " and u_accept_id =" + conn.escape(params.u_id) + ")"
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        // result.msg = "查询成功";
                        // result.status = 1;
                        // result.info = req.body;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryUserforName:  (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
           // console.log(req)
            var sql_name = sql.queryUser + "where u_id =" + conn.escape(params.u_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        // result.msg = "查询成功";
                        // result.status = 1;
                        // result.info = req.body;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryAllUserforName:  (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(req)
            var sql_name = sql.queryUser 
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        // result.msg = "查询成功";
                        // result.status = 1;
                        // result.info = req.body;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryChatformsg: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(req)
            var sql_name = sql.queryChat + "where u_accept_id =" + conn.escape(params.u_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        // result.msg = "查询成功";
                        // result.status = 1;
                        // result.info = req.body;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    updateChatRead: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.updateChatRead + "where u_id =" + conn.escape(params.u_id) + " and u_accept_id =" + conn.escape(params.u_accept_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "修改成功";
                        result.status = 1;
                        result.info = req.body.title;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    replaceResume: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.replaceResume
            if (error) {
                throw error
            } else {
                conn.query(sql_name,[params.id,params.name, params.birthday, params.sex, params.major, params.degree, params.phone, params.pay, params.job, params.position,params.desc], (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "修改成功";
                        result.status = 1;
                        result.info = req.body.r_id;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryResume: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            console.log(req)
            var sql_name = sql.queryResume + "where u_id =" + conn.escape(params.u_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    replaceChart: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.replaceChart
            if (error) {
                throw error
            } else {
                conn.query(sql_name,[params.id,params.content], (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "修改成功";
                        result.status = 1;
                        result.info = req.body.ch_id;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryChart: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            console.log(req)
            var sql_name = sql.queryChart + "where u_id =" + conn.escape(params.u_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryEmploy:(req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(req.query)
            var sql_name
            if(params.u_id && params.u_accept_id){
                sql_name = sql.queryEmploy + "where u_id =" + conn.escape(params.u_id) + " and u_accept_id =" + conn.escape(params.u_accept_id)
            }
            else if(params.u_id){
                sql_name = sql.queryEmploy + "where u_id =" + conn.escape(params.u_id) 
            }
            else{
                sql_name = sql.queryEmploy + "where u_accept_id =" + conn.escape(params.u_accept_id)
                //console.log(sql_name)
            }
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    updateEmploy: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            console.log(params)
            var sql_name = sql.updateEmploy + "e_recent=" + conn.escape(params.e_recent) + " , e_pass=" + conn.escape(params.e_pass)
                + " where u_id =" + conn.escape(params.u_id) + " and u_accept_id =" + conn.escape(params.u_accept_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "修改成功";
                        result.status = 1;
                        result.info = req.body.title;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    addEmploy: (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            var sql_name = sql.addEmploy
            console.log('go')
            if (error) {
                throw error
            } else {
                conn.query(sql_name, [params.u_id,params.u_accept_id,0,0],(error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "增加成功";
                        result.status = 1;
                        result.info = req.body;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    queryUserforfile:  (req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.query
            //console.log(req)
            var sql_name = sql.queryUser + "where u_id =" + conn.escape(params.u_id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        
                        // result.msg = "查询成功";
                        // result.status = 1;
                        // result.account = req.body.u_account;
                        // result.school = req.body.u_school
                        // result.sex = req.body.u_sex
                        // result.birthday = req.body.u_birthday
                        result[0].u_password=''
                        console.log(result[0])
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    replaceUser:(req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.replaceUser + "u_school =" +conn.escape(params.school) +",u_sex ="+conn.escape(params.sex)
                        +",u_name ="+conn.escape(params.name)+",u_birthday ="+conn.escape(params.birthday)+" where u_id ="+ conn.escape(params.id)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        result.msg = "修改成功";
                        result.status = 1;
                        result.info = req.body.name;
                        res.send(result).end();
                    }
                })
            }
            conn.release()
        })
    },
    replaceUserpassword:(req, res) => {
        pool.getConnection (function (error, conn) {
            var params = req.body
            //console.log(params)
            var sql_name = sql.replaceUser + "u_password =" + conn.escape(params.password) +"where u_school="+conn.escape(params.school) +" and u_sex ="+conn.escape(params.sex)
                        +" and u_name ="+conn.escape(params.name)+" and u_birthday ="+conn.escape(params.birthday)+"  and u_account ="+ conn.escape(params.account)
            if (error) {
                throw error
            } else {
                conn.query(sql_name, (error, result) => {
                    if (error) throw error
                    else if (result){
                        if(result.changedRows === 0){
                            result.msg = "不存在该账号或资料错误";
                            result.status = -1;
                            res.send(result).end();
                        }
                        else{
                            result.msg = "修改成功";
                            result.status = 1;
                            result.info = req.body.name;
                            res.send(result).end();
                        }
                        
                    }
                })
            }
            conn.release()
        })
    }
}

module.exports = method