<template>
    <!--服务管理-->
    <div class="doctorservermanage">
        <div class="addManag">
            <h4 class="tt">医生端服务管理
                <Button class="edit-btn" type="primary" v-if="!editFlag" @click="editFlag = true">编辑</Button>
                <Button class="edit-btn" type="primary" v-if="editFlag" @click="editFlag = false">取消</Button>
            </h4>
            <div class="fuwu">
                <!-- 医生服务-->
                <div class="xsfw" v-for="(item,index) of allServerList" :key='index'>
                    <h2 style='font-weight:bold;'>{{ item.name }}</h2>
                    <!--第一行-->
                    <div class="select_wufu" ref="all">
                        <template v-if="editFlag">
                            <div v-for="(items,index) in item.child" :key='index'>
                                <Checkbox v-model="items.flag">{{ items.menuName }}</Checkbox>
                            </div>
                        </template>

                        <template v-else-if="!editFlag">
                            <div v-if="items.selected == 1" v-for="(items,index) in item.child" :key='index'>
                                <label :for="'a' + items.id">{{ items.menuName }}</label>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <!--保存-->
            <div class="expert_save">
                <Button type="primary" v-if="editFlag" @click="navto">保存</Button>
                <Button type="primary" @click="reback">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            allServiceList: [],
            docServiceList: [],
            id: null,
            pageNo: null,
            searchKey: "",
            editFlag: false,
            
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2
        };
    },
    methods: {
        navto() {
            let arr = [];
            // 循环已操作的数据 找出已经选中数据的ID
            this.allServerList.forEach(item =>{
                item.child.forEach(i =>{
                    if(Boolean(i.flag)) {
                        arr.push(i.id)
                    }
                })
            })
            
            this.$axios
                .post(api.doctorServerManageUpdate, {
                    doctorId: parseInt(this.id),
                    menuIds: arr
                })
                .then(res => {
                    if (res.data.success) {
                        this.$Message.info("修改成功");
                        //   公用方法
                        setTimeout(()=>{
                            this.reback ()
                        }, 500)
                    }
                });
        },
        reback() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/doctormanage/list",
                {
                    pageNo: this.pageNo,
                    searchKey: this.searchKey,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.province = this.$route.query.province
            ? parseInt(this.$route.query.province)
            : null;
        this.city = this.$route.query.city
            ? parseInt(this.$route.query.city)
            : null;
        this.area = this.$route.query.area
            ? parseInt(this.$route.query.area)
            : null;
        this.hospital = this.$route.query.hospital
            ? parseInt(this.$route.query.hospital)
            : null;

        this.$axios
            .post(api.doctorServerManage)
            .then(resp => {
                if (resp.data.success) {
                    let tmpData = resp.data.object;
                    this.allServiceList = tmpData;
                }
            })
            .catch(err => {
                console.log(err);
            });
        let param = {};
        param.doctorId = this.id;
        this.$axios
            .post(api.doctorServerManageById, param)
            .then(resp => {
                this.docServiceList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctormanage/list",
                title: "医生管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    computed: {
        allServerList() {
            for (let i = 0; i < this.allServiceList.length; i++) {
                //循环获取child
                for (let j = 0; j < this.allServiceList[i].child.length; j++) {
                    //循环child对比id
                    let index = this.docServiceList.indexOf(
                        this.allServiceList[i].child[j].id
                    );
                    if (index != -1) {
                        this.allServiceList[i].child[j].selected = 1;
                        this.allServiceList[i].child[j].flag = true
                    } else {
                        this.allServiceList[i].child[j].selected = 0;
                        this.allServiceList[i].child[j].flag = false
                    }
                }
            }
            // console.log(this.allServiceList);
            return this.allServiceList;
        }
    }
};
</script>

<style scoped lang="less">
.doctorservermanage {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .addManag {
        display: flex;
        flex-direction: column;
        padding: 20px;
        .tt {
            padding-left: 4px;
            border-left: 2px solid #2d8cf0;
            position: relative;
            line-height: 32px;
            .edit-btn {
                position: absolute;
                right: 0;
                height: 32px;
            }
        }
        .fuwu {
            width: calc(100% - 100px);
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid rgb(242, 242, 242);
            .xsfw {
                margin: 10px 0;
                .select_wufu {
                    margin: 0 30px;
                    display: flex;
                    flex-direction: row;
                    padding: 14px 20px;
                    align-items: center;
                    flex-wrap: wrap;
                    div {
                        width: 20%;
                        margin: 10px 20px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        input {
                            outline: none;
                            border: none;
                        }
                    }
                    .fuwu {
                        width: calc(100% - 100px);
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        border-bottom: 1px solid rgb(242, 242, 242);
                        .xsfw {
                            margin: 10px 0;
                            .select_wufu {
                                margin: 0 30px;
                                display: flex;
                                flex-direction: row;
                                padding: 14px 20px;
                                align-items: center;
                                flex-wrap: wrap;
                                div {
                                    width: 20%;
                                    margin: 10px 20px;
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                    input {
                                        outline: none;
                                        border: none;
                                    }
                                    label {
                                        user-select: none;
                                    }
                                }
                            }
                        }
                    }
                    .expert_save {
                        width: 200px;
                        height: 50px;
                        margin: 10px auto;
                        //   display: flex;
                        //   flex-direction: row;
                        //   justify-content: space-between;
                    }
                }
            }
        }
    }
}
</style>