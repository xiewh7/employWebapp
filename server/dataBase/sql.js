module.exports = {
    queryUser: 'select * from user ',
    addUser: 'insert into user (u_name, u_account, u_password, u_school, u_sex, u_birthday) values (?,?,?,?,?,?)',
    addPost: 'insert into posts (u_id, p_title, p_createtime, p_pay, p_job, p_position,p_count,p_desc,u_name,p_class) values (?,?,?,?,?,?,?,?,?,?)',
    queryPost: 'select * from posts ',
    addChat: 'insert into chats (u_accept_id, u_id, p_id, c_content, c_createtime, c_read) values (?,?,?,?,?,?)',
    queryChat: 'select * from chats ',
    updateChatRead: 'update chats set c_read = 1 ',
    updatePostCount: 'update posts set p_count = p_count + 1 ',
    replaceResume:'replace into resume (u_id, r_name, r_birthday, r_sex, r_major, r_degree, r_phone, r_pay, r_job, r_position, r_desc) values (?,?,?,?,?,?,?,?,?,?,?) ',
    queryResume: 'select * from resume ',
    replaceChart:'replace into chart (u_id, ch_content) values (?,?) ',
    queryChart: 'select * from chart ',
    queryEmploy: 'select * from employ ',
    updateEmploy: 'update employ set ',
    addEmploy: 'replace into employ (u_id, u_accept_id, e_recent, e_pass) values (?,?,?,?)',
    replaceUser:'update user set '
}