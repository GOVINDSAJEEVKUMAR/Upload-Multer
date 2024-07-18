const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const { log } = require('console')

const app = express()

app.use(cors())

const storage = multer.diskStorage({
     destination: function (req,file,cb){
        cb(null,'uploads')
     },
     filename: function (req,file,cb){
        cb(null,file.originalname)
     }
})

const upload = multer({
    storage
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post("/upload",upload.single("file"),(req,res,file)=>{
    console.log(req.file);
    if(!req.file){
        return res.status(400).send("No file uploaded")
    }

    res.send("File uploaded")
})

app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename
    const filePath = path.join(__dirname,'uploads',fileName)

    try{
        if(fs.existsSync(filePath)){
            res.sendFile(filePath)
        }else{
            res.status(404).send("File not found")
        }

    }catch(error){
        console.log(error);
    }
})

app.get('/delete/:filename', (req, res) => {
    const fileName = req.params.filename
    const filePath = path.join(__dirname,'uploads',fileName)

    try{
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
            res.send("File deleted")
        }else{
            res.send(404).send('file not found')
        }

    }catch(error){
        console.log(error);
    }
})

app.listen(8111, () => {
    console.log("Server is running on port 8111");
})