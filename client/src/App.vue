<script>
import Speech from "speak-tts";
import axios from "axios";

export default {
  data() {
    return {
      textDefault: "",
      translateDefault: "",
      translatedText: "",
      file: null,
      content: null,
      htmlCode: "",
      text: "",
    };
  },
  methods: {
    async speakEnglish() {
      event.preventDefault();
      try {
        const speech = new Speech();
        speech.init({
          volume: 1,
          lang: "en-GB",
          rate: 1,
          pitch: 1,
          voice: "Google UK English Female",
          splitSentences: true,
        });
        speech.speak({
          text: this.textDefault,
        });
      } catch (err) {
        console.error("An error occurred :", err);
      }
    },
    async speakIndonesian() {
      event.preventDefault();
      try {
        const speech = new Speech();
        speech.setLanguage("id-ID");
        await speech.init({
          volume: 0.5,
          lang: "id-ID",
          rate: 1,
          pitch: 1,
          name: "Google Bahasa Indonesia",
          voiceURI: "Google Bahasa Indonesia",
          splitSentences: true,
        });
        speech.speak({
          text: this.textDefault,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async speakJavanese() {
      event.preventDefault();
      try {
        const speech = new Speech();
        speech.setLanguage("jv-ID");
        await speech.init({
          volume: 0.5,
          lang: "jv-ID",
          rate: 1,
          pitch: 1,
          name: "Microsoft Siti Online (Natural) - Javanese (Indonesia)",
          voiceURI: "Microsoft Siti Online (Natural) - Javanese (Indonesia)",
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("Event voiceschanged", voices);
            },
          },
        });
        speech
          .speak({
            text: this.textDefault,
          })
          .then(() => {
            console.log("Success !");
          });
        console.log(voice);
      } catch (err) {
        console.log(err);
      }
    },
    async translateToEnglish() {
      try {
        const res = await axios.post("http://localhost:8000/translate", {
          textDefault: this.translateDefault,
        });
        this.translatedText = res.data.data;
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    },
    async downloadTranslatedText() {
      try {
        const res = await axios.get(
          "http://localhost:8000/translate/downloadtxt",
          {
            responseType: "blob",
            textDef: this.translateDefault,
          }
        );
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "translated.txt");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.log(err);
      }
    },
    readFile() {
      this.file = this.$refs.doc.files[0];
      const reader = new FileReader();
      if (this.file.name.includes(".txt")) {
        reader.onload = (res) => {
          this.textDefault = res.target.result;
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
      } else {
        this.textDefault = "check the console for file output";
        reader.onload = (res) => {
          console.log(res.target.result);
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
      }
    },
  },
};
</script>

/* default : false lang : "id-ID" localService : false name : "Microsoft Gadis
Online (Natural) - Indonesian (Indonesia)" voiceURI : "Microsoft Gadis Online
(Natural) - Indonesian (Indonesia)" */

<template>
  <div class="container text-center mb-3 pb-3">
    <h1>Tekmul woy</h1>
  </div>
  <div class="container text-center mt-2 pt-2">
    <div class="col">
      <div class="card">
        <div class="card-header">Text-to-Speech</div>
        <div class="card-body grid gap-0 column-gap-2 p-2 m-2 g-col-6">
          <textarea
            class="form-control"
            id="floatingTextarea2Disabled"
            style="height: 100px"
            v-model="textDefault"
          ></textarea>
          <br />
          <div class="d-flex gap-2">
            <button @click="speakIndonesian()" class="btn btn-primary">
              Indonesian
            </button>
            <button @click="speakJavanese()" class="btn btn-primary">
              Javanese
            </button>
            <button @click="speakEnglish()" class="btn btn-primary">
              English
            </button>
            <div class="">
              <input class="form-control" type="file" id="formFile" ref="doc"
              @change="readFile()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br /><br />

  <div class="container text-center">
    <div class="mb-3 label-translate-container">
      <div class="pb-3 label-translate">
        <label for="">Translate</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">From</div>
          <div class="card-body">
            <textarea
              class="form-control"
              id="floatingTextarea2Disabled"
              style="height: 100px"
            ></textarea>
            <br />
            <div class="d-flex flex-row dropdown">
              <button
                type="button"
                class="btn btn-info dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Action
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Bahasa Indonesia</a></li>
                <li><a class="dropdown-item" href="#">English</a></li>
                <li>
                  <a class="dropdown-item" href="#">Bahasa Jawa</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">To</div>
          <div class="card-body grid gap-0 column-gap-2 p-2 m-2 g-col-6">
            <textarea
              class="form-control"
              id="floatingTextarea2Disabled"
              style="height: 100px"
              v-model="translateDefault"
            ></textarea>
            <br />
            <div class="d-flex gap-2">
              <button @click="translateToEnglish()" class="btn btn-primary">
                Translate
              </button>
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button @click="downloadTranslatedText()" class="btn btn-primary">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <div class="card">
      <div class="card-body">
        <div style="background-color: bisque">
          <h1>
            {{ translatedText }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.label-translate {
  font-size: larger;
}

.label-translate-container {
  background-color: beige;
}
</style>
