<script setup lang="ts">
import { ref, watch } from "vue";
import {
  delay,
  useECharts,
  useDark,
  type EchartOptions
} from "@pureadmin/utils";
import { computed } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { useIntervalFn } from "@vueuse/core";

const { isDark } = useDark();
const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});
const areaChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize, getInstance } = useECharts(areaChartRef, {
  theme
});

const xData = Array.from({ length: 24 }).map((_, index) =>
  index > 10 ? `0${index}:00` : `${index}:00`
);

const pv = Array.from({ length: 24 }).map(() =>
  Math.floor(Math.random() * 1000 + 200)
);
const uv = Array.from({ length: 24 }).map(() =>
  Math.floor(Math.random() * 1000 + 200)
);

setOptions({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {},
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: xData
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "PV",
      type: "line",
      stack: "flow",
      areaStyle: {},
      smooth: true,
      emphasis: {
        focus: "series"
      },
      data: pv
    },
    {
      name: "UV",
      type: "line",
      stack: "flow",
      areaStyle: {},
      smooth: true,
      emphasis: {
        focus: "series"
      },
      data: uv
    }
  ]
});

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);

useIntervalFn(() => {
  getInstance()!.setOption({
    series: [
      {
        data: pv.map(item => {
          return item + Math.floor(Math.random() * 1000 + 200);
        })
      },
      {
        data: uv.map(item => {
          return item + Math.floor(Math.random() * 1000 + 200);
        })
      }
    ]
  });
}, 1000);
</script>

<template>
  <el-card shadow="never">
    <template #header> 今日流量趋势统计 </template>
    <div ref="areaChartRef" style="width: 100%; height: 400px" />
  </el-card>
</template>
