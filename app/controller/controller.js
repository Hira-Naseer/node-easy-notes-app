const Notes = require("../../services/models/notesModel.js");
const md5 = require('md5');

exports.create = (req, res) => {
  
};
exports.findAll = (req, res) => {
  
};

exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};
exports.createUser = (req,res) => {};

exports.login = (req,res) => {};

exports.login = (req,res) => {
  if(!req.body){
    res.status(400).send({
      message : "Content can not be empty!"
    });
  };

exports.createUser = (req,res) => {
  if(!req.body){
    res.status(400).send({
      message : "Content can not be empty!"
    });
  }
  const user = new user({
    user_email : req.body.user_email,
    password : md5(req.body.password) 
  });
  user.login(user,(err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message||"some error occurred while login."
    });
    else{
      if(user_email == Notes.user.user_email){
          if(password == Notes.user.password){
              console.log("Successfully logined!")
              message: "successfully logined."
          }
      }
    }  
  });
}
Notes.createUser(user, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user."
    });
  else res.send(data);
});  
};

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      
      // const notes = new Notes({
      //   title: req.body.title,
      //   body: req.body.body || false
      // });
      const notes = new Notes({
        title: req.body.title,
        body: req.body.body || false,
        image:req.body.image || false, 
        voice:req.body.voice || false,
        text_color:req.body.text_color || false,
        bg_image: req.body.bg_image || false,
        bg_color:req.body.bg_color || false,
        lable:req.body.lable || false,
        is_pin:req.body.is_pin || false
      });
      
      Notes.create(notes, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the notes."
          });
        else res.send(data);
      });  
};
exports.findAll = (req, res) => {
    const title = req.query.title;
    Notes.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving notes."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req,res) => {
      Notes.findById(req.params.id,(err,data) => {
          if(err){
              if(err.kind == "not Found"){
                  res.status(404).send({
                      message:'not found note with id ${req.params.id}.'
                  });
              }else{
                res.status(500).send({
                    message: "Error retrieving note with id " + req.params.id
                  });
              }
          }else res.send(data);
      });
  };
  exports.update = (req, res) => {
    
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    Notes.updateById(req.params.id,new Notes(req.body),(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found note with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating note with id " + req.params.id
            });
          }
        } else{res.send(data)
        };
      }
    );
  };
  exports.deleteAll = (req, res) => {
    Notes.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all notes."
        });
      else res.send({ message: `All notes were deleted successfully!` });
    });
  };
