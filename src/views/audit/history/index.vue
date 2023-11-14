<script setup lang="ts">
import { ref } from "vue";
// hooks
import { useRole } from "./utils/hooks";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
// components
import { PureTableBar } from "@/components/RePureTableBar";
// icons
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import EyeLine from "@iconify-icons/ri/eye-line";
import FileList2Line from "@iconify-icons/ri/file-list-2-line";

defineOptions({
  name: "AuditHistory"
});

const formRef = ref();
const {
  form,
  columns,
  loading,
  pagination,
  dataList,
  onSearch,
  handleSizeChange,
  handleCurrentChange
} = useRole();
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color p-[12px]"
    >
      <el-form-item label="资源名称" prop="resName">
        <el-input
          v-model="form.resName"
          placeholder="请输入资源名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)">重置</el-button>
      </el-form-item>
    </el-form>
    <PureTableBar title="审核历史" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :columns="dynamicColumns"
          :pagination="pagination"
          :data="dataList"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(FileList2Line)"
              @click="() => console.log(row)"
            >
              审核记录
            </el-button>
            <el-button
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EyeLine)"
              @click="() => console.log(row)"
            >
              预览
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
