import Vue from 'vue'
import Router from 'vue-router'
import BasicIndex from '@/components/navMain/mainComponents/BasicIndex'
import BasicLayout from '@/components/navMain/mainComponents/BasicLayout'
import BasicContainer from '@/components/navMain/mainComponents/BasicContainer'
import BasicCheckbox from '@/components/navMain/mainComponents/BasicCheckbox'
import BasicRadio from '@/components/navMain/mainComponents/BasicRadio'
import SrcSystem from '@/components/navMain/mainComponents/dataAlignment/SrcSystem'
import SrcTable from '@/components/navMain/mainComponents/dataAlignment/srcTable'
import SrcColumn from '@/components/navMain/mainComponents/dataAlignment/SrcColumn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: BasicIndex,
    },
    {
      path: '/BasicLayout',
      name: 'BasicLayout',
      component: BasicLayout
    }, {
      path: '/BasicContainer',
      name: 'BasicContainer',
      component: BasicContainer
    }, {
      path: '/BasicCheckbox',
      name: 'BasicCheckbox',
      component: BasicCheckbox
    }, {
      path: '/BasicRadio',
      name: 'BasicRadio',
      component: BasicRadio
    }, {
      path: '/SrcSystem',
      name: 'SrcSystem',
      component: SrcSystem,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }, {
      path: '/SrcTable',
      name: 'SrcTable',
      component: SrcTable,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }, {
      path: '/SrcColumn',
      name: 'SrcColumn',
      component: SrcColumn,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
