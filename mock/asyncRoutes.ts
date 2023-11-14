// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "权限管理",
    icon: "lollipop",
    rank: 10
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "页面权限"
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "按钮权限",
        auths: ["btn_add", "btn_edit"]
      }
    }
  ]
};

const auditRouter = {
  path: "/audit",
  meta: {
    title: "审核中心",
    icon: "lollipop",
    rank: 50
  },
  children: [
    {
      path: "/audit/my/index",
      name: "AuditMy",
      meta: {
        title: "待我审核"
      }
    },
    {
      path: "/audit/history/index",
      name: "AuditHistory",
      meta: {
        title: "审核历史"
      }
    }
  ]
};

const myRouter = {
  path: "/my",
  meta: {
    title: "个人中心",
    icon: "lollipop",
    rank: 80
  },
  children: [
    {
      path: "/my/index",
      name: "My",
      meta: {
        title: "个人中心"
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [permissionRouter, auditRouter, myRouter]
      };
    }
  }
] as MockMethod[];
