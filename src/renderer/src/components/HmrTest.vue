<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
const increment = () => {
    counter.value++
}
</script>

<template>
    <div class="hmr-test">
        <h2>HMR测试组件</h2>
        <p>计数器: {{ counter }}</p>
        <button @click="increment">增加</button>
    </div>
</template>

<style>
.hmr-test {
    padding: 20px;
    border: 1px solid #ccc;
    margin: 20px;
    text-align: center;
}
</style>