<template>
  <div class="WizzardForm3">
    <div>
    <b-button v-b-modal.modal-center>Launch centered modal</b-button>

    <b-modal id="modal-center" centered title="Deploy Individual Artist / Project on Ethereum Test Network" hide-footer>
      <b-form @change="currentPage" v-if="showPageStatus(0)">
        <div class="my-4">
              <label>Project/Collectable Name</label>
              <b-form-input type="text" name="projectName" v-model="form.projectName" required></b-form-input>
              <br>
              <label>Project/Collectable Description</label>
              <b-form-input type="text" name="projectDesc" v-model="form.projectDesc" required></b-form-input>
              <br>
              <label>Beneficiary Wallet Address</label>
              <b-form-input type="text" name="walletAddress" v-model="form.walletAddress" required></b-form-input>
              <br>
              <div>
                <label for="range-1">Royalty Percentage For Secondary Sales</label>
                <b-form-input id="range-1" v-model="form.royaltyPercentage" type="range" min="0" max="100"></b-form-input>
                <div class="mt-2">Value: {{ form.royaltyPercentage }}</div>
              </div>
        </div>
      </b-form>
     <b-form @change="currentPage" v-if="showPageStatus(1)">
        <div class="my-4">
              <div>
              <div
                class="imagePreviewWrapper"
                :style="{ 'background-image': `url(${previewImage})` }"
                @click="selectImage">
              </div>
          
              <input
                ref="fileInput"
                type="file"
              
                @input="pickFile">
            </div>
        </div>
      </b-form>
     <b-form @change="currentPage" v-if="showPageStatus(2)">
        <div class="my-4">
          <h6>IMPORTANT</h6>
          <p>1. Please make sure everything you entered is correct as you will not be able to change these later</p><br>
          <p>2. Please note that all features provided on this site is currently experimental and may contain bugs. Proceed at your own risk</p><br>
          <p>3. If deploying to the main network on a blockchain, you will have to spend real cryptocurrencies. Only proceed if you’re absolutely certain</p><br>
          <p>4. Testnet transactions are usually done with fake / dummy / free testnet tokens which you can get on the testnet faucet</p><br>
          <p><b-form-checkbox v-model="form.checkedConsent">I HAVE READ AND AGREE TO THE TERMS AND CONDITIONS</b-form-checkbox></p>
        </div>
      </b-form>
         <b-button @click="prevPage" class="danger">Previous</b-button>
          <b-button  @click="nextPage" class="primary">Next</b-button>
    </b-modal>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "WizzardForm3",
  props: {},
  data(){
      return {
      form: {
          projectName: "",
          projectDesc: "",
          walletAddress: "",
          imageFile: {},
          royaltyPercentage: 0,
          checkedConsent: false 
      },
      previewImage: 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg',
      currentPage: 0,
      maxPage: 2,
      pages: [true, false, false],
      showDoneBtn: true
      }
  },
  methods: {
    nextPage() {
        if(this.currentPage + 1 <= this.maxPage) {
        this.currentPage++;
        this.pages[this.currentPage] = true;
        this.pages[this.currentPage -1] = false;

        }
        
    },
    prevPage() {
        if(this.currentPage -1 >= 0) {
            this.currentPage--;
            this.pages[this.currentPage] = true;
            this.pages[this.currentPage + 1] = false;
        }
    },
    showPageStatus(pageNumber){
        return this.pages[pageNumber];
      },
     selectImage () {
          this.$refs.fileInput.click()
      },
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
            this.form.imageFile = e.target.result
          }
          reader.readAsDataURL(file[0])
        }
      },
      onSubmit(){
        alert(JSON.stringify(this.form))
      }
  },
  computed:{}
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