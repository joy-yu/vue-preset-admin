<template>
  <section>
    <!--工具条-->
    <div class="filter-wrapper">
      <el-form :inline="true" @submit.native.prevent="getUser">
        <el-form-item>
          <el-input clearable placeholder="姓名/邮箱号" v-model="filters.q"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getUser" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-group">
      <el-button @click="showAdd" type="success" icon="el-icon-plus">新增</el-button>
    </div>
    <!--列表-->
    <el-table :data="userList" element-loading-text="拼命加载中" highlight-current-row v-loading="listLoading">
      <el-table-column label="昵称" prop="chinese_name"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="注册时间" prop="created_at"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="showEdit(scope.row)" size="small">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <div class="page-wrapper">
      <el-pagination
        :current-page.sync="pagination.page"
        :page-size="pagination.pagesize"
        :total="pagination.records"
        @current-change="getUser"
        layout="total, prev, pager, next"
        background
      ></el-pagination>
    </div>

    <!--新增界面-->
    <el-dialog :visible.sync="addFormVisible" width="500px" title="新增">
      <el-form :model="addForm" :rules="addFormRules" label-width="120px" ref="addForm">
        <el-form-item label="登录邮箱号" prop="email">
          <el-input placeholder="登录邮箱号" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input placeholder="登录密码" type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="chinese_name">
          <el-input placeholder="昵称" v-model="addForm.chinese_name"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button :loading="addFormLoading" @click="addSubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog :visible.sync="editFormVisible" width="500px" title="修改密码">
      <el-form :model="editForm" :rules="editFormRules" label-width="120px" ref="editForm">
        <el-form-item label="账号" prop="email">
          <el-input disabled placeholder="账号" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="新密码" type="password" v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newpassword">
          <el-input placeholder="确认新密码" type="password" v-model="editForm.newpassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button :loading="editFormLoading" @click="editSubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { isValidEmail, isValidPwd } from '@/utils/validate.js';

export default {
  data() {
    const confirmPwd = (rule, value, callback) => {
      if (value !== this.editForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      filters: {
        q: ''
      },

      listLoading: false,
      userList: [],
      pagination: {},

      addForm: {
        email: '',
        password: '',
        chinese_name: ''
      },
      addFormVisible: false,
      addFormLoading: false,
      addFormRules: {
        email: {
          required: true,
          validator: isValidEmail,
          trigger: 'change'
        },
        password: {
          required: true,
          validator: isValidPwd,
          trigger: 'change'
        },
        chinese_name: {
          required: true,
          message: '昵称必须填写',
          trigger: 'change'
        }
      },

      editForm: {},
      editFormVisible: false,
      editFormLoading: false,
      editFormRules: {
        password: {
          required: true,
          validator: isValidPwd,
          trigger: 'change'
        },
        newpassword: { required: true, validator: confirmPwd, trigger: 'change' }
      }
    };
  },

  mounted() {
    this.getUser();
  },
  methods: {
    //获取用户列表
    async getUser() {
      try {
        let params = {
          ...this.pagination,
          ...this.filters
        };
        this.listLoading = true;
        let resp = await this.$api.user.getList(params);
        this.pagination = resp.pagination;
        this.userList = resp.data;
        this.listLoading = false;
      } catch (error) {
        this.listLoading = false;
      }
    },

    showAdd() {
      this.addFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
    },

    addSubmit() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          try {
            this.addFormLoading = true;
            await this.$api.user.add(this.addForm);
            this.addFormLoading = false;
            this.addFormVisible = false;
            this.$message.success('新增用户成功');
            this.getUser();
          } catch (error) {
            this.addFormLoading = false;
          }
        }
      });
    },

    showEdit(row) {
      this.editFormVisible = true;
      this.editForm = { id: row.id, email: row.email, password: '', newpassword: '' };
      this.$nextTick(() => {
        this.$refs.editForm.clearValidate();
      });
    },

    editSubmit() {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          try {
            this.editFormLoading = true;
            await this.$api.user.updatePwd(this.editForm);
            this.editFormLoading = false;
            this.editFormVisible = false;
            this.$message.success('修改密码成功');
          } catch (error) {
            this.editFormLoading = false;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss"></style>
