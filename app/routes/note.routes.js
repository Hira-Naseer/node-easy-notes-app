module.exports = app => {
    const Notes = require("../controller/controller.js");
    var router = require("express").Router();
    router.post("/" , Notes.create);
    router.post("/user" , Notes.createUser);
    router.get("/",Notes.findAll);
    router.get("/:id",Notes.findOne);
    router.put("/:id",Notes.update);
    router.delete("/:id",Notes.delete);
    router.delete("/",Notes.deleteAll);
    router.post("/login" , Notes.login);
    app.use('/api/notes',router);

};