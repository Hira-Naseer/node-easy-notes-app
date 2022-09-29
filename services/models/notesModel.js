const res = require("express/lib/response");
const con = require("../../config/database.config");
const controller = require("../../app/controller/controller.js")

const notesModel = function(notes){
    this.title = notes.title;
    this.body = notes.body;
    this.image = notes.image; 
    this.voice = notes.voice;
    this.text_color = notes.text_color;
    this.bg_image = notes.bg_image;
    this.bg_color = notes.bg_color;
    this.lable = notes.lable;
    this.is_pin = notes.is_pin;
}
const user = function(user){
    this.user_email = user.user_email;
    this.password = user.password;
}
user.registration = (newUser,result)=>{
    var user_email = con.query(`INSERT INTO users SET user.email = ${user.user_email}, password = ${controller.md5(user.password)}`, newUser,(err,res)=> {
        if(err){
            console.log("ERROR :",err);
            result(err,null);
            return;
        }
        console.log("created : ",{id:res.insertId, ...newUser});
        result(null,{id:res.insertId, ...newUser});
    });
}

user.login = (newUser,result) => {
    var user_email = con.query("SELECT user_email FROM users",(err,res)=>{
        if(err){
            console.log("ERROR :",err);
            result(err,null);
            return;
        }
        else{
            var password = con.query("SELECT password FROM users ",(err,res)=>{
                if(err){
                    console.log("ERROR :",err);
                    result(err,null);
                    return; 
                }
           });    
        }
  });
}
notesModel.create = (newNotes,result)=>{
    con.query("INSERT INTO notes SET?", newNotes,(err,res) =>{
        if(err){
            console.log("ERROR :",err);
            result(err,null);
            return;
        }
        console.log("created : ",{id:res.insertId, ...newNotes});
        result(null,{id:res.insertId, ...newNotes});
    });
} 


notesModel.findById = (id,result) => {
    con.query(`SELECT * FROM notes WHERE id = ${id}`,id,(err,res)=>{
        if(err){
            console.log("ERROR : ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Note : ",res[0]);
            result(null,res[0]);
            return;
        }
        result({kind: "Not Found"},null);
    });
};
notesModel.getAll = (title,result) => {
    let query ="SELECT * FROM notes";
    if(title){
        query += "WHERE title LIKE '%${title}%'";
    }
    con.query(query,(err,res)=>{
        if(err){
            console.log("ERROR : ",err);
            result(null,err);
            return;
        }
        console.log("NOTES : ",res);
        result(null,res);
    });
};

notesModel.updateById = (id,notes,result) => {
    con.query("UPDATE notes SET title = ?, body = ? WHERE id = ? ",[notes.title,notes.body,id],(err,res) => {
        if(err){
            console.log("ERROR :",err, 'error');
            result(null,res);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }
        console.log("UPDATE notes : ",{id:id, ...notes});
        result(null,{id,id, ...notes});
    
    });
};
notesModel.remove = (id, result) => {
    sql.query(`DELETE FROM notes WHERE id = ${id} `, (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }

      console.log(res);
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted note with id: ", id);
      result(null, res);
    });
  };
notesModel.removeAll = result => {
    sql.query("DELETE FROM notes", (err,res)=>{
        if(err){
            console.log("ERROR : ",err);
            result(null,err);
            return;
        }
        console.log('delete ${res.affectedRows} notes');
        result(null,res);
    });
};

module.exports = notesModel;