<script setup lang="ts">
import { ref } from "vue";
import LuggageDepositLine from "@iconify-icons/ri/luggage-deposit-line";
import TeamLine from "@iconify-icons/ri/team-line";
import User from "@iconify-icons/ep/user";
import BookReadLine from "@iconify-icons/ri/book-read-line";
import UploadCloud2Line from "@iconify-icons/ri/upload-cloud-2-line";
import FolderOpenLine from "@iconify-icons/ri/folder-open-line";
import FileList3Line from "@iconify-icons/ri/file-list-3-line";
import BarChart2Line from "@iconify-icons/ri/bar-chart-2-line";
import FileUserLine from "@iconify-icons/ri/file-user-line";
import LockLine from "@iconify-icons/ri/lock-line";

const fastPanelNum = 8;
const fastItems = [
  {
    name: "部门",
    icon: LuggageDepositLine
  },
  {
    name: "角色",
    icon: TeamLine
  },
  {
    name: "用户",
    icon: User
  },
  {
    name: "栏目",
    icon: BookReadLine
  },
  {
    name: "上传",
    icon: UploadCloud2Line
  },
  {
    name: "资源",
    icon: FolderOpenLine
  },
  {
    name: "审核",
    icon: FileList3Line
  },
  {
    name: "统计",
    icon: BarChart2Line
  },
  {
    name: "基本资料",
    icon: FileUserLine
  },
  {
    name: "修改密码",
    icon: LockLine
  }
];
const activeFastPanelIndex = ref(0);
</script>

<template>
  <el-card shadow="never" class="mb-[24px]">
    <template #header>
      <div class="flex-bc">
        <p>快捷方式</p>
        <!-- 小圆点 -->
        <div class="flex gap-[5px]">
          <div
            v-for="(item, index) in Math.ceil(fastItems.length / fastPanelNum)"
            :key="item"
            :class="{
              '!bg-blue-400': activeFastPanelIndex === index
            }"
            class="w-[10px] h-[10px] bg-gray-200 rounded-full transition-all ease-out duration-300"
            @mouseenter="activeFastPanelIndex = index"
          />
        </div>
      </div>
    </template>
    <div class="overflow-hidden">
      <div
        class="flex transition-all ease-out duration-300 h-full"
        :style="{
          width: `${Math.ceil(fastItems.length / fastPanelNum) * 100}%`,
          transform: `translateX(-${
            activeFastPanelIndex *
            (100 / Math.ceil(fastItems.length / fastPanelNum))
          }%)`
        }"
      >
        <div
          class="fast-panel"
          v-for="(item, index) in Math.ceil(fastItems.length / fastPanelNum)"
          :key="item"
        >
          <div
            class="fast-panel__item"
            v-for="_item in fastItems.slice(
              index * fastPanelNum,
              (index + 1) * fastPanelNum
            )"
            :key="_item.name"
          >
            <div class="icon-content">
              <IconifyIconOffline :icon="_item.icon" class="icon" />
            </div>
            <p class="text">{{ _item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.fast-panel {
  @apply flex-1 h-full grid grid-cols-4 grid-rows-2 gap-[10px];

  &__item {
    @apply flex-col-c gap-[10px] cursor-pointer h-[100px];

    .icon-content {
      @apply flex-1 flex w-full bg-gray-50 dark:bg-transparent rounded-sm hover:shadow-lg;

      .icon {
        @apply text-[32px] m-auto dark:text-white;
      }
    }

    .text {
      @apply text-[16px] text-gray-900 font-extralight dark:text-white;
    }
  }
}
</style>
