<template>
  <div class='detailC'>
      
      <p>
        <h2 v-text='$store.state.selectedItem.companyName'></h2>
      </p>
      <p>
          <span>公司简介</span>
      </p>
      <p>
          <p v-text='$store.state.selectedItem.conpanyDescribe'></p>
      </p>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.detailC{
}
</style>

