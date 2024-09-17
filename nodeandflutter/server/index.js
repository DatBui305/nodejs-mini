const express = require('express')

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

const productData = []

app.listen(3000, ( )=>{
    console.log('Connected to server at 3000')
})


app.post("/api/add_product", (req, res) => {
    const pdata = {
        "id": productData.length + 1,
        "pname": req.body.pname,
        "pprice": req.body.pprice,
        "pdesc": req.body.pdesc 
    }

    productData.push(pdata)
    console.log('final', pdata)
    res.status(200).send({
        'status_code': 200,
        'message': 'product added successfully',
        'product': pdata
    })
})