import cors from "cors";
import express from "express";
import translate from "translate-google";
import http from "http"

const app = express();
// const port = 8000;

const port = process.env.PORT || 8000;

const server = http.createServer(app);



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors());
app.use(express.json());

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

app.post("/translate", async (req, res) => {
  let text = req.body.textDefault;
  try {
    const translatedText = await translate(text, { from: "id", to: "en" }).then(
      (res) => {
        console.log(res);
      }
    );
    res.send({
      status: 200,
      message: "Success",
      data: translatedText,
    });
  } catch (err) {
    console.log(err);
  }
});

// app.get("/translate/downloadtxt", async (req, res) => {
//   let text = req.body.translateDefault;
//   try {
//      const blob = new Blob([text], { type: "text/plain" });
//     const downloadUrl = URL.createObjectURL(blob);

//     res.setHeader(
//       "Content-Disposition",
//       'attachment; filename="translated.txt"'
//     );
//     res.setHeader("Content-Type", "text/plain");

//     http.get(downloadUrl, (fileRes) => {
//       fileRes.pipe(res);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/translate/downloadtxt", async (req, res) => {
  let textDef = req.body.textDef;
  try {
    if (!textDef) {
      throw new Error("No text provided");
    }
    const blob = new Blob([textDef], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="translated.txt"'
    );
    res.setHeader("Content-Type", "text/plain");

    const stream = request.get(downloadUrl);
    stream.pipe(res);
  } catch (err) {
    console.log(err);
  }
});
