import cors from "cors";
import express from "express";
import pkg from "speak-tts"
import fs from "fs"
import fileDownload from "js-file-download"


const { Speech } = pkg
const app = express();
// const port = 8000;

const port = process.env.PORT || 8000;

// const server = http.createServer(app);



// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


app.post("/speech", async (req, res) => {
  const text = req.body.textDefault;
  const lang = req.body.langOption;

  try {
    const speech = new Speech();
    await speech.init({
      volume: 0.5,
      lang: lang,
      rate: 1,
      pitch: 1,
      splitSentences: true,
    });
    const audio = speech.speak({
      text: text,
    });
    const filename = `${text.replace(/\s+/g, "_")}.mp3`;
    const filePath = `${__dirname}/${filename}`;
    fs.writeFile(filePath, audio, "binary", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error creating audio file");
      } else {
        res.download(filePath, filename, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error downloading audio file");
          } else {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating audio");
  }
});

app.get("/download/audiofile", async (req, res) => {
  let text = req.body.textDefault
  try {
        
  } catch (error) {
    
  }
})

