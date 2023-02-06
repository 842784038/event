<template>
  <div class="reg-container">
    <div class="reg-box">
      <div class="title-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-register'
}
</script>

<style lang="less" scoped>
html {
  height: 840px;
}
body {
  height: 840px;
}
 .reg-container {
  position: relative;
  background: url("../../assets/images/login_bg.jpg") no-repeat center 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      width: 400px;
      height: 60px;
      background-image: url("../../assets/images/login_title.png") center no-repeat;
      }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
