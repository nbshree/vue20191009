<template>
    <div class="notfound-wrap">
        <div class="content">
            <div class="title"><span>403</span> 无效的访问</div>
            <div class="sub">您没有访问该页面的权限.</div>
            <!--<el-button type="primary" @click="returnPrevPage">返回首页</el-button>-->
            <el-button type="primary" @click="returnPrevPage" plain>返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'page403',
  methods: {
    returnPrevPage () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.notfound-wrap
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    transform: translateY(-80px)
    .content
        text-align: right
        .title
            -webkit-font-smoothing: antialiased
            color: #73b99a
            font-size: 100px
            span
                font-size: 240px
        .sub
            font-size: 30px
            color: #ccc
            padding-bottom: 50px
</style>
