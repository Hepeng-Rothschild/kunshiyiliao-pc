<template>
    <div class="mechanismregEdit">
        <div class="container">
            <!-- title -->
			<div class="container-main">
                <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="80"
                >
                    <!-- 区域 -->
                    <div class="region">
                        <div class="left">
                            <span style="color:red;">*</span>
                            <span>区域：</span>
                        </div>
                        <!-- 省 -->
                        <FormItem prop="provinceCode">
                            <Select
                                v-model="formValidate.provinceCode"
                                @on-change="provChange"
                                style="width:80px"
                            >
                                <Option
                                    v-for="item in provList"
                                    :value="item.id"
                                    :key="item.value"
                                    style='text-align:center;'
                                >{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <!-- 市 -->
                        <FormItem prop="cityCode">
                            <Select
                                v-model="formValidate.cityCode"
                                @on-change="cityChange"
                                style="width:80px;margin:0 10px;"
                            >
                                <Option
                                    v-for="item in cityList"
                                    :value="item.id"
                                    :key="item.city"
                                    style='text-align:center;'
                                >{{ item.city }}</Option>
                            </Select>
                        </FormItem>
                    </div>
					<!-- 机构名称 -->
					<div class="address">
						<div class="left">
							<span style="color:red;">*</span>
							<span>机构名称：</span>
						</div>
						<FormItem prop="orgName" >
							<Input v-model.trim="formValidate.orgName" placeholder="请输入机构名称" clearable style="width: 300px"></Input>
						</FormItem>
					</div>
					<!-- 详细地址 -->
					<div class="address">
						<div class="left">
							<span style="color:red;">*</span>
							<span>详细地址：</span>
						</div>
						<FormItem prop="hosAddr" >
							<Input v-model.trim="formValidate.hosAddr" placeholder="请填写详细的地址:省、市、区" clearable style="width: 300px"></Input>
						</FormItem>
					</div>
					<!-- 机构组织编码 -->
					<div class="address">
						<div class="left">
							<span style="color:red;">*</span>
							<span>机构组织编码：</span>
						</div>
						<FormItem  prop="orgCode" >
							<Input v-model.trim="formValidate.orgCode" placeholder="请输入医疗组织机构代码" clearable style="width: 300px"></Input>
						</FormItem>
					</div>
					<!-- 机构类型 -->
					<div class="region">
						<div class="left">
							<span style="color:red;">*</span>
							<span>机构类型：</span>
						</div>
						<!-- 医院 -->
						<FormItem prop="hospitalType">
							<Select v-model="formValidate.hospitalType" style="width:100px">
								<Option value="1">医院</Option>
							</Select>
						</FormItem>
					</div>
					<!-- 机构等级 -->
					<div class="region">
						<div class="left">
							<span style="color:red;">*</span>
							<span>机构等级：</span>
						</div>
						<!-- 医院等级 -->
						<FormItem prop="grade">
							<Select v-model="formValidate.grade" style="width:150px">
								<Option
								:value="item.dictType"
								v-for="item in gradeList"
								:key="item.dictType"
                                style='text-align:center;'
								>{{ item.dictName }}</Option>
							</Select>
						</FormItem>
					</div>
					<!-- 机构联系人 -->
					<div class="address">
						<div class="left">
							<span style="color:red;"></span>
							<span style='margin-left:15px;'>机构联系人：</span>
						</div>
						<FormItem prop="linkman">
							<Input v-model.trim="formValidate.linkman" placeholder="请输入机构联系人姓名" clearable style="width: 300px"/>
						</FormItem>
					</div>
					<!-- 联系人电话 -->
					<div class="address">
						<div class="left">
							<span style="color:red;"></span>
							<span style='margin-left:15px;'>联系人电话：</span>
						</div>
						<FormItem prop="linkmanTelephone">
							<Input
								v-model.trim="formValidate.linkmanTelephone"
								placeholder="请输入联系人电话号码"
								clearable
								style="width: 300px"
								:maxlength="11"
							/>
						</FormItem>
					</div>

                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">修改机构</Button>
                        <Button @click="back" style="margin-left: 8px">返回上一步</Button>
                    </FormItem>
                </Form>
            </div>

        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
			formValidate: {
                provinceCode: "",
                // 市
                cityCode: "",
                //县
                districtCode: "",
                //详细地址
                hosAddr: "",
                //机构名称
                orgName: "",
                //机构组织代码
                orgCode: "",
                //机构类型
                hospitalType: null,
                //机构等级
                grade: null,
                //联系人
                linkman: "",
                //联系人电话
				linkmanTelephone: "",
				// 医院ID
				id:''
            },
            ruleValidate: {
				// 城
                provinceCode: [
                    {
                        required: true,
                        message: "请选择省级",
                        trigger: "change"
                    }
                ],
                // 市
                cityCode: [
                    {
                        required: true,
                        message: "请选择城市",
                        trigger: "change"
                    }
                ],
				// 机构名称
				orgName: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入机构名称",
						// 触发事件
						trigger: "blur"
					}
				],
				//详细地址
                hosAddr: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请填写详细的地址:省、市、区",
						// 触发事件
						trigger: "blur"
					}
				],
				// 组织机构代码
				orgCode: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入医疗组织机构代码",
						// 触发事件
						trigger: "blur"
					}
				],
				// 机构类型
				hospitalType:[
                    {
                        required: true,
                        message: "请选择机构类型",
                        trigger: "change"
                    }
				],
				//医院等级"
				grade:[
                    {
                        required: true,
                        message: "请选择医院等级",
                        trigger: "change"
                    }
				]
            },
            //城市列表
            provList: [],
            cityList: [],
            countyList: [],
            //医院等级 列表
            gradeList: [],
            hosAddr: "",
            hospitalId: "",

            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2
        };
    },
    created() {
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
        this.getCity();
        this.getGrent();

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/mechanismreg/list",
                title: "机构注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let id = this.$route.query.id;
        if (id) {
            this.$axios
                .post(api.mechanismregSearch, {
                    hospitalId: id
                })
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        //省
                        this.formValidate.provinceCode = ret.provinceCode.toString();
                        //市
                        this.formValidate.cityCode = ret.cityCode.toString();
                        // //机构全称
                        this.formValidate.orgName = ret.orgName;
                        // //机构代码
                        this.formValidate.orgCode = ret.orgCode;
                        // //机构类型
                        this.formValidate.hospitalType = ret.hospitalType.toString();
                        // //机构等级
                        this.formValidate.grade = ret.grade;
                        // //联系人
                        this.formValidate.linkman = ret.linkman;
                        // //联系人电话
                        this.formValidate.linkmanTelephone = ret.linkmanTelephone;
                        // 地址
                        this.formValidate.hosAddr = ret.hosAddr;
                        // 医院ID
                        this.formValidate.id = ret.hospitalId;
                    } else {
                    }
                });
        }
    },
    methods: {
        back() {
            let pageNo = this.$route.query.pageNo;
            // functionJS公用 方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/mechanismreg/list",
                {
                    pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        },
        //获取医院等级
        getGrent() {
            this.$axios.post(api.managementAll).then(res => {
                if (res.data) {
                    let ret = res.data.object;
                    this.gradeList = ret;
                }
            });
        },
        // 获取省级
        getCity() {
            this.$axios.post(api.getCity).then(res => {
                if (res.data) {
					let ret = res.data.object;
					console.log(ret)
					ret.forEach(item =>{
						item.id = item.id.toString();
					})
                    this.provList = ret;
                    this.countyList = [];
                    this.cityList = [];
                    this.provChange(this.regionProv);
                }
            });
        },
        // 省级改变获取市级
        provChange() {
            let list = this.provList;
            let len = list.length;
            if (list != -1) {
                for (let i = 0; i < len; i++) {
                    if (list[i].id == this.formValidate.provinceCode) {
						list[i].cityList.forEach(item =>{
							item.id = item.id.toString();
						})
                        this.cityList = list[i].cityList;
                    }
                }
            }
        },
		// 提交表单
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
                // 必填项填写完成
                console.log(this.formValidate)
					this.$axios.post(api.mechanismregEdit, this.formValidate).then(res => {
						if (res.data.code) {
							let ret = res.data;
							this.$Message.info("修改成功");
							let pageNo = this.$route.query.pageNo;
							setTimeout(() => {
								// functionJS公用 方法
								this.functionJS.queryNavgationTo(
									this,
									"/index/maintain/mechanismreg/list",
									{
										pageNo,
										province: this.province,
										city: this.city,
										area: this.area,
										hospital: this.hospital,
										isBack: 2
									}
								);
							}, 500);
						} else {
							this.$Message.info("修改失败请重试");
						}
					})
				} else {
				// 必填项填写失败
				this.$Message.error("Fail!");
				}
			});
			},
			handleReset(name) {
			// 重置状态
			this.$refs[name].resetFields();
		}
    }
};
</script>
<style lang="less" scoped>
.mechanismregEdit {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        header {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
        }
        .container-main {
            display: flex;
            flex-direction: column;
            width: 80%;
            margin: 0 auto;
            .number,
            .region,
            .address {
                display: flex;
                flex-direction: row;
                .left {
                    width: 200px;
                    font-size: 20px;
                    span:last-child {
                        font-weight: 600;
                    }
                }
            }
            .region {
                select {
                    width: 100px;
                    margin-right: 10px;
                    option {
                        text-align: center;
                    }
                }
            }
            .address {
                input {
                    width: 400px;
                    height: 25px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    outline: none;
                    background: #fff;
                    text-indent: 5px;
                }
            }
        }
    }
}
</style>
