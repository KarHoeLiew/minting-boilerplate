<template>
  <div>
    <b-container>
      <b-form v-if="currentPage==1">
        <b-row>
          <b-col cols="8">
            <b-form-group
              id="artwork-name"
              label="Artwork Name"
              label-for="input-1-1"
              valid-feedback="Name ok!"
              :invalid-feedback="invalidArtworkName"
              :state="input11State">
              <b-form-input
                id="input-1-1"
                v-model="$v.page1.artworkName.$model"
                :state="input11State"
                trim>
                </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols=4>
            <b-form-group
              id="artwork-price"
              label="Prices (ETH)"
              label-for="input-1-2"
              valid-feedback="Price ok!"
              :invalid-feedback="invalidPrice"
              :state="input12State">
              <b-form-input
                type="number"
                step="0.01"
                min="0.01"
                id="input-1-2"
                v-model="$v.page1.price.$model"
                :state="input12State"
                trim >
                </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-form-group
              id="artwork-description"
              label="Description"
              label-for="input-1-1"
              valid-feedback="Description ok!"
              :invalid-feedback="invalidArtworkName"
              :state="input11State">
              <b-form-input
                id="input-1-1"
                v-model="$v.page1.description"
                :state="input11State"
                trim>
                </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-form-group
              id="content-link"
              label="Downloadable Content Link"
              label-for="input-1-1"
              valid-feedback="link ok!"
              :invalid-feedback="invalidArtworkName"
              :state="input11State">
              <b-form-input
                id="input-1-1"
                v-model="$v.page1.link"
                :state="input11State"
                trim>
                </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-form-group
              id="collection"
              label="Collection"
              label-for="input-1-1"
              valid-feedback="link ok!"
              :invalid-feedback="invalidArtworkName"
              :state="input11State">
              <b-form-select
                v-model="$v.page1.collection"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>



        <b-btn @click="nextPage">Next Page</b-btn>
      </b-form>

      <b-form v-if="currentPage==2">
        <b-row>
          <b-col cols="5">
            <b-form-group
              id="trait-key"
              label="Trait Key"
              label-for="input-trait-key">
              <b-form-input
                ref="traitKey"
                id="input-1-1">
                </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="5">
            <b-form-group
              id="trait-value"
              label="Trait Value"
              label-for="input-trait-value">
              <b-form-input
                ref="traitValue"
                id="input-trait-value">
                </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="2">
            <b-btn @click="addKeyValueToList">Add</b-btn>
          </b-col>

        </b-row>

        <b-row>
          <b-col cols="12">
          <div>
            <b-table striped hover 
            :items="items"
            :fields="fields"
            >

              <template #cell(itemkey)="row">
                {{ row.value.key }}
              </template>

              <template #cell(itemvalue)="row">
                {{ row.value }}
              </template>


              <template #cell(actions)="row">
                <b-button size="sm" @click="removeKeyValue(row.item.index)"> Remove </b-button>
              </template>


            </b-table>
          </div>
          </b-col>

        </b-row>
        <b-btn @click="nextPage">Next Page</b-btn>
      </b-form>


      <b-form v-if="currentPage==3">
          <div
            class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${previewImage})` }"
            @click="selectImage">
          </div>
      
          <input
            ref="fileInput"
            type="file"
            @input="pickFile">


        <b-btn @click="nextPage">Next Page</b-btn>
      </b-form>




</b-container>

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
        description: "",
        link: "",
        collection: null
      },
      options: ["game", "seagame", "teagame"],
       items: [
          { index: 0,  key: 'Dickerson', value: 'Macdonald' },
        ],
        fields: [
          { key: 'key', label: 'Key' },
          { key: 'value', label: 'Value' },
          { key: 'actions', label: 'Actions' }
        ],
        previewImage: 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg',
        page3: {
          imageFile: {}
        }
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
        this.page1.isValid= true
        this.currentPage= this.currentPage+1
        console.log("ok, next page:", this.currentPage)
      }
    },
    reset(pageNumber){
      // reset the validations state and page content before back to previous page 
    console.log(pageNumber)
    },
    addKeyValueToList(){
    this.items.push({index: this.items.length, key: this.$refs.traitKey.vModelValue, value: this.$refs.traitValue.vModelValue})
    console.log("here", this.items)
    },
    removeKeyValue(index){
      this.items = this.items.filter(item => item.index != index);

    },
    selectImage () {
        this.$refs.fileInput.click();
    },
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files

      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        console.log("image", file[0]);
        this.page3.imageFile = file[0];
        reader.readAsDataURL(file[0]);
      }
    },
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

<style scoped lang="scss">
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>