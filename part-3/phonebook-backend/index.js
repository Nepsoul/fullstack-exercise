const express=require("express")
const app=express()

const persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/",(request,response)=>{
    response.send("<h2>Hello world<h2/>")
})

app.get("/info",(req,res)=>{
    res.send(`Phonebook has info for ${persons.length} people <br/>  <br/>${new Date()}`)
})
app.get("/api/persons/",(request,response)=>{
    response.json(persons) //express auto convert into json format
    // response.end(JSON.stringify(persons)) //explicitly set res content to manually convert into json format
})

const PORT=3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})