<script>
import Speech from "speak-tts";
import axios from "axios";

export default {
  data() {
    return {
      textEnglish: "",
      textIndonesian: "",
      textJavanese: "",
      translateDefault: ""
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
          voice: "Google UK English Male",
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("Event voiceschanged", voices);
            },
          },
        });
        speech.speak({
          text: this.textIndonesian,
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
        speech.init({
          volume: 0.5,
          lang: "id-ID",
          rate: 1,
          pitch: 1,
          name: "Google Bahasa Indonesia",
          voiceURI: "Google Bahasa Indonesia",
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              // console.log("Event voiceschanged", voices);
            },
          },
        });
        speech.speak({
          text: this.textIndonesian,
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
        speech.init({
          volume: 0.5,
          lang: "jv-ID",
          rate: 1,
          pitch: 1,
          name: "Microsoft Dimas Online (Natural) - Javanese (Indonesia)",
          voiceURI: "Microsoft Dimas Online (Natural) - Javanese (Indonesia)",
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("Event voiceschanged", voices);
            },
          },
        });
        speech
          .speak({
            text: this.textIndonesian,
          })
          .then(() => {
            console.log("Success !");
          });
        console.log(voice);
      } catch (err) {
        console.log(err);
      }
    },
    async translateToEnglish(){
      try {
        await axios.post("http://localhost:8000/translate", {
          textDefault: this.translateDefault
        })
      }
      catch (err){
        console.log(err)
      }
    }
  },
};
</script>

<template>
  <div class="container text-center mb-3 pb-3">
    <h1>Tekmul woy</h1>
  </div>
  <div class="container text-center mt-2 pt-2">
    <!-- <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">English</div>
          <div class="card-body">
            <textarea
              class="form-control"
              id="floatingTextarea2Disabled"
              style="height: 100px"
              v-model="textEnglish"
            ></textarea>
            <br />
            <button
              @click="speakEnglish()"
              class="btn btn-primary"
              method="POST"
            >
              English
            </button>
          </div>
        </div>
      </div> -->
      <div class="col">
        <div class="card">
          <div class="card-header">Text-to-Speech</div>
          <div class="card-body grid gap-0 column-gap-2 p-2 m-2 g-col-6">
            <textarea
              class="form-control"
              id="floatingTextarea2Disabled"
              style="height: 100px"
              v-model="textIndonesian"
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
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col">
        <div class="card">
          <div class="card-header">Javanese</div>
          <div class="card-body">
            <textarea
              class="form-control"
              id="floatingTextarea2Disabled"
              style="height: 100px"
              v-model="textJavanese"
            ></textarea
            ><br />
            <button @click="speakJavanese()" class="btn btn-primary">
              Javanese
            </button>
          </div>
        </div>
      </div>
    </div> -->
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
              v-model="textEnglish"
            ></textarea>
            <br />
            <div class="d-flex gap-2">
            <button
            @click="speakEnglish()"
            class="btn btn-primary"
            method="POST"
            >
            English
          </button>
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
          </div>
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
