<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属内别">
      <el-select v-model="form.category_id" placeholder="请选择所属内别">
        <el-option-group v-for="(item,index) in categorys" :key="index" :label="item.title">
          <el-option
            v-for="(subItem, subIndex) in item.group"
            :key="subIndex"
            :label="subItem.title"
            :value="subItem.category_id"
          ></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status  "></el-switch>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_slide"></el-switch>
    </el-form-item>

    <el-form-item label="推荐内型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :file-list="form.imgList"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleFileList"
        :file-list="form.fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述" class="editor">
      <quill-editor v-model="form.content"></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        category_id: "", //分类id
        title: "", //文章标题
        sub_title: "", //文章副标题
        goods_no: "", //货号
        stock_quantity: "", //库存
        market_price: "", //市场价格
        sell_price: "", //销售价格
        status: false, //发布状态
        is_top: false, //置顶
        is_hot: true, //热门
        zhaiyao: "", //文字摘要
        content: "", //文字内容

        is_slide: false,
        // 封面图片
        imgList: [],
        // 多张图片
        fileList: []
      },
      // 是否预览图片
      dialogVisible: false,
      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 头像图
      imageUrl: "",
      // 分类数据
      categorys: [],
      // 商品id
      id: ""
    };
  },
  // 分类数据
  mounted() {
    // 获取路由动态id
    const { id } = this.$route.params;
    this.id = id;
    //请求商品数据
    this.$axios({
      url: `/admin/goods/getgoodsmodel/${this.id}`
    }).then(res => {
      // console.log(res.data);
      this.form = res.data.message;
      // 预览图片
      this.imageUrl = res.data.message.imgList[0].url;
      this.form.fileList = res.data.message.fileList.map(v => {
        return {
          ...v,
          // 覆盖 v 对象里面的url
          url: `http://localhost:8899` + v.shorturl
        };
      });
    });

    this.$axios({
      method: "get",
      url: `/admin/category/getlist/goods`
    }).then(res => {
      //   console.log(res.data);
      const { message } = res.data;
      // this.categorys = message;
      let options = [];

      message.forEach(v => {
        if (v.parent_id == 0) {
          v.group = [];
          options.push(v);
        } else {
          options.forEach(item => {
            if (v.parent_id == item.category_id) {
              item.group.push(v);
            }
          });
        }
      });
      this.categorys = options;
    });
  },

  components: {
    "quill-editor": quillEditor
  },
  methods: {
    //提交
    onSubmit() {
      this.$axios({
        method: "post",
        url: `/admin/goods/edit/${this.id}`,
        data: this.form,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            message: message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.replace("/admin/goods-list");
          }, 1000);
        } else {
          this.$message.error("异常信息");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // console.log(res);
      // 头像预览，把图片解析成base64字符串
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgList.push(res);
    },
    handleFileList(res) {
      this.form.fileList.push(res);
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 移除选中的图片,fileList是删除后的数据
    handleRemove(file, fileList) {
      // console.log(fileList);
      if (fileList.length === 0) {
        this.$message({
          type: "warning",
          message: "至少保留一张图片"
        });
        return;
      }

      this.form.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/*   清楚富文本编辑的line-height */
.editor .el-form-item__content {
  line-height: unset;
}
</style>

