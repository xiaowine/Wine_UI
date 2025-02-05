<template>
  <div class="app-container">
    <div class="topbar">
      <div class="topbar-content">
        <div class="logo">
          <img src="@example/assets/vue.svg" alt="Logo" />
        </div>
        <nav class="nav-menu" :class="{ 'nav-menu-active': isMenuOpen }">
          <a href="#" class="nav-item" @click="closeMenu">首页</a>
          <a href="#" class="nav-item" @click="closeMenu">产品</a>
          <a href="#" class="nav-item" @click="closeMenu">关于</a>
        </nav>
        <div
          class="menu-toggle"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <div
      class="overlay"
      v-if="isMenuOpen"
      @click="closeMenu"
      :class="{ show: isMenuOpen }"
    ></div>

    <div class="main-content">
      <div class="container">
        <h1>Wine UI 组件库示例</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "@@/Button";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<style scoped lang="scss">
.app-container {
  min-height: 100vh;
}

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.topbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 40px;
  img {
    height: 100%;
  }
}

// 定义移动端断点mixin
@mixin mobile {
  @media screen and (max-width: 768px) {
    @content;
  }
}

.nav-menu {
  display: flex;
  gap: 20px;

  @include mobile {
    display: flex; // 改为默认显示flex
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    height: calc(100vh - 60px); // 添加高度占满剩余屏幕
    background: #fff;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    transform: translateX(100%); // 改用X轴移动
    opacity: 1; // 改为默认不透明
    transition: transform 0.3s ease; // 只过渡transform属性
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &.nav-menu-active {
      transform: translateX(0); // 显示时移动回来
    }

    .nav-item {
      padding: 15px 0; // 增加点击区域
      width: 100%;
      text-align: center;
      border-bottom: 1px solid #eee;
      font-size: 18px; // 增大字体

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-size: 16px;

  &:hover {
    color: #1890ff;
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #333;
    transition: all 0.3s ease;
  }

  &.is-active {
    span:nth-child(1) {
      transform: translateY(6px) rotate(45deg); // 调整汉堡按钮动画
    }
    span:nth-child(2) {
      opacity: 0;
      transform: translateX(-20px);
    }
    span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }
  }

  @include mobile {
    display: flex;
  }
}

.main-content {
  padding-top: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @include mobile {
    padding: 15px;
  }
}

.overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;

  &.show {
    opacity: 1;
    visibility: visible;
  }
}

.content {
  margin-top: 20px;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.demo-section h3 {
  margin: 20px 0 10px;
  font-size: 18px;
  color: #666;
}

.demo-block {
  padding: 20px;
  border: 1px solid #ebedf0;
  border-radius: 4px;
}

.demo-row {
  margin: 16px 0;
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
