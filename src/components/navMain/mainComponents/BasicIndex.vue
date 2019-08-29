<template>
  <div>
    <h1>Welcome</h1>
    <button @click="qrysrcsys()">请求</button>
  </div>
</template>

<script>
export default {
  name: 'BasicIndex',
  methods:{
    qrysrcsys() {
      this.axios.get('/api/srcsys/querysrcsys').then((response)=> {
        console.log(response.data);
      }).catch((response)=> {
        console.log(response.data);
      })
    }
  }
}
</script>

<style scoped>

</style>
