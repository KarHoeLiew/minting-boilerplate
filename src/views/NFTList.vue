<template>
  <div>
    <h1>NFT List</h1>
    <b-table :items="nfts"></b-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nfts:[]
    }


  }

}
</script>

<style>

</style>