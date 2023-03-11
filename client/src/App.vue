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
      langOption: null,
    };
  },
  methods: {
    async speechCreate() {
      if (this.langOption == "ID") {
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
      } else if (this.langOption === "EN") {
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
      } else if (this.langOption === "JV") {
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
      } else if (this.langOption === "FR") {
        const speech = new Speech();
        speech.setLanguage("fr-FR");
        await speech.init({
          volume: 0.5,
          lang: "fr-FR",
          rate: 1,
          pitch: 1,
          name: "Microsoft Eloise Online (Natural) - French (France)",
          voiceURI: "Microsoft Eloise Online (Natural) - French (France)",
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
      }
    },
    async speakArabic() {
      event.preventDefault();
      try {
        const speech = new Speech();
        speech.setLanguage("jv-ID");
        await speech.init({
          volume: 0.5,
          lang: "jv-ID",
          rate: 1,
          pitch: 1,
          name: "Microsoft Eloise Online (Natural) - French (France)",
          voiceURI: "Microsoft Eloise Online (Natural) - French (France)",
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
              <option selected>Open this select menu</option>
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
