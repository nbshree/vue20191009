<template>
    <el-badge is-dot class="notice-area">
        <i name="notice" class="iconfont-antdesign icon-bell notice-area__icon"></i>
    </el-badge>
</template>

<script>
export default {
    name: 'notice'
};
</script>

<style lang="stylus" scoped>
.notice-area
    width: 26px
    height: 34px
    cursor: pointer
    transition: color .28s
    &__icon
        display: block
        color: #515151
        font-size: 28px
        margin-top: -14px
        &:hover
            color: #41b883
</style>
