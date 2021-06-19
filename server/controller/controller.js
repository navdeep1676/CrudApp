var Ajdb = require('../model/model');

// crate & save new user 
exports.create=(req,res)=>{
  //validate request 
if(!req.body){
    res.status(400).send({message:"Content can not be empty"});
    return;
}
 //new User
const user = new Ajdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})
// save user in the database 
user
.save(user)
.then(data=>{
    // res.send(data)
    res.redirect("/add_user");
})
.catch(err=>{
    res.status(500).send({message:err.message || "some error occured while creating a crate operation"})
})
}




// retrive and return all users /retrive and return a single user
exports.find=(req,res)=>{
    
    if(req.query.id){
    const id= req.query.id;

   Ajdb.findById(id)
 .then(data=>{
     if(!data){
         res.status(404).send({message:"Not found user with id" +id})
     }else{
         res.send(data)
     }
 })   
 .catch(err=>{
     res.status(500).send({message:"Error retrive user with id "+id})
 })

  }else{  Ajdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error Occured while retriving user information"})
    })
}
}









// update a new idetified user by user id 
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message :"Data to update can not be empty"})
    }
const id=req.params.id
    Ajdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=> {
        if(!data){ 
            res.status(404).send({message: `Cannot Delete with id ${id}.Maybe id id wrong!`})
        }else{
            res.send(data)
        } 
      })
  .catch(err=>{
      res.status(500).send({
          message:"Error Update user information"})
  })
}





//Delete a user with specified user id in the request 
exports.delete = (req,res)=>{
    const id =req.params.id;

  Ajdb.findByIdAndDelete(id)
  .then(data=> {
      if(!data){ 
          res.status(404).send({message: `Cannot Delete with id ${id}.Maybe id id wrong`});
      }else{
          res.send({
              message:"User was deleted succesfully "
          })
      } 
    })
      
.catch(err=>{ 
    res.status(500).send({
        message:"Could not delete User with id="+id
    })
})
}

