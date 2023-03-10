import cors from "cors"
import express  from "express";
import translate from "google-translate-api";

const app = express()
const port = 8000;


app.use(cors());
app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post("/translate", async(req, res) => {
  let defaultText = req.body.textDefault
  try {
    translate(defaultText, { to: "en" }).then((res) => {
      console.log(res.text);
      //=> I speak English
      console.log(res.from.language.iso);
      //=> nl
    });
    res.send({
        message: "Successful",
        status: 200
    })
  }
  catch(err){
    console.log(err)
  }

})