<template>
    <div class="dashboard-wrap">
        <el-row :gutter="20" style="margin-left: 15px;margin-right: 15px;">
            <el-col :xs="12" :sm="12" :lg="6">
                <div class="box1 widget-card">
                    <div class="leftPart">
                        <i class="iconfont-antdesign icon-team" />
                    </div>
                    <div class="rightPart">
                        <div class="number">428</div>
                        <div class="font-center">用户数量</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6">
                <div class="box2 widget-card">
                    <div class="leftPart">
                        <i class="iconfont-antdesign icon-appstore-fill" />
                    </div>
                    <div class="rightPart">
                        <div class="number">39</div>
                        <div class="font-center">App数量</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6">
                <div class="box3 widget-card">
                    <div class="leftPart">
                        <i class="iconfont-antdesign icon-cloud-download" />
                    </div>
                    <div class="rightPart">
                        <div class="number">8888</div>
                        <div class="font-center">更新下载</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6">
                <div class="box4 widget-card">
                    <div class="leftPart">
                        <i class="iconfont-antdesign icon-login" />
                    </div>
                    <div class="rightPart">
                        <div class="number">23607</div>
                        <div class="font-center">累积登录</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-left: 20px;margin-right: 20px;margin-top: 20px;">
            <el-card class="box-card">
                <div slot="header">
                    <span>14天内登录次数</span>
                </div>
                <div id="loginUserLineChart" :style="{ height: '400px' }"></div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dashboard',
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let loginUserLineChart = echarts.init(document.getElementById('loginUserLineChart'));
            // 绘制图表
            loginUserLineChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['4-10', '4-11', '4-12', '4-13', '4-14', '4-15', '4-16', '4-17', '4-18', '4-19', '4-20', '4-21', '4-22', '4-23']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [106, 135, 90, 126, 145, 129, 93, 116, 103, 132, 113, 139, 122, 143],
                        type: 'line',
                        smooth: true
                    }
                ]
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.flex-center
    display: flex
    justify-content: center
    align-items: center

box-style(bg)
    width  100%
    height  130px
    background  white
    display  flex
    margin-top  15px
    .leftPart
        background: bg
        width: 130px
        .iconfont-antdesign
            font-size: 64px
            color: #FFFFFF
        @extend .flex-center

    .rightPart
        flex: 1
        color: #99a9c0
        @extend .flex-center
        flex-direction: column
        .number
            font-size: 30px
            padding-bottom: 6px
        .font-center
            text-align: center

.dashboard-wrap
    margin: 0
    width: 100%
    height: 100%
    background-color: #eeeeee
    .box1
        box-style(#41b883)
    .box2
        box-style(#9ab7e0)

    .box3
        box-style(#f7c94d)
    .box4
        box-style(#e45f5f)
</style>
