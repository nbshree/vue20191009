<template>
    <div class="tags-view">
        <div ref="tagsView" class="tags-outer" @mousewheel="handlescroll" @DOMMouseScroll="handlescroll">
            <!--右侧按钮操作区域-->
            <div class="tags-handle">
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button type="primary"> {{ $t('tags.handle') }}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="closeOther">{{ $t('tags.closeOthers') }}</el-dropdown-item>
                        <el-dropdown-item command="closeAll">{{ $t('tags.closeAll') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!--标签页主要显示区域-->
            <div ref="tagsScroll" class="tags-inner" :style="{ left: tagsScrollLeft + 'px' }">
                <el-tag
                    ref="tag"
                    size="large"
                    color="white"
                    v-for="(tag, index) in visitedViews"
                    :key="tag.path"
                    :closable="true"
                    :class="tag.name === currentViewName ? 'el-tag-active' : ''"
                    @close="closeView($event, tag, index)"
                    @click.native="jumpTo(tag)"
                    @contextmenu.prevent.native="openMenu($event, tag, index)"
                >
                    {{ $t(`route.${tag.name}`) }}
                </el-tag>
            </div>
        </div>
        <!--鼠标右键按钮操作区域-->
        <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="tags-menu">
            <li @click="refresh(selectedTag)">{{ $t('tags.refresh') }}</li>
            <li @click="closeView($event, selectedTag, selectedIndex)">{{ $t('tags.close') }}</li>
            <li @click="closeOtherView">{{ $t('tags.closeOthers') }}</li>
            <li @click="closeAllView(selectedTag)">{{ $t('tags.closeAll') }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'tagsView',
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            selectedIndex: 0,
            tagsScrollLeft: 0,
            tags: [],
            currentViewName: ''
        };
    },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews;
        }
    },
    watch: {
        $route() {
            this.addView();
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu);
            } else {
                document.body.removeEventListener('click', this.closeMenu);
            }
        }
    },
    mounted() {
        this.addView();

        setTimeout(() => {
            let currTagIndex = null;
            this.visitedViews.forEach((view, index) => {
                view.name === this.$route.name ? (currTagIndex = index) : null;
            });
            currTagIndex ? this.moveToView(this.$refs.tag[currTagIndex].$el) : null;
        }, 1);
    },
    methods: {
        openMenu(event, tag, index) {
            this.left = event.clientX;
            this.top = event.clientY;
            this.visible = true;
            this.selectedTag = tag;
            this.selectedIndex = index;
        },
        closeMenu() {
            this.visible = false;
        },
        refresh(view) {
            this.$store.dispatch('remove', view).then(() => {
                this.$nextTick(() => {
                    this.$router.replace({
                        path: '/redirect' + view.path
                    });
                });
            });
        },
        moveToView(tagEle) {
            if (tagEle.offsetLeft < -this.tagsScrollLeft) {
                this.tagsScrollLeft = -tagEle.offsetLeft + 10;
            } else if (
                tagEle.offsetLeft + 10 > -this.tagsScrollLeft &&
                tagEle.offsetLeft + tagEle.offsetWidth < -this.tagsScrollLeft + this.$refs.tagsView.offsetWidth - 100
            ) {
                this.tagsScrollLeft = Math.min(0, this.$refs.tagsView.offsetWidth - 100 - tagEle.offsetWidth - tagEle.offsetLeft - 20);
            } else {
                this.tagsScrollLeft = -(tagEle.offsetLeft - (this.$refs.tagsView.offsetWidth - 100 - tagEle.offsetWidth) + 15);
            }
        },
        addView() {
            const route = this.$route;
            if (!route.name) {
                return false;
            }
            this.currentViewName = route.name;
            this.$store.dispatch('add', route);
        },
        async closeView(event, tagObj, tagIndex) {
            const visitedViews = await this.$store.dispatch('remove', tagObj);
            if (this.currentActive(tagObj)) {
                const nextTag = visitedViews.slice(tagIndex)[0];
                const prevTag = visitedViews.slice(tagIndex - 1)[0];
                if (nextTag) {
                    this.$router.push(nextTag.path);
                    this.currentViewName = nextTag.name;
                } else if (prevTag) {
                    this.$router.push(prevTag.path);
                    this.currentViewName = prevTag.name;
                } else {
                    this.$router.push('/');
                    this.currentViewName = 'dashboard';
                }
            }
        },
        closeOtherView() {
            if (this.visitedViews.length === 1) return;
            const router = this.selectedTag;
            router.meta = {
                title: router.title
            };
            this.$store.dispatch('closeOther', router);
            this.tagsScrollLeft = 0;
            this.currentViewName = router.name;
        },
        closeAllView() {
            this.$store.dispatch('closeAll');
            this.$router.push('/');
            this.currentViewName = 'dashboard';
            this.tagsScrollLeft = 0;
        },
        currentActive(tagObj) {
            return tagObj.name === this.$route.name || tagObj.path === this.$route.path;
        },
        jumpTo(tag) {
            this.$router.push(tag.path);
            this.currentViewName = tag.name;
        },
        async handleCommand(command) {
            const router = this.$route;
            switch (command) {
                case 'closeOther':
                    if (this.visitedViews.length === 1) break;
                    this.$store.dispatch('closeOther', router);
                    this.tagsScrollLeft = 0;
                    this.currentViewName = router.name;
                    break;
                case 'closeAll':
                    await this.$store.dispatch('closeAll');
                    this.$router.push('/');
                    this.currentViewName = 'dashboard';
                    this.tagsScrollLeft = 0;
                    break;
            }
        },
        getTitle(title) {
            if (this.$te(`route.${title}`)) {
                return this.$t(`route.${title}`);
            }
            return title;
        },
        handlescroll(event) {
            let type = event.type;
            let delta = 0;
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0) * 40;
            }
            let left = 0;
            if (delta > 0) {
                left = Math.min(0, this.tagsScrollLeft + delta);
            } else {
                if (this.$refs.tagsView.offsetWidth - 100 < this.$refs.tagsScroll.offsetWidth) {
                    if (this.tagsScrollLeft < -(this.$refs.tagsScroll.offsetWidth - this.$refs.tagsView.offsetWidth + 100)) {
                        left = this.tagsScrollLeft;
                    } else {
                        left = Math.max(this.tagsScrollLeft + delta, this.$refs.tagsView.offsetWidth - this.$refs.tagsScroll.offsetWidth - 100);
                    }
                } else {
                    this.tagsScrollLeft = 0;
                }
            }
            this.tagsScrollLeft = left;
        }
    }
};
</script>

