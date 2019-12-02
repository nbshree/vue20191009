<template>
    <el-container>
        <!--头部栏-->
        <el-header>
            <nav-bar />
        </el-header>
        <el-container>
            <!--侧边导航-->
            <el-aside :width="asideWidth">
                <side-bar class="sidebar-container" />
            </el-aside>
            <!--主页面-->
            <el-main>
                <tags-view />
                <app-main />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { appMain, navbar, sidebar, tagsView } from './components';

export default {
    name: 'Layout',
    components: {
        'app-main': appMain,
        'nav-bar': navbar,
        'side-bar': sidebar,
        'tags-view': tagsView
    },
    computed: {
        asideWidth() {
            return this.$store.getters.getSliderStateWidth;
        }
    }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/variables.styl"

.el-container
    width: 100%
    height: 100%

.el-header
    padding: 0
    font-size: 0
    line-height: 60px
    background: white
    box-sizing: border-box
    overflow: hidden

.el-aside
    transition: width .3s
    background: el-aside-bg
    color: el-aside-color
    overflow: hidden

.el-main
    padding: 0
    height: 100%
    overflow: auto
</style>
