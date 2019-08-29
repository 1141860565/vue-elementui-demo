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
    <div id="tablediv" style="width:100%;  ">
      <!-- 显示数据的列表 -->
      <el-table :data="list" stripe v-loading="tabledivloading">
        <el-table-column prop="sys" label="sys" width="60"></el-table-column>
        <el-table-column prop="sysNum" label="sysNum" width="80"></el-table-column>
        <el-table-column prop="dbType" label="dbType"></el-table-column>
        <el-table-column prop="dbVersion" label="dbVersion"></el-table-column>
        <el-table-column prop="dbSid" label="dbSid"></el-table-column>
        <el-table-column prop="dbSchema" label="dbSchema"></el-table-column>
        <el-table-column prop="dbCharset" label="dbCharset"></el-table-column>
        <el-table-column prop="dbIp" label="dbIp"></el-table-column>
        <el-table-column prop="dbPort" label="dbPort"></el-table-column>
        <el-table-column prop="username" label="username"></el-table-column>
        <!-- <el-table-column prop="encrpassword" label="encrpassword"></el-table-column> -->
        <el-table-column prop="remark" label="remark"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
	  <!-- 分页-页码 -->
	  <el-pagination style="float:right;" 
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        :current-page="currentPage"
	        :page-sizes="[5, 10, 25, 50, 100]"
	        :page-size="10"
	        layout="total, prev, pager, next, jumper"
	        :total="total">
	      </el-pagination>
    </div>
    <!-- <el-button type="text" @click="">打开嵌套表单的 Dialog</el-button> -->
    <!-- 编辑按钮打开的form -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleUpdate">
      <el-form :model="form">
        <el-form-item label="sys" :label-width="formLabelWidth">
          <el-input v-model="form.sys" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sysNum" :label-width="formLabelWidth">
          <el-input v-model="form.sysNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbType" :label-width="formLabelWidth">
          <el-input v-model="form.dbType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbVersion" :label-width="formLabelWidth">
          <el-input v-model="form.dbVersion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSid" :label-width="formLabelWidth">
          <el-input v-model="form.dbSid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSchema" :label-width="formLabelWidth">
          <el-input v-model="form.dbSchema" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbCharset" :label-width="formLabelWidth">
          <el-input v-model="form.dbCharset" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbIp" :label-width="formLabelWidth">
          <el-input v-model="form.dbIp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbPort" :label-width="formLabelWidth">
          <el-input v-model="form.dbPort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="encrpassword" :label-width="formLabelWidth">
          <el-input v-model="form.encrpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
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
        <el-form-item label="sysNum" :label-width="formLabelWidth">
          <el-input v-model="formAdd.sysNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbType" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbVersion" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbVersion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSid" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbSid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbSchema" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbSchema" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbCharset" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbCharset" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbIp" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbIp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbPort" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dbPort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="username" :label-width="formLabelWidth">
          <el-input v-model="formAdd.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="encrpassword" :label-width="formLabelWidth">
          <el-input v-model="formAdd.encrpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="remark" :label-width="formLabelWidth">
          <el-input v-model="formAdd.remark" autocomplete="off"></el-input>
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
<style >

</style>
<script>
export default {
  name: "SrcSystem",
  data() {
    return {
      butttonName: "查询",
      butttonQry: "查询",
      butttonUpdate: "修改",
      butttonDel: "删除",
      butttonAdd: "增加",
      tabledivloading: false,
      dialogFormVisibleUpdate: false,
      dialogFormVisibleAdd: false,
      list: [],
	  total:0,
	  currentPage:1,
      form: {
        sys: "",
        sysNum: "",
        dbType: "",
        dbVersion: "",
        dbSid: "",
        dbSchema: "",
        dbCharset: "",
        dbIp: "",
        dbPort: "",
        username: "",
        encrpassword: "",
        remark: ""
      },
      formAdd: {
        sys: "",
        sysNum: "",
        dbType: "",
        dbVersion: "",
        dbSid: "",
        dbSchema: "",
        dbCharset: "",
        dbIp: "",
        dbPort: "",
        username: "",
        encrpassword: "",
        remark: ""
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
      //process.env.API_HOST 获取当前环境的api地址
      this.$http.get(process.env.API_HOST + "/srcsys/querysrcsys?pageNum="+this.currentPage).then(res => {
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
        .post(process.env.API_HOST + "/srcsys/updatesrcsys", value)
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
        .post(process.env.API_HOST + "/srcsys/addsrcsys", value)
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
      // this.$http.post('/api/srcsys/delsrcsys',JSON.stringify(row).then((res)=>{
      this.$http
        .post(process.env.API_HOST + "/srcsys/delsrcsys", row)
        .then(res => {
          this.qrysrcsys();
          this.opensuccess("删除成功");
        })
        .catch(res => {
          this.openerror("删除失败");
        });
    },
    // 打开新增框
    handleAdd() {
      dialogFormVisibleAdd = true;
    },
    // 关闭新增框 清除已填内容
    dialogFormVisibleAddBeforeClose() {
      this.dialogFormVisibleAdd = false;
      this.formAdd = {
        sys: "",
        sysNum: "",
        dbType: "",
        dbVersion: "",
        dbSid: "",
        dbSchema: "",
        dbCharset: "",
        dbIp: "",
        dbPort: "",
        username: "",
        encrpassword: "",
        remark: ""
      };
    },
    dialogFormVisibleBeforeClose() {
      this.form = {
        sys: "",
        sysNum: "",
        dbType: "",
        dbVersion: "",
        dbSid: "",
        dbSchema: "",
        dbCharset: "",
        dbIp: "",
        dbPort: "",
        username: "",
        encrpassword: "",
        remark: ""
      };
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
		this.currentPage=val;
		this.qrysrcsys();
	}
  }
};
</script>
