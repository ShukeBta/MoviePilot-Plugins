import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {createTextVNode:_createTextVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,toDisplayString:_toDisplayString,createElementVNode:_createElementVNode,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,createElementBlock:_createElementBlock} = await importShared('vue');

const _hoisted_1 = { class: "seedkeeper-page" };
const _hoisted_2 = { class: "text-h4" };
const _hoisted_3 = { class: "text-h4" };
const _hoisted_4 = { class: "text-h4" };
const _hoisted_5 = { class: "text-h4" };
const {ref,onMounted} = await importShared('vue');

const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "Page",
  props: {
    api: {}
  },
  emits: ["action", "switch", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tasks = ref([]);
    const stats = ref({ total: 0, active: 0, completed: 0, pending: 0 });
    const loading = ref(false);
    onMounted(async () => {
      await loadData();
    });
    async function loadData() {
      loading.value = true;
      try {
        const [statsData, tasksData] = await Promise.all([
          props.api.get("plugin/Seedkeeper/stats"),
          props.api.get("plugin/Seedkeeper/tasks")
        ]);
        stats.value = statsData || { total: 0, active: 0, completed: 0, pending: 0 };
        tasks.value = tasksData || [];
      } catch (e) {
        console.error("加载数据失败:", e);
      } finally {
        loading.value = false;
      }
    }
    function notifyRefresh() {
      emit("action");
      loadData();
    }
    function notifySwitch() {
      emit("switch");
    }
    function notifyClose() {
      emit("close");
    }
    async function resumeTask(hash) {
      try {
        await props.api.post("plugin/Seedkeeper/task/resume", { hash });
        await loadData();
      } catch (e) {
        console.error("恢复任务失败:", e);
      }
    }
    async function pauseTask(hash) {
      try {
        await props.api.post("plugin/Seedkeeper/task/pause", { hash });
        await loadData();
      } catch (e) {
        console.error("暂停任务失败:", e);
      }
    }
    async function removeTask(hash) {
      try {
        await props.api.post("plugin/Seedkeeper/task/remove", { hash });
        await loadData();
      } catch (e) {
        console.error("删除任务失败:", e);
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "seeding":
          return "success";
        case "paused":
          return "warning";
        case "completed":
          return "info";
        default:
          return "grey";
      }
    }
    function getStatusText(status) {
      switch (status) {
        case "seeding":
          return "做种中";
        case "paused":
          return "已暂停";
        case "completed":
          return "已完成";
        default:
          return "等待中";
      }
    }
    return (_ctx, _cache) => {
      const _component_v_btn = _resolveComponent("v-btn");
      const _component_v_card_text = _resolveComponent("v-card-text");
      const _component_v_card = _resolveComponent("v-card");
      const _component_v_col = _resolveComponent("v-col");
      const _component_v_row = _resolveComponent("v-row");
      const _component_v_spacer = _resolveComponent("v-spacer");
      const _component_v_icon = _resolveComponent("v-icon");
      const _component_v_card_title = _resolveComponent("v-card-title");
      const _component_v_progress_linear = _resolveComponent("v-progress-linear");
      const _component_v_chip = _resolveComponent("v-chip");
      const _component_v_data_table = _resolveComponent("v-data-table");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createVNode(_component_v_btn, {
          color: "primary",
          size: "small",
          onClick: notifyRefresh,
          loading: loading.value,
          class: "mr-2"
        }, {
          default: _withCtx(() => [..._cache[0] || (_cache[0] = [
            _createTextVNode(" 刷新 ", -1)
          ])]),
          _: 1
        }, 8, ["loading"]),
        _createVNode(_component_v_btn, {
          size: "small",
          onClick: notifySwitch,
          class: "mr-2"
        }, {
          default: _withCtx(() => [..._cache[1] || (_cache[1] = [
            _createTextVNode(" 配置 ", -1)
          ])]),
          _: 1
        }),
        _createVNode(_component_v_btn, {
          size: "small",
          onClick: notifyClose
        }, {
          default: _withCtx(() => [..._cache[2] || (_cache[2] = [
            _createTextVNode(" 关闭 ", -1)
          ])]),
          _: 1
        }),
        _createVNode(_component_v_row, { class: "mt-4" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_col, { cols: "3" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_card, {
                  color: "primary",
                  variant: "tonal"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_text, { class: "text-center" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_2, _toDisplayString(stats.value.total), 1),
                        _cache[3] || (_cache[3] = _createElementVNode("div", { class: "text-caption" }, "总计", -1))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            _createVNode(_component_v_col, { cols: "3" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_card, {
                  color: "success",
                  variant: "tonal"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_text, { class: "text-center" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_3, _toDisplayString(stats.value.active), 1),
                        _cache[4] || (_cache[4] = _createElementVNode("div", { class: "text-caption" }, "做种中", -1))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            _createVNode(_component_v_col, { cols: "3" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_card, {
                  color: "info",
                  variant: "tonal"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_text, { class: "text-center" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_4, _toDisplayString(stats.value.completed), 1),
                        _cache[5] || (_cache[5] = _createElementVNode("div", { class: "text-caption" }, "已完成", -1))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            _createVNode(_component_v_col, { cols: "3" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_card, {
                  color: "warning",
                  variant: "tonal"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_text, { class: "text-center" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_5, _toDisplayString(stats.value.pending), 1),
                        _cache[6] || (_cache[6] = _createElementVNode("div", { class: "text-caption" }, "等待中", -1))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        _createVNode(_component_v_card, { class: "mt-4" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_card_title, { class: "d-flex align-center" }, {
              default: _withCtx(() => [
                _cache[8] || (_cache[8] = _createElementVNode("span", null, "做种任务列表", -1)),
                _createVNode(_component_v_spacer),
                _createVNode(_component_v_btn, {
                  icon: "",
                  size: "small",
                  variant: "text",
                  onClick: loadData
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_icon, null, {
                      default: _withCtx(() => [..._cache[7] || (_cache[7] = [
                        _createTextVNode("mdi-refresh", -1)
                      ])]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            loading.value ? (_openBlock(), _createBlock(_component_v_card_text, { key: 0 }, {
              default: _withCtx(() => [
                _createVNode(_component_v_progress_linear, { indeterminate: "" })
              ]),
              _: 1
            })) : tasks.value.length === 0 ? (_openBlock(), _createBlock(_component_v_card_text, {
              key: 1,
              class: "text-center text-grey"
            }, {
              default: _withCtx(() => [..._cache[9] || (_cache[9] = [
                _createTextVNode(" 暂无做种任务 ", -1)
              ])]),
              _: 1
            })) : (_openBlock(), _createBlock(_component_v_data_table, {
              key: 2,
              headers: [
                { title: "任务名称", key: "name" },
                { title: "分享率", key: "ratio", width: "100px" },
                { title: "做种时间", key: "seeding_time", width: "100px" },
                { title: "状态", key: "status", width: "100px" },
                { title: "操作", key: "actions", width: "200px", sortable: false }
              ],
              items: tasks.value,
              density: "compact",
              "hide-default-footer": ""
            }, {
              "item.ratio": _withCtx(({ item }) => [
                _createTextVNode(_toDisplayString((item.ratio || 0).toFixed(2)), 1)
              ]),
              "item.seeding_time": _withCtx(({ item }) => [
                _createTextVNode(_toDisplayString(item.seeding_time || 0) + "h ", 1)
              ]),
              "item.status": _withCtx(({ item }) => [
                _createVNode(_component_v_chip, {
                  color: getStatusColor(item.status),
                  size: "small",
                  variant: "tonal"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(getStatusText(item.status)), 1)
                  ]),
                  _: 2
                }, 1032, ["color"])
              ]),
              "item.actions": _withCtx(({ item }) => [
                item.status === "paused" ? (_openBlock(), _createBlock(_component_v_btn, {
                  key: 0,
                  size: "x-small",
                  color: "success",
                  variant: "text",
                  onClick: ($event) => resumeTask(item.hash)
                }, {
                  default: _withCtx(() => [..._cache[10] || (_cache[10] = [
                    _createTextVNode(" 恢复 ", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : _createCommentVNode("", true),
                item.status === "seeding" ? (_openBlock(), _createBlock(_component_v_btn, {
                  key: 1,
                  size: "x-small",
                  color: "warning",
                  variant: "text",
                  onClick: ($event) => pauseTask(item.hash)
                }, {
                  default: _withCtx(() => [..._cache[11] || (_cache[11] = [
                    _createTextVNode(" 暂停 ", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : _createCommentVNode("", true),
                _createVNode(_component_v_btn, {
                  size: "x-small",
                  color: "error",
                  variant: "text",
                  onClick: ($event) => removeTask(item.hash)
                }, {
                  default: _withCtx(() => [..._cache[12] || (_cache[12] = [
                    _createTextVNode(" 删除 ", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            }, 8, ["items"]))
          ]),
          _: 1
        })
      ]);
    };
  }
});

const Page = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb1a45f4"]]);

export { Page as default };
