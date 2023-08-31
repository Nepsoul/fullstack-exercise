const express=require("express")
const app=express()

app.get("/",(req,res)=>{
    res.send("<h2>This is new Blog-project</h2>")
})


const PORT=3001
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})