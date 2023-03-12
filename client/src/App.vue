<script>
import Speech from "speak-tts";
import axios from "axios";
import fileDownload from "js-file-download";

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
      langOption: null,
      audioCreated: false,
      lang: null,
      voiceName: null
    };
  },
  methods: {
    async speechCreate() {
      let speech;

      if (this.langOption == "ID") {
        speech = new Speech();
        this.lang = "id-ID";
        this.voiceName = "Google Bahasa Indonesia";
      } else if (this.langOption == "EN") {
        speech = new Speech();
        this.lang = "en-GB";
        this.voiceName = "Google UK English Female";
      } else if (this.langOption == "JV") {
        speech = new Speech();
        speech.setLanguage("jv-ID");
        this.lang = "jv-ID";
        this.voiceName = "Microsoft Siti Online (Natural) - Javanese (Indonesia)";
      } else if (this.langOption == "FR") {
        speech = new Speech();
        speech.setLanguage("fr-FR");
        this.lang = "fr-FR";
        this.voiceName = "Microsoft Eloise Online (Natural) - French (France)";
      }
      await speech.init({
        volume: 0.5,
        lang: this.lang,
        rate: 1,
        pitch: 1,
        name: this.voiceName,
        voiceURI: this.voiceName,
        splitSentences: true,
      });
      speech.speak({
        text: this.textDefault,
      });

      // const blob = await speech.toBlob(this.textDefault);
      // const url = URL.createObjectURL(blob);

      // const downloader = new FileDownloader();
      // downloader.download(url, "audio.mp3", "audio/mpeg");
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
    clearText() {
      this.textDefault = "";
    },
    async audioDownload() {
      event.preventDefault();
      if (speech) {
        const audioBlob = await speech.speakToFile({
          text: this.textDefault,
          format: "audio/wav",
        });
        const downloader = new FileDownloader();
        downloader.download(audioBlob, "audio.wav");
      }
    },
    async downloadAudio() {
      try {
        const response = await axios.post(
          "http://localhost:8000/speech",
          {
            textDefault: this.textDefault,
            langOption: this.langOption,
          },
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${this.textDefault.replace(/\s+/g, "_")}.mp3`
        );
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
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
          <div class="d-flex gap-2 lang-select">
            <button @click="speechCreate()" class="btn btn-primary">
              Speak
            </button>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="langOption"
              @change=""
            >
              <option selected disabled>Select a language</option>
              <option value="ID">Bahasa Indonesia</option>
              <option value="EN">Bahasa Inggris</option>
              <option value="JV">Bahasa Jawa</option>
              <option value="FR">Bahasa Perancis</option>
            </select>
            <div class="doc-select">
              <input
                class="form-control"
                type="file"
                id="formFile"
                ref="doc"
                @change="readFile()"
              />
            </div>
            <div class="d-flex flex-row">
              <button @click="clearText()" class="btn btn-primary">
                Clear
              </button>
            </div>
            <div class="d-flex flex-row">
              <button @click="audioDownload()" class="btn btn-primary">
                Download
              </button>
            </div>
            <!-- <button @click="()" class="btn btn-primary">
              Stop
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.lang-select {
  width: 700px;
}

.doc-select {
  width: 900px;
}
</style>
