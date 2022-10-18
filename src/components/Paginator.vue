<template>
<ul class="flex gap-2 m-2" v-if="availablePages.length > 1">
  <li v-if="previousPage" @click="$emit('pageChanged', previousPage)" class="paginator-button paginator-button-prev" role="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
  </svg>
  </li>
  <li v-for="(page, index) in availablePages" :key="index" >
    <div @click="$emit('pageChanged', page)" role="button" v-if="page !== 'separator'"
      class="paginator-button"
      :class="{'active': active(page)}">
      {{ page }}
    </div>
    <div v-else class="paginator-button paginator-button-elipse">...</div>
  </li>
  <li v-if="nextPage" @click="$emit('pageChanged', nextPage)" class="paginator-button paginator-button-next" role="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
</svg>
  </li>
</ul>
</template>

<script lang="ts">
export default {
  methods: {
    active(page: number) {
      return page === this.currentPage
    }
  },
  emits: ['pageChanged'],
  props:  {
    currentPage: {
      type: Number,
      default: 1
    }, 
    total :  {
      type: Number,
      required: true
    }, 
    perPage :  {
      type: Number,
      required: true
    },  
    onEachSide: {
      type: Number,
      default: 2
    },
    onPageChanged : Function
  },
  computed: {
      availablePages() {
        let pages = [1] as Array<any>
        let i = - this.onEachSide
        if(this.currentPage + i > 2) pages.push(0)
        for(; i <= this.onEachSide; i++) {
          pages.push(this.currentPage + i)
        }
        if(pages[pages.length - 1] < this.lastPage - 1 ) pages.push(0)
        pages.push(this.lastPage)
        return  pages.filter((val, index, self) => {
          return (self.indexOf(val) === index && val > 0 && val <= this.lastPage) || val === 0;
        })

      },
      lastPage() {
        return Math.ceil(this.total! / this.perPage)
      },
      previousPage() {
        return this.currentPage === 1 ? null : this.currentPage - 1
      },
      nextPage() {
        return this.currentPage === this.lastPage ? null : this.currentPage + 1
      },
  },
 
}
</script>


