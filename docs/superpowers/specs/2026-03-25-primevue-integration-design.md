# PrimeVue 集成设计

## 背景

当前项目是一个轻量级 Vue 3 + Vite+ 模板，入口通过 `src/main.ts` 动态加载 `src/modules/*.ts` 安装应用级模块。项目尚未接入任何 UI 组件库，首页 `src/pages/index.vue` 目前使用手写结构与样式展示模板能力。

本次目标是在不扩大范围的前提下，将 PrimeVue 作为项目级 UI 基础设施接入，并在首页直接使用 PrimeVue 组件完成可见验收。

## 目标

1. 在项目中完成 PrimeVue 基础集成。
2. 使用 PrimeVue 官方主题，使组件具备可直接使用的默认样式。
3. 配置组件自动导入，避免逐个手动引入组件。
4. 在首页使用 PrimeVue 组件替换部分现有展示区块，确保运行后可以明确验证 PrimeVue 已生效。

## 非目标

1. 不进行全站 UI 重构。
2. 不做深度主题定制或设计系统抽象。
3. 不新增复杂业务功能、弹窗流程、表格筛选或表单校验。
4. 不改变现有路由、数据流和 Pinia/Pinia Colada 的使用方式。

## 方案选择

采用 `styled mode + Aura 主题 + 组件自动导入 + 首页局部替换`。

选择原因：

- 与当前模板项目复杂度匹配，接入成本低。
- 可以最快验证插件注册、主题加载与自动导入是否正常。
- 后续继续使用 PrimeVue 时，不需要重复补基础设施。

未采用的方案：

- 仅注册 PrimeVue、不做自动导入：后续维护体验较差。
- 使用 unstyled mode 自行控制全部样式：超出本次“快速集成并验证”的范围。

## 实现设计

### 1. 依赖接入

新增运行时依赖：

- `primevue`
- `@primeuix/themes`

新增开发依赖：

- `unplugin-vue-components`
- `@primevue/auto-import-resolver`

依赖安装统一通过 `vp add` 完成，遵循项目的 Vite+ 工作流约束。

### 2. PrimeVue 模块注册

新增 `src/modules/primevue.ts`，沿用现有模块化安装模式导出 `install(app)`。

职责：

- 注册 PrimeVue 插件。
- 配置主题为 `Aura`。

这样可以保持 `src/main.ts` 无需特殊分支逻辑，PrimeVue 与现有 `pinia.ts`、`router.ts` 一样作为应用模块接入。

### 3. Vite 自动导入配置

在 `vite.config.ts` 中新增 `unplugin-vue-components` 插件，并接入 `PrimeVueResolver()`。

目标：

- 在 Vue SFC 中直接使用 `<Button />`、`<Card />`、`<InputText />`、`<Tag />` 等组件。
- 让类型声明继续生成到项目现有类型目录中，保持当前开发体验。

### 4. 首页改造范围

修改 `src/pages/index.vue`，保持页面“模板介绍 + 示例入口 + 快速链接”的信息结构不变，但将关键展示区域替换为 PrimeVue 组件。

建议使用的组件：

- `Card`：主介绍区与示例区容器
- `Button`：主要入口按钮
- `InputText`：简单输入交互，作为可视化验收点
- `Tag`：技术栈标签

实现原则：

- 仅做最小可见改造，不重写整页布局。
- 保留当前页面文案和路由入口。
- 让 PrimeVue 组件与现有工具类样式共存，而不是完全依赖手写样式模拟组件效果。

## 数据流与状态

首页新增的输入交互仅使用页面本地 `ref` 状态，不引入 Pinia 或额外 composable。

现有 `posts` 数据展示逻辑保持不变，继续直接读取 `src/data/posts.ts`。

## 错误处理

本次集成不新增异步请求链路，错误面主要来自：

- 依赖缺失或版本不兼容
- PrimeVue 插件未注册
- 组件自动导入未生效

通过 `vp check` 和运行时页面渲染即可发现这些问题。若自动导入未生效，应优先检查 `vite.config.ts` 中插件顺序与 resolver 配置。

## 验收标准

1. PrimeVue 相关依赖已安装并写入项目配置。
2. `src/modules/primevue.ts` 已接入并在应用启动时生效。
3. `vite.config.ts` 已支持 PrimeVue 组件自动导入。
4. 首页明确使用至少一组 PrimeVue 组件，运行后具备 PrimeVue 默认主题样式。
5. `vp check` 通过。

## 测试计划

1. 运行 `vp check`，验证格式、lint 与类型检查。
2. 如有必要，运行开发服务器人工检查首页渲染结果。

## 风险与控制

风险主要是 PrimeVue 样式与现有首页工具类存在视觉混搭。

控制方式：

- 将 PrimeVue 组件聚焦在关键模块中使用，而不是在整页无序混用。
- 保持首页布局结构稳定，只替换能够清楚展示集成效果的区域。
