<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu v-for="(item,index) in menus" :key="index" :index="`${index+1}`">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>

      <el-menu-item-group>
        <el-menu-item
          v-for="(subItem,subIndex) in item.group"
          :key="subIndex"
          :index="`${index+1}-${subIndex+1}`"
        >
          <router-link :to="subItem.path">{{subItem.title}}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: "el-icon-info",
          title: "购物商场",
          group: [
            {
              path: "/admin/goods-list",
              title: "商品管理"
            },
            { path: "#", title: "栏目管理" }
          ]
        },
        {
          icon: "el-icon-service",
          title: "会员管理",
          group: [{ path: "#", title: "会员列表" }]
        },
        {
          icon: "el-icon-tickets",
          title: "订单管理",
          group: [{ path: "#", title: "订单列表" }]
        }
      ]
    };
  },
  props: ["isCollapse"]
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  flex: 1;
  border-right: none;
}
.el-menu-vertical-demo a {
  color: inherit;
  text-decoration: none;
}
/*把title隐藏*/
.el-menu-item-group__title {
  display: none;
}
</style>
    