// <template>
  <div class="add">
    <div class="main">
      <!-- 服务名称 -->
      <h2>{{ title }}</h2>
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>服务名称
        </span>
        <Input v-model="params.menuName" placeholder="请输入服务名称" style="width: 300px"/>
      </div>
      <!-- 类型 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>类型
        </span>
        <Select v-model="params.function" style="width:80px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value" style='text-align:center;'>{{ item.label }}</Option>
        </Select>
      </div>
      <!-- 服务图标 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>服务图标
        </span>
        <Input v-model="params.menuicon" placeholder="请输入服务图标路径" style="width: 300px"/>
      </div>
      <!-- 排序 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>排序
        </span>
        <InputNumber :max="999" :min="1" v-model="params.priority"></InputNumber>
      </div>
      <!-- 跳转路径 -->
      <div class="item">
        <span class="title">跳转路径</span>
        <Input v-model="params.path" placeholder="请输入服务路径" style="width: 300px"/>
        <span class="title" style='margin-left:10px;'>跳转路径长度不得超过500个字符</span>
      </div>
      <!-- 备注 -->
      <div class="item">
        <span class="title">备注</span>
        <Input v-model="params.remark" type="textarea" placeholder="请输入服务备注"/>
      </div>

      <!-- 快捷菜单 -->
      <div class="item">
        <span class="title">快捷菜单</span>
        <!-- <iSwitch v-model="shortcut"/> -->
        <iSwitch size="large"  v-model="shortcut" >
            <span slot="open">启用</span>
            <span slot="close">关闭</span>
        </iSwitch>
      </div>
      <!-- 保存 -->
      <div class="save">
        <Button type="primary" @click="add">修改</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      params: {
        menuName: "",
        priority: 1,
        path: "",
        remark: "",
        menuicon: "",
        function: "",
        level: "",
        parentId: ""
      },
      shortcut: true,
      title:"",
      cityList: [
        // {
        //   value: "1",
        //   label: "菜单"
        // },
        {
          value: "2",
          label: "功能"
        }
      ]
    };
  },
  mounted() {
    let params = this.$route.params.item;
    this.title = this.$route.params.name;
    this.params.menuName = params.menuName.trim();
    this.params.path = params.path;
    this.params.priority = params.priority;

    this.params.function = params.function;

    this.shortcut = Boolean(params.shortcut);
    this.params.remark = params.remark;
    this.params.menuicon = params.menuicon;
    
    this.params.level = params.level;
    this.params.parentId = params.parentId;
    this.params.id = params.id;
  },
  created () {
    let breadList = [
          { path: "/index", title: "首页" },
          {
              path: "/index/operation/wxTypeManagement/list",
              title: "系统管理"
          },
          {
              path: "/index/operation/wxTypeManagement/list",
              title: "菜单管理"
          }
      ];
      this.$emit("changeBreadList", breadList);
  },
  methods: {
    // 编辑
    add() {
      let params = this.params;
      params.shortcut = Number(this.shortcut);
      if (
        !params.menuName ||
        !params.function ||
        !params.priority ||
        !params.menuicon
      ) {
        this.$Message.info("请完整填写必填项");
      } else {
        this.$axios.post(api.systemManagementEdit, params).then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            setTimeout(() => {
              // FunctionJS方法
              this.functionJS.paramsNavgationTo(this,'wxTypeManagementList')
            }, 500);
          } else {
            this.$Message.info("修改失败,请稍候重试");
          }
        });
      }
    },
    back() {
      this.functionJS.paramsNavgationTo(this,'wxTypeManagementList')
    }
  }
};
</script>
<style lang="less" scoped>
.add {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 100%;
    margin-top: 10px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        display: inline-block;
        min-width: 150px;
        text-align: center;
      }
      margin: 20px 0;
    }
    .save {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
