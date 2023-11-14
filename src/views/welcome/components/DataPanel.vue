<script setup lang="ts">
const dataItems = [
  {
    name: "资源分类",
    value: 6
  },
  {
    name: "栏目总数",
    value: 47
  },
  {
    name: "已上传资源",
    value: 129
  },
  {
    name: "待我审核",
    value: 0
  },
  {
    name: "特色专题",
    value: 3
  },
  {
    name: "双创联盟",
    value: 6
  },
  {
    name: "部门总数",
    value: 8
  },
  {
    name: "用户总数",
    value: 11
  }
];
</script>

<template>
  <el-card shadow="never" class="mb-[24px]">
    <template #header> 数据预览 </template>
    <div class="grid grid-cols-4 grid-rows-2 gap-[10px]">
      <div
        class="bg-gray-50 dark:bg-transparent hover:shadow-lg h-[100px] p-[20px]"
        v-for="item in dataItems"
        :key="item.name"
      >
        <el-statistic
          :title="item.name"
          :value="item.value"
          :value-style="{ color: '#009688' }"
        >
          <template #title>
            <p class="line-clamp-2 dark:text-white">{{ item.name }}</p>
          </template>
        </el-statistic>
      </div>
    </div>
  </el-card>
</template>
