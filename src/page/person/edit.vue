<template>
  <el-form ref="person-form" :model="person" :rules="formRules" :inline="false" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="person.name"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="person.phone" :maxlength="11"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex" class="inline">
      <el-radio-group v-model="person.sex">
        <el-radio-button label="0">男</el-radio-button>
        <el-radio-button label="1">女</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年龄" prop="age" class="inline">
      <el-input-number v-model="person.age" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="person.address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-date-picker v-model="person.birthday" type="date" placeholder="选择日期"
                      :picker-options="pickerOptions0"></el-date-picker>
    </el-form-item>
    <el-form-item label="爱好" prop="boxStr">
      <el-checkbox-group v-model="person.boxStr" name="boxStr">
        <el-checkbox label="读书"></el-checkbox>
        <el-checkbox label="音乐"></el-checkbox>
        <el-checkbox label="打游戏" disabled></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('person-form')">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { person } from '@/service'

  const {mapActions, mapState} = createNamespacedHelpers('personMd')
  export default {
    props: {
      id: String
    },
    data () {
      return {
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        formRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          boxStr: [
            {type: 'array', required: true, message: '请选择爱好', trigger: 'change'}
          ],
          phone: [
            {type: 'string', required: true, message: '请输入手机号', trigger: 'blur'},
            {pattern: '\\d{11}', message: '请输入正确的手机号', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState([
        'person'
      ])
    },
    methods: {
      ...mapActions([
        'getPerson'
      ]),
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let saveData = Object.assign({}, this.person, {boxStr: this.person.boxStr.join(',')})
            person.save(saveData).then(() => {
              this.$alert('保存成功', '提示', {
                comfirmButtonText: '确定',
                callback: () => {
                  this.cancel()
                }
              })
            })
          } else {
            this.$message.error('数据校验失败')
            return false
          }
        })
      },
      cancel () {
        let index = parent.layer.getFrameIndex(window.name)
        parent.layer.close(index)
      }
    },
    created () {
      this.getPerson(this.id)
    }
  }
</script>

<style>
  .inline {
    display: inline-block;
  }
</style>
