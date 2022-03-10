<template>
  <div class="wizzardForm">
    <div>
    <b-button v-b-modal.modal-center>Launch centered modal</b-button>

    <b-modal id="modal-center" centered title="Deploy Individual Artist / Project on Ethereum Test Network">
        <p class="my-4" @change="currentPage" v-if="showPageStatus(0)">first centered modal!</p>
        <p class="my-4" @change="currentPage" v-else-if="showPageStatus(1)">second modal!</p>
        <p class="my-4" @change="currentPage" v-else-if="showPageStatus(2)">Third modal!</p>
        <template #modal-footer>
        <b-button @click="prevPage" class="danger">prev</b-button>
         <b-button @click="nextPage" class="primary">Next</b-button>
        </template>
    </b-modal>
    

    </div>
  </div>
</template>

<script>
export default {
  name: "WizzardForm",
  props: {},
  data(){
      return {
      currentPage: 0,
      maxPage: 2,
      pages: [true, false, false]
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
      }
  },
  computed:{}
};
</script>

<style>
</style>
