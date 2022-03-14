<template>
  <div>
    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <b-form v-if="currentPage==1">
        <b-row>
          <b-col cols="6">
            <b-form-group
              id="artwork-name"
              description="Let us know your artwork name."
              label="Artwork Name"
              label-for="input-1-1"
              valid-feedback="Name ok!"
              :invalid-feedback="invalidArtworkName"
              :state="input11State"
            >
              <b-form-input
                id="input-1-1"
                v-model="$v.page1.artworkName.$model"
                :state="input11State"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols=6>
            <b-form-group
              id="artwork-price"
              description="Let us know your artwork price."
              label="Prices (ETH)"
              label-for="input-1-2"
              valid-feedback="Price ok!"
              :invalid-feedback="invalidPrice"
              :state="input12State"
            >
              <b-form-input
                type="number"
                step="0.01"
                min="0.01"
                id="input-1-2"
                v-model="$v.page1.price.$model"
                :state="input12State"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-btn @click="nextPage">Next Page</b-btn>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
const { required, minLength, minValue } = require('vuelidate/lib/validators')

export default {
  data() {
    return {
      currentPage: 1,

      page1: {
        isValid: false, // use this to control the wizard
        artworkName: "",
        price: 0.25,
      },
    };
  },

  validations:{
    page1: {
      artworkName: {required, minLength: minLength(4)},
      price: {required, minLength: minValue(0.01)},

    }

  },

  methods: {
    nextPage(){
      
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.page1.isValid= false
        // this.submitStatus = 'ERROR'
        console.log("invalid input. check again")
      } 
      
      else {
        this.page1.isValid= false
        this.currentPage= this.currentPage+1

        console.log("ok, next page:", this.currentPage)

        

      }


    },

    reset(pageNumber){
      // reset the validations state and page content before back to previous page 
    console.log(pageNumber)
    }
  },
  computed: {
    invalidArtworkName() {
      if (this.page1.artworkName.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },

    invalidPrice() {
      if (this.page1.price <= 0) {
        return "Enter price more than 0.01 ETH";
      }
      return "Please enter something.";
    },

    input11State() {
      // input-1-1
      return this.page1.artworkName.length >= 4;
    },

    input12State() {
      // input-1-1
      return this.page1.price > 0.01;
    },
  },
};
</script>

<style>
</style>