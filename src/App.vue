<template>
  <div id="app">
    <el-container>
      <el-header class="header" >
        <navHeader></navHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
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
  .header{
    background: #1bbc9b;
    /* background:linear-gradient(to right,#1bbc9b,#5cdac1b0,#e8fdf363 ); */
    line-height:60px;
  }
  .main{
    height: 860px;
  }
</style>
