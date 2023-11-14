import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import { PaginationProps } from "@pureadmin/table";
import { FormItemProps } from "./type";

export const useRole = () => {
  const form = reactive({
    resName: void 0
  });
  const selectedNum = ref(0);
  const dataList = ref([
    {
      resSize: "100M",
      resAuth: "1",
      isDownload: "1",
      state: "1",
      createUser: "张三张三",
      createTime: "2023-11-01 18:00"
    }
  ]);
  const loading = ref(false);
  const selectKeys = ref<number[]>([]);
  const pagination = reactive<PaginationProps>({
    total: 0,
    currentPage: 1,
    pageSize: 10,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "资源名称",
      prop: "resName"
    },
    {
      label: "资源大小",
      prop: "resSize",
      width: 100
    },
    {
      label: "资源权限",
      prop: "resAuth",
      width: 100,
      cellRenderer: ({ props: { size }, row: { resAuth } }) =>
        resAuth && (
          <el-tag
            type={
              resAuth === "1" ? "success" : resAuth === "2" ? "danger" : "info"
            }
            size={size}
          >
            {resAuth === "1" ? "共有" : resAuth === "2" ? "私有" : resAuth}
          </el-tag>
        )
    },
    {
      label: "学生权限",
      prop: "isDownload",
      width: 100,
      cellRenderer: ({ props: { size }, row: { isDownload } }) =>
        isDownload && (
          <el-tag
            type={
              isDownload === "1"
                ? "success"
                : isDownload === "2"
                ? "danger"
                : "info"
            }
            size={size}
          >
            {isDownload === "1"
              ? "允许下载"
              : isDownload === "2"
              ? "禁止下载"
              : isDownload}
          </el-tag>
        )
    },
    {
      label: "所属栏目",
      prop: "columnName",
      width: 300
    },
    {
      label: "资源分类",
      prop: "category",
      width: 300
    },
    {
      label: "内容状态",
      prop: "state",
      width: 100,
      cellRenderer: ({ props: { size }, row: { state } }) =>
        state && (
          <el-tag
            type={state === "1" ? "success" : state === "2" ? "danger" : "info"}
            size={size}
          >
            {state === "1" ? "已发布" : state === "2" ? "已下架" : state}
          </el-tag>
        )
    },
    {
      label: "上传人",
      prop: "createUser",
      width: 200
    },
    {
      label: "上传时间",
      prop: "createTime",
      width: 160
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  const onSearch = () => {
    loading.value = true;
    console.log("触发了搜索方法");

    setTimeout(() => {
      loading.value = false;
    }, 500);
  };
  const onSelectionCancel = () => {};
  const onBatchDel = () => {
    console.log(selectKeys.value);
  };

  const handleSelectionChange = val => {
    selectedNum.value = val.length;
    selectKeys.value = val.map(item => item.id);
  };
  const handleImport = () => {};

  const handleDelete = (row: FormItemProps) => {
    message(`您删除了部门名称为${row.resName}的这条数据`, { type: "success" });
    onSearch();
  };

  const handleSizeChange = (val: number) => (pagination.pageSize = val);
  const handleCurrentChange = (val: number) => (pagination.currentPage = val);

  return {
    form,
    selectedNum,
    loading,
    dataList,
    pagination,
    columns,
    onSearch,
    onSelectionCancel,
    onBatchDel,
    handleDelete,
    handleImport,
    handleSelectionChange,
    handleSizeChange,
    handleCurrentChange
  };
};
