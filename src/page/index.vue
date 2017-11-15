<template>
  <el-container class="main-c">
    <el-header class="main-header">
      <img class="logo" src="../assets/logo.png">
      <el-menu :span="18"
               :default-active="activeIndex2"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="rgb(57,61,73)"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px" class="main-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="rgb(57,61,73)"
          text-color="#fff"
          active-text-color="#ffd04b" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>人员管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">人员维护</template>
              <el-menu-item index="/index/person/table">人员列表</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .main-c {
    height: 100%;
  }

  .logo {
    height: 50px;
    width: 50px;
    vertical-align: middle;
  }

  .el-menu-demo {
    display: inline-block;
    float: right;
  }

  .main-header, .main-aside {
    background-color: rgb(57,61,73);
    color: #333;
  }
  .el-menu{
    border-right:none;
  }
</style>
