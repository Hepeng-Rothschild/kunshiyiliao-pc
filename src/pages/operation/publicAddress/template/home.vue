<template>
  <div class="templateHome">
    <tmpHeader :index='1' />
    <div class="main">
      <!-- 模板 -->
      <div class="item" v-for="(item,index) in list" :key='index'>
        <span>{{ item.name }}</span>
        <Input placeholder="模板编号" style="width: 500px" v-model="item.template" clearable/>
      </div>
      <!-- 保存 -->
      <div class="save">
        <Button type="primary" @click="save">保存</Button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import tmpHeader from "../tmpHeader";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      list: [],
      appid: ''
    };
  },
  created() {
    let iv = store.state.iv;
    let salt = store.state.salt;
    this.appid = aesUtils.decrypt(salt,iv,"wxAppid",localStorage.getItem("appid"))
      let breadList = [
          { path: "/index", title: "首页" },
          {
              path: "/index/operation/publicHosting/index",
              title: "公众号托管"
          },
          {
              path: "/index/operation/publicAddress/list",
              title: "公众号管理"
          }
      ];
      this.$emit("changeBreadList", breadList);
  },
  mounted() {
    this.loadingData();
  },
  methods: {
    save() {
      let params = {
        list: this.list,
        appid: this.appid
      }
      console.log('模板参数',params);
      this.$axios.post(api.wxTemplateSave, params).then(res => {
        if (res.data.code) {
          let ret = res.data;
          this.$Message.info("保存成功");
        } else {
          this.$Message.info("保存失败,请稍候重试");
        }
      });
    },
    loadingData() {
      this.$axios
        .post(api.wxTemplateList, {
          appid: this.appid
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.list = ret;
          } else {
            this.$Message.info("请求失败,请稍候重试");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.templateHome {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    position:relative;
    width: 100%;
    .item {
      span {
        display: inline-block;
        width: 150px;
      }
      margin: 10px 0;
    }
    .save {
      position:fixed;
      right:50px;
      bottom:50px;
    }
  }
}
</style>
