<template>
    <div class="liveAdd">
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="24">
                <h3 style='margin-bottom:20px;'>查看点播</h3>
            </Col>
        </Row>
        <!-- 点播 -->
        <div>
            <!-- 主讲人 -->
            <div class="live">
                <span class="i">
                    <b style="color:red;"></b>主讲人：
                </span>
                <b class="weight">{{ live.doctorName }}</b>
            </div>
            <!-- 标题 -->
            <div class="live">
                <span class="i">标&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                <b class="weight">{{ live.title }}</b>
            </div>
            <!-- 首页图片 -->
            <div class="live">
                <span class="i">首页图片：</span>
                <img :src="this.fileBaseUrl + pictureFormat(images)" alt class="imgUrl">
            </div>
            <!-- 原始价格 -->
            <div class="live">
                <span class="i">原始价格：</span>
                <b class="weight">{{ live.originPrice }}</b>
            </div>
            <!-- 折后价格 -->
            <div class="live">
                <span class="i">折后价格：</span>
                <b class="weight">{{ live.discountPrice }}</b>
            </div>
            <!-- 推广力度 -->
            <div class="live">
                <span class="i">推广力度：</span>
                <b class="weight">{{ live.fictitiousNum }}</b>
            </div>
            <!-- 课堂类型 -->
            <div class="live">
                <span class="i">课堂类型：</span>
                <b class = 'weight'>{{ live.modalDataVal }}</b>
            </div>
            <!-- 播放来源 -->
            <div class="live">
                <span class="i">播放来源：</span>
                 <b class="weight">{{ live.videoSourceTest }}</b>
            </div>
            <!-- 文件路径 -->
            <div class="live" v-if="live.videoSource==1">
                <span class="i">文件路径：</span>
                <b class="weight">{{ live.playbackAddress }}</b>
            </div>
            <!-- 上传的视频 -->
            <div class="live" v-else>
                <span class="i">播放地址</span>
                <video-play :src="live.filePath" :poster="poster" :videoStyle="videoStyle"></video-play>
            </div>
            
            <!-- 课堂介绍 -->
            <div class="live">
                <span class="i">课堂介绍</span>
                <div class="shuru">
                    <vueEditor
                        id="editor_id"
                        :textHtml="live.introduce"
                        :urlCode="urlCode"
                        @valueHandle="afterChange"
                        :height='300'
                    ></vueEditor>
                </div>
            </div>
            <!-- 原因 -->
            <div class="live" v-if="playStatus == 3">
                <p style='color:red;margin:10px 0;'><span style='color:black;'>审核未通过原因：</span>{{ reason }}</p>
            </div>
        </div>
        <!-- 保存 -->
        <!--1待审核
            2审核通过
            3审核未通过
            4下架 -->
        <div style="margin-top:20px;">
            <Button type="primary" @click="saveLive" v-if="playStatus == 1">审核通过</Button>
            <Button @click="modal1 = true" v-if="playStatus == 1">审核不通过</Button>
            <Button @click="backLive(4)" type="primary" v-if="playStatus == 2">下架</Button>
            <Button @click="back">返回</Button>
        </div>

        <Modal
            v-model="modal1"
            title="审核不通过原因"
            :mask-closable="false"
            @on-ok="backLive(3)">
            <div class="live">
                <span class="i">原因</span>
                <Input v-model="reason" type="textarea" :rows="4" placeholder="请输入审核不通过原因" />
            </div>
        </Modal>
        
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import vueEditor from "@/components/vueEditor";
import videoPlay from "@/components/videoPlayer";
export default {
    components:{
        vueEditor,
        videoPlay
    },
    data() {
        return {
            // 新增直播/点播
            status: "",
            // 检索医生列表
            doctorList: [],
            // 上传图片相关
            defaultList: [],
            images: "",
            urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
            // 点播
            live: {
                // 课堂介绍
                introduce:"",
                // 输入值
                search: "",
                // 主讲人名字
                doctorName: "",
                // 主讲人ID
                doctorId: "",
                // 点播标题
                title: "",
                // 原始价格
                originPrice: null,
                // 折后价格
                discountPrice: null,
                // 推广力度
                fictitiousNum: null,
                // 播放地址
                playbackAddress: "",
                // 文件路径
                filePath: "",
                // 播放来源
                videoSource: 1,
                videoSourceTest:"",
                // 课堂类型
                modalDataVal: ""
            },
            liveType: [],
            videoList: [
                {
                    id: 1,
                    name: "网站地址"
                },
                {
                    id: 2,
                    name: "本地上传"
                }
            ],
            id: "",
            reason: "",
            playStatus: "",
            poster: "",
            videoStyle: { width: "400px", height: "300px" },
            modal1: false,
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
            },
            {
                path: "/index/operation/physicianAudit/list",
                title: "讲堂审核"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let query = this.$route.query;
        this.id = query.id;
        this.playStatus = query.playStatus;

        this.$axios
            .post(api.lecturedemandselectbyid, {
                id: this.id
            })
            .then(res => {
                if (res.data.success) {
                    let ret = res.data.object;
                    // 医生信息
                    this.live.doctorName = ret.doctorName;
                    this.live.doctorId = ret.doctorId;
                    // 价格
                    this.live.originPrice = ret.originalPrice;
                    this.live.discountPrice = ret.discountPrice;
                    // 路径
                    this.live.playbackAddress = ret.playbackAddress;
                    // 播放地址
                    if(Boolean(ret.filePath)){
                        this.videoStatus = true;
                        this.live.filePath = this.fileBaseUrl + ret.filePath
                    }
                    // 标题
                    this.live.title = ret.title;
                    // 拒绝原因
                    this.reason = ret.reason;
                    // 课堂介绍
                    this.live.introduce = ret.introduce
                    // 来源
                    this.videoList.forEach(item => {
                        if(ret.videoSource == item.id) {
                            this.live.videoSource = item.id
                            this.live.videoSourceTest=item.name
                        }
                    })
                    // 推广力度
                    this.live.fictitiousNum = ret.fictitiousNum;
                    // 课堂类型
                    this.live.modalDataVal = ret.type;
                    this.live.modalDataVal = this.$route.query.columnName
                    // 图片
                    if (ret.headImg) {
                        this.images = ret.headImg;
                    }
                } else {
                    this.$Message.error("查询点播详情失败");
                }
            });
    },
    methods: {
        afterChange(val) {
            this.live.introduce = val;
        },
        // 保存
        saveLive() {
            this.$axios
                .post(api.lecturedemandupdateplaystatus, {
                    playStatus: 2,
                    id: this.id,
                    reason: this.reason
                })
                .then(res => {
                    if (res.data.success) {
                        let ret = res.data.object;
                        this.$Message.info("审核成功");
                        setTimeout(() => {
                            let query = this.$route.query;
                            this.functionJS.queryNavgationTo(
                                this,
                                "/index/operation/physicianAudit/list",
                                query
                            );
                        }, 800);
                    } else {
                    }
                });
        },
        // 后退
        backLive(index) {
            if (!Boolean(this.reason)) {
                this.$Message.error("请输入拒绝原因");
                return "";
            }
            this.$axios
                .post(api.lecturedemandupdateplaystatus, {
                    playStatus: index,
                    id: this.id,
                    reason: this.reason
                })
                .then(res => {
                    if (res.data.success) {
                        let ret = res.data.object;
                        this.$Message.info("操作成功");
                        console.log(ret);
                        setTimeout(() => {
                            let query = this.$route.query;
                            this.functionJS.queryNavgationTo(
                                this,
                                "/index/operation/physicianAudit/list",
                                query
                            );
                        }, 800);
                    } else {
                    }
                });
        },
        // 返回上一步
        back () {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/physicianAudit/list",
                query
            );
        }
    }
};
</script>
<style lang="less" scoped>
.live {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
        span {
            display: inline-block;
            min-width: 30px;
            margin-right: 30px;
        }
    }
.shuru {
    div {
        margin: 0;
    }
}
.liveAdd {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .live {
        width: 700px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
        span {
            display: inline-block;
            min-width: 60px;
            margin-right: 30px;
        }
        .imgUrl {
            width: 150px;
            height: 100px;
        }
        .weight {
            font-size: 18px;
        }
    }
}
</style>