<style lang="stylus">
@import "../../../../assets/styl/variables.styl"

.tags-handle
    .el-button--medium
        padding: 12px 16px
        border-radius: 0

.tags-inner
    .el-tag
        transition: all .3s
        border-radius: 2px
        cursor: pointer
        border: 1px solid tag-border
        color: tag-color
        margin: 1px 4px 0 0

        &:hover
            color: tag-active-bg

    .el-icon-close
        color: tag-close

    .el-tag-active
        background-color: tag-active-bg !important
        color: tag-active-color

        &:hover
            color: tag-active-color

        .el-icon-close
            transition: all .3s
            color: tag-active-color

            &:hover
                background-color: tag-active-color
                color: tag-active-bg
</style>

<style lang="stylus" scoped>
@import "../../../../assets/styl/variables.styl"

.tags-view
    background: tags-bar-color
    height: 40px
    width: 100%
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04)
    border-top: 1px solid #e6e6e6
    box-sizing: border-box

    .tags-menu
        margin: 0
        background: #fff
        z-index: 999
        position: absolute
        list-style-type: none
        padding: 5px 0
        border-radius: 4px
        font-size: 12px
        font-weight: 400
        color: #333
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3)

        li
            margin: 0
            padding: 7px 16px
            cursor: pointer

            &:hover {
                background: #eee;
            }

    .tags-outer
        width: 100%
        height: 100%
        position: relative
        box-sizing: border-box
        padding-right: 120px

        &:hover
            background: #eee

    .tags-handle
        overflow: hidden
        width: 108px
        height: 100%
        position: absolute
        right: 0
        top: 0
        box-sizing: border-box
        text-align: center
        background: white
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1)
        z-index: 10

    .tags-inner
        height: 100%
        overflow: visible
        white-space: nowrap
        position: absolute
        box-sizing: border-box
        padding: 2px 10px
        transition: left .3s ease
</style>
