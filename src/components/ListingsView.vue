<template>
  <div class="listings">
    <h1>Listings</h1>
    <listing v-for="listing in listings" :data="listing" :key="listing['ID']"></listing>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Listing from '@/components/Listing.vue';
import axios from 'axios';

export default defineComponent({

  name: 'ListingsView',
  components: {
    Listing
  },
  data() {
    return {
      listings: [],
    };
  },

  created() {
    this.getListings();
  },
  
  methods: {
    getListings() {
      axios.get('getAll')
        .then(response => {
          this.listings = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
