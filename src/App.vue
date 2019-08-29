<template>
  <div id="app">
    <el-container class="el-container" style="height:100%;" direction="vertical">
      <el-header class="header" height="40px">
        <navHeader></navHeader>
      </el-header>
      <el-container>
        <el-aside class="leftMenu" width="200px">
          <navMenu></navMenu>
        </el-aside>
        <el-main class="main">
          <navMain></navMain>
          <keep-alive :include="$store.state.openedTab">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import navMenu from '@/components/navMenu/navMenu'
import navHeader from '@/components/header/header'
import navMain from '@/components/navMain/navMain'

export default {
  name: 'App',
  components: {
    navMenu,
    navHeader,
    navMain
  }
}
</script>

<style>
  html,body,#app {
    padding:0;
    margin: 0;
    height:100%;
  }
  .header{
    background: #1bbc9b;
    /* background:linear-gradient(to right,#1bbc9b,#5cdac1b0,#e8fdf363 ); */
    line-height: 40px;
  }
  /* .main{
    height: 920px;
  } */
  .leftMenu{
	  background:#545c64;
  }
  .el-menu{
	  /* background:#545c64; */
    border-right: solid 1px #545c64;
  }
</style>
