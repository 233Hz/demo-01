<script setup lang="ts">
import FastPanel from "./components/FastPanel.vue";
import DataPanel from "./components/DataPanel.vue";
import Area from "./components/Area.vue";
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <FastPanel />
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <DataPanel />
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <Area />
      </el-col>
    </el-row>
  </div>
</template>
