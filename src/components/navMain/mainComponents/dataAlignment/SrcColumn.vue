<template>
  <div id="topdiv">
    <div id="buttondiv">
      <!-- 查询，新增按钮 -->
      <button id="buttonQry" class="buttonQA" v-text="butttonQry" @click="qrysrcsys"></button>
      <!-- <button id="buttonQry" v-text="butttonUpdate" v-on:click></button>
      <button id="buttonQry" v-text="butttonDel" v-on:click></button>-->
      <button
        id="butttonAdd"
        class="buttonQA"
        v-text="butttonAdd"
        @click="dialogFormVisibleAdd = true"
      ></button>
    </div>
    <div id="tablediv" style="width:100%; hight:100%; ">
      <!-- 显示数据的列表 -->
      <el-table :data="list" stripe v-loading="tabledivloading">
        <el-table-column prop="sys" label="sys"></el-table-column>
        <el-table-column prop="dbSid" label="dbSid"></el-table-column>
        <el-table-column prop="dbSchema" label="dbSchema"></el-table-column>
        <el-table-column prop="tableName" label="tableName"></el-table-column>
        <el-table-column prop="columnId" label="columnId"></el-table-column>
        <el-table-column prop="columnName" label="columnName"></el-table-column>
        <el-table-column prop="columnType" label="columnType"></el-table-column>
        <el-table-column prop="columnCnName" label="columnCnName"></el-table-column>
        <el-table-column prop="isPk" label="isPk"></el-table-column>
        <el-table-column prop="notNull" label="notNull"></el-table-column>
        <el-table-column prop="defaultValue" label="defaultValue"></el-table-column>
        <el-table-column prop="isDk" label="isDk"></el-table-column>
        <el-table-column prop="breakFlag" label="breakFlag"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-页码 -->
      <el-pagination
        style="float:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 25, 50, 100]"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 上传 -->
    <el-dialog title="上传" :visible.sync="dialogUpload">
      <div style="min-height:150px;">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadURL"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-error="uploaderror"
          :on-success="uploadsuccess"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary" @click="clearFileList">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- <el-button type="text" @click="">打开嵌套表单的 Dialog</el-button> -->
    <!-- 编辑按钮打开的form -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleUpdate">
      <el-form :model="form">
        <el-form-item label="sys" :label-width="formLabelWidth">
          <el-input v-model="form.sys" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSid" :label-width="formLabelWidth">
          <el-input v-model="form.db_sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSchema" :label-width="formLabelWidth">
          <el-input v-model="form.dbSchema" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="tableName" :label-width="formLabelWidth">
          <el-input v-model="form.tableName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnId" :label-width="formLabelWidth">
          <el-input v-model="form.columnId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnName" :label-width="formLabelWidth">
          <el-input v-model="form.columnName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnType" :label-width="formLabelWidth">
          <el-input v-model="form.columnType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnCnName" :label-width="formLabelWidth">
          <el-input v-model="form.columnCnName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="isPk" :label-width="formLabelWidth">
          <el-input v-model="form.isPk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="notNull" :label-width="formLabelWidth">
          <el-input v-model="form.notNull" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="defaultValue" :label-width="formLabelWidth">
          <el-input v-model="form.defaultValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="isDk" :label-width="formLabelWidth">
          <el-input v-model="form.isDk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="breakFlag" :label-width="formLabelWidth">
          <el-input v-model="form.breakFlag" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dialogFormVisible = false：关闭dialog框 true：打开dialog框 -->
        <el-button @click="dialogFormVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" @click="tijiaoForm(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      title="新增"
      :visible.sync="dialogFormVisibleAdd"
      @closed="dialogFormVisibleAddBeforeClose"
    >
      <el-form :model="formAdd">
        <el-form-item label="sys" :label-width="formLabelWidth">
          <el-input v-model="formAdd.sys" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSid" :label-width="formLabelWidth">
          <el-input v-model="formAdd.db_sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSchema" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbSchema" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="tableName" :label-width="formLabelWidth">
          <el-input v-model="formAdd.tableName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnId" :label-width="formLabelWidth">
          <el-input v-model="formAdd.columnId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnName" :label-width="formLabelWidth">
          <el-input v-model="formAdd.columnName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnType" :label-width="formLabelWidth">
          <el-input v-model="formAdd.columnType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="columnCnName" :label-width="formLabelWidth">
          <el-input v-model="formAdd.columnCnName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="isPk" :label-width="formLabelWidth">
          <el-input v-model="formAdd.isPk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="notNull" :label-width="formLabelWidth">
          <el-input v-model="formAdd.notNull" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="defaultValue" :label-width="formLabelWidth">
          <el-input v-model="formAdd.defaultValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="isDk" :label-width="formLabelWidth">
          <el-input v-model="formAdd.isDk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="breakFlag" :label-width="formLabelWidth">
          <el-input v-model="formAdd.breakFlag" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dialogFormVisible = false：关闭dialog框 true：打开dialog框 -->
        <el-button @click="dialogFormVisibleAddBeforeClose ">取 消</el-button>
        <el-button type="primary" @click="tijiaoformAdd(formAdd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SrcColumn",
  data() {
    return {
      butttonName: "查询",
      butttonQry: "查询",
      butttonUpdate: "修改",
      butttonDel: "删除",
      butttonAdd: "增加",
      butttonUpload: "上传",
      uploadURL: process.env.API_HOST + "/srcsystem/fileUpload",
      tabledivloading: false,
      dialogFormVisibleUpdate: false,
      dialogFormVisibleAdd: false,
      dialogUpload: false,
      list: [],
      fileList: [],
      total: 0,
      currentPage: 1,
      form: {
        sys: "",
        dbSid: "",
        dbSchema: "",
        tableName: "",
        columnId: "",
        columnName: "",
        columnType: "",
        columnCnName: "",
        isPk: "",
        notNull: "",
        defaultValue: "",
        isDk: "",
        breakFlag: ""
      },
      formAdd: {
        sys: "",
        dbSid: "",
        dbSchema: "",
        tableName: "",
        columnId: "",
        columnName: "",
        columnType: "",
        columnCnName: "",
        isPk: "",
        notNull: "",
        defaultValue: "",
        isDk: "",
        breakFlag: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    qrysrcsys() {
      // let data = {'username':this.username,'password':this.password}
      // 接口请求
      // this.$http.post('/api/srcsys/querysrcsys',data).then((res)=>{
      // 不带参的请求
      this.tabledivloading = true;
      this.$http
        .get(
          process.env.API_HOST +
            "/srccolumn/querysrccolumn?pageNum=" +
            this.currentPage
        )
        .then(res => {
          // console.log(res);
          // console.log(res.body);
          // console.log(res.data);
          this.list = res.data.list;
          this.total = res.data.total;
          console.log(this.list);
          this.tabledivloading = false;
        });
      //   .catch(res => {
      //     // this.tabledivloading = flase
      //     // this.openerror('网络异常，请稍后再试，或联系管理员检查')
      //   });
    },
    handleEdit(index, row) {
      console.log(index, row);
      // 打开简单的弹窗
      // this.openEditBox(index, row);
      // dialog对话框 true：即弹窗
      this.dialogFormVisibleUpdate = true;
      this.form = JSON.parse(JSON.stringify(row));
      console.log("list：" + this.list);
      console.log("form：" + this.form);
    },
    tijiaoForm(value) {
      this.$http
        .post(process.env.API_HOST + "/srccolumn/updatesrccolumn", value)
        .then(res => {
          // 改动之后重新查询
          this.qrysrcsys();
          this.opensuccess("修改成功");
          this.dialogFormVisibleUpdate = false;
        })
        .catch(res => {
          this.openerror("修改失败");
        });
    },
    tijiaoformAdd(value) {
      this.$http
        .post(process.env.API_HOST + "/srccolumn/addsrccolumn", value)
        .then(res => {
          // 改动之后重新查询
          this.qrysrcsys();
          this.opensuccess("添加成功");
          this.dialogFormVisibleAdd = false;
        })
        .catch(res => {
          this.openerror("添加失败");
        });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      console.log(row);
      console.log("++++++++");
      console.log(index);
      this.openerror("暂不提供删除");
      // this.$http
      //   .post(process.env.API_HOST + "/srcsys/delsrcsys", row)
      //   .then(res => {
      //     this.qrysrcsys();
      //     this.opensuccess("删除成功");
      //   })
      //   .catch(res => {
      //     this.openerror("删除失败");
      //   });
    },
    // 打开新增框
    handleAdd() {
      dialogFormVisibleAdd = true;
    },
    // 关闭新增框 清除已填内容
    dialogFormVisibleAddBeforeClose() {
      this.dialogFormVisibleAdd = false;
      this.formAdd = {};
    },
    dialogFormVisibleBeforeClose() {
      this.form = {};
    },
    openmsg(openmsg) {
      this.$message(openmsg);
    },
    opensuccess(openmsg) {
      this.$message({
        message: openmsg,
        type: "success"
      });
    },
    openwarning(openmsg) {
      this.$message({
        message: openmsg,
        type: "warning"
      });
    },
    openerror(openmsg) {
      this.$message.error(openmsg);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.qrysrcsys();
    },
    // 上传相关方法
    clearFileList() {
      this.$refs.upload.clearFiles(); //每次点击选择文件时，将已经上传的文件记录清掉
    },
    submitUpload() {
      this.$refs.upload.submit(); //手动上传文件（用于非自动上传）
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploaderror() {
      this.openerror("上传失败");
    },
    uploadsuccess() {
      this.opensuccess("上传成功");
    }
  }
};
</script>
<style>
</style>