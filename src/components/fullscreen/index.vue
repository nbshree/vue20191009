<template>
    <div class="el-fullscreen" @click="handleScreenFull">
        <i class="el-fullscreen__icon" :class="[iconClass]"></i>
    </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
    name: 'fullscreen',
    props: {
        enabled: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            iconClass: 'iconfont-antdesign icon-fullscreen',
            status: false
        };
    },
    methods: {
        handleScreenFull() {
            if (!this.enabled) return null;
            if (screenfull.enabled) {
                screenfull.on('change', () => {
                    if (screenfull.isFullscreen) {
                        this.iconClass = 'iconfont-antdesign icon-fullscreen-exit';
                    } else {
                        this.iconClass = 'iconfont-antdesign icon-fullscreen';
                    }
                });
            } else {
                this.$message({
                    message: 'fullscreen can not work',
                    type: 'warning'
                });
                return false;
            }

            screenfull.toggle();
        }
    }
};
</script>

<style lang="stylus" scoped>
.el-fullscreen
    color: #515151
    cursor: pointer
    &__icon
        font-size: 28px
    &:hover
        color: #41b883
</style>
