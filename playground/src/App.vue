<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue";
import { Watermark } from "watermark-lite";

const wm = new Watermark();

onMounted(() => {
  wm.mount({
    text: "水印文字"
  });
});

onBeforeUnmount(() => {
  wm.unmount();
});
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>