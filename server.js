const express=require('express')
const mongoose=require('mongoose')

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json("Api is working")
})

const users=[
    {email:'Sibiraj@gmail.com',password:'Sibi123',DateofBirth:'16.05.2006'},
    {email:'gp@gmail.com',password:'gp123',DateofBirth:'16.09.2005'},
    {email:'yash@gmail.com',password:'yash123',DateofBirth:'28.06.2006'},
]
app.get('/get-user',(req,res)=>{
    const email=req.query.email;
    if(!email){
        return res.status(404).json({message:"Email paramater cannot be empty"})
    }
    const userdata=users.find(u=>u.email===email)
    if(userdata){
        res.json({message:"email found",data:userdata})
    }else{
        return res.status(404).json({message:"email cannot be empty"})
    }
})

app.put('/update-user',(req,res)=>{
    const {email,password}=req.body;
    const user=users.find(u=>u.email===email)
    if(user){
        user.password=password
        res.json({message:"Email Updated"})

    }else{
        return res.status(404).json({message:"Password length should be greater than 8 or less than or equal to 16"})
    }

})

app.delete('/delete-user',(req,res)=>{
    const {email}=req.body;
    const index=users.findIndex(u=>u.email===email);
    if(index !=-1){
        users.splice(index,1)
        res.json("user Deleted Succesfully")
    }else{
        res.status(404).json({message:"cannot be deleted"})
    }
})


app.listen(3000,()=>{
    console.log("Server is running on Port http://localhost:3000")
})

express