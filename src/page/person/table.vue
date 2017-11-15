<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="params.name" placeholder="按姓名查找">
            <span slot="prepend">姓名</span>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="params.phone" placeholder="按电话查找">
            <span slot="prepend">电话</span>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="6">
          <el-button @click="addPerson">添加</el-button>
          <el-button type="primary" @click="find">查询</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="personList" border style="width: 100%" v-loading="loading">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="80">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="100"
          :formatter="dataFormate"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="boxStr"
          label="爱好"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="viewDetail(scope)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteInfo(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        class="pagi">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
  import * as moment from 'moment' // 时间格式化

  import { createNamespacedHelpers } from 'vuex'
  const {mapActions, mapState} = createNamespacedHelpers('personMd')
  export default {
    data () {
      return {
        currentPage4: 1,
        loading: true,
        params: {
          name: '',
          phone: ''
        }
      }
    },
    computed: {
      ...mapState(['personList'])
    },
    methods: {
      ...mapActions(['getPersons', 'deletePerson']),
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      dataFormate (row, column) {
        let date = row[column.property]
        if (!date) {
          return ''
        } else {
          return moment(date).format('YYYY-MM-DD')
        }
      },
      viewDetail ({row}) {
        this.openEdit(row.id)
      },
      deleteInfo ({row}) {
        this.$confirm('确定删除这条记录么？', '删除提示', {
          type: 'warning'
        }).then(() => {
          this.deletePerson(row.id)
        }).catch(() => false)
      },
      addPerson () {
        this.openEdit()
      },
      openEdit (id = '') {
        let _this = this
        this.$layer.open({
          type: 2,
          shade: 0,
          maxmin: true,
          area: ['600px', '550px'],
          content: '#/person/edit/' + id,
          end (index, layero) {
            _this.find()
          }
        })
      },
      find () {
        this.loading = true
        this.getPersons(this.params).then(() => {
          this.loading = false
        })
      }
    },
    created () {
      this.find()
    }
  }
</script>

<style>
  .pagi {
    text-align: center;
  }
</style>
