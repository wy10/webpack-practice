<template>
    <div id="login" @click="gotoPage">这里是登录页面</div>
</template>
<script>

export default {
 methods:{
     gotoPage(){
         this.$router.push("/detail")
     }
 }
}
</script>
<style lang="less" scoped>

@import url('../style/style.less');
</style>
