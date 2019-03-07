<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios({
      url: "/admin/account/islogin",
      method: "get"
    }).then(res => {
      if (res.data.code === "nologin") {
        this.$router.push("/login");
      }
    });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.mb20 {
  margin-bottom: 20px;
}
.mt20 {
  margin-top: 20px;
}
</style>
