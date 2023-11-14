<script setup lang="ts">
import { ref } from "vue";
// hooks
import { useRole } from "./utils/hooks";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
// components
import { PureTableBar } from "@/components/RePureTableBar";
// icons
import More from "@iconify-icons/ep/more-filled";
import Check from "@iconify-icons/ep/check";
import Close from "@iconify-icons/ep/close";
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
  selectedNum,
  pagination,
  dataList,
  onSearch,
  onSelectionCancel,
  handleDelete,
  onBatchDel,
  handleSelectionChange,
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
    <PureTableBar title="待我审核" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <div
          v-if="selectedNum > 0"
          v-motion-fade
          class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center"
        >
          <div class="flex-auto">
            <span
              style="font-size: var(--el-font-size-base)"
              class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
            >
              已选 {{ selectedNum }} 项
            </span>
            <el-button type="primary" text @click="onSelectionCancel">
              取消选择
            </el-button>
          </div>
          <el-popconfirm title="是否确认通过?" @confirm="onBatchDel">
            <template #reference>
              <el-button type="success" text :icon="useRenderIcon(Check)">
                批量通过
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="是否确认拒绝?" @confirm="onBatchDel">
            <template #reference>
              <el-button type="danger" text :icon="useRenderIcon(Close)">
                批量拒绝
              </el-button>
            </template>
          </el-popconfirm>
        </div>
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
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-popconfirm
              :title="`是否确认通过资源名称为${row.resName}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  link
                  type="success"
                  :size="size"
                  :icon="useRenderIcon(Check)"
                >
                  通过
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              :title="`是否确认拒绝资源名称为${row.resName}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  link
                  type="danger"
                  :size="size"
                  :icon="useRenderIcon(Close)"
                >
                  退回
                </el-button>
              </template>
            </el-popconfirm>
            <el-dropdown>
              <el-button
                class="ml-3 mt-[2px]"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(More)"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      link
                      :size="size"
                      :icon="useRenderIcon(FileList2Line)"
                    >
                      审核记录
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button link :size="size" :icon="useRenderIcon(EyeLine)">
                      预览
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
