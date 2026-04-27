import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { F as FolderBrowser } from './FolderBrowser-TFTRInSr.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {createTextVNode:_createTextVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,createElementVNode:_createElementVNode,toDisplayString:_toDisplayString,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,mergeProps:_mergeProps,createElementBlock:_createElementBlock} = await importShared('vue');

const _hoisted_1 = { class: "seedkeeper-page" };
const _hoisted_2 = { class: "d-flex align-center mb-2" };
const _hoisted_3 = { class: "text-h4" };
const _hoisted_4 = { class: "text-h4" };
const _hoisted_5 = { class: "text-h4" };
const _hoisted_6 = { class: "text-h4" };
const _hoisted_7 = { class: "d-flex align-center" };
const _hoisted_8 = {
  key: 0,
  class: "text-caption text-medium-emphasis mb-3 d-flex align-center"
};
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
    const dirDialog = ref(false);
    const dirDialogTask = ref(null);
    const dirDialogValue = ref("");
    const dirDialogLoading = ref(false);
    const dirDialogMsg = ref("");
    const dirInputTab = ref("browse");
    const globalSeedDir = ref("");
    onMounted(async () => {
      await loadData();
      try {
        const cfg = await props.api.get("plugin/Seedkeeper/config/seed_dir");
        globalSeedDir.value = cfg?.seed_dir || "";
      } catch {
      }
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
    function openDirDialog(task) {
      dirDialogTask.value = task;
      dirDialogValue.value = task.seed_dir || "";
      dirDialogMsg.value = "";
      dirInputTab.value = "browse";
      dirDialog.value = true;
    }
    function onBrowserConfirm(path) {
      dirDialogValue.value = path;
    }
    async function submitDirChange() {
      if (!dirDialogTask.value) return;
      dirDialogLoading.value = true;
      dirDialogMsg.value = "";
      try {
        const res = await props.api.post("plugin/Seedkeeper/task/set_seed_dir", {
          hash: dirDialogTask.value.hash,
          seed_dir: dirDialogValue.value
        });
        dirDialogMsg.value = res?.message || "已更新";
        const idx = tasks.value.findIndex((t) => t.hash === dirDialogTask.value.hash);
        if (idx !== -1) tasks.value[idx].seed_dir = dirDialogValue.value;
        setTimeout(() => {
          dirDialog.value = false;
        }, 800);
      } catch (e) {
        dirDialogMsg.value = "更新失败，请重试";
      } finally {
        dirDialogLoading.value = false;
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
    function displayDir(dir) {
      if (!dir) return "—";
      if (dir.length > 28) return "..." + dir.slice(-25);
      return dir;
    }
    return (_ctx, _cache) => {
      const _component_v_icon = _resolveComponent("v-icon");
      const _component_v_btn = _resolveComponent("v-btn");
      const _component_v_card_text = _resolveComponent("v-card-text");
      const _component_v_card = _resolveComponent("v-card");
      const _component_v_col = _resolveComponent("v-col");
      const _component_v_row = _resolveComponent("v-row");
      const _component_v_spacer = _resolveComponent("v-spacer");
      const _component_v_card_title = _resolveComponent("v-card-title");
      const _component_v_progress_linear = _resolveComponent("v-progress-linear");
      const _component_v_tooltip = _resolveComponent("v-tooltip");
      const _component_v_chip = _resolveComponent("v-chip");
      const _component_v_data_table = _resolveComponent("v-data-table");
      const _component_v_tab = _resolveComponent("v-tab");
      const _component_v_tabs = _resolveComponent("v-tabs");
      const _component_v_window_item = _resolveComponent("v-window-item");
      const _component_v_text_field = _resolveComponent("v-text-field");
      const _component_v_window = _resolveComponent("v-window");
      const _component_v_alert = _resolveComponent("v-alert");
      const _component_v_card_actions = _resolveComponent("v-card-actions");
      const _component_v_dialog = _resolveComponent("v-dialog");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createVNode(_component_v_btn, {
            color: "primary",
            size: "small",
            onClick: notifyRefresh,
            loading: loading.value,
            class: "mr-2"
          }, {
            default: _withCtx(() => [
              _createVNode(_component_v_icon, {
                size: "small",
                class: "mr-1"
              }, {
                default: _withCtx(() => [..._cache[7] || (_cache[7] = [
                  _createTextVNode("mdi-refresh", -1)
                ])]),
                _: 1
              }),
              _cache[8] || (_cache[8] = _createTextVNode("刷新 ", -1))
            ]),
            _: 1
          }, 8, ["loading"]),
          _createVNode(_component_v_btn, {
            size: "small",
            onClick: notifySwitch,
            class: "mr-2"
          }, {
            default: _withCtx(() => [
              _createVNode(_component_v_icon, {
                size: "small",
                class: "mr-1"
              }, {
                default: _withCtx(() => [..._cache[9] || (_cache[9] = [
                  _createTextVNode("mdi-cog", -1)
                ])]),
                _: 1
              }),
              _cache[10] || (_cache[10] = _createTextVNode("配置 ", -1))
            ]),
            _: 1
          }),
          _createVNode(_component_v_btn, {
            size: "small",
            onClick: notifyClose
          }, {
            default: _withCtx(() => [..._cache[11] || (_cache[11] = [
              _createTextVNode("关闭", -1)
            ])]),
            _: 1
          })
        ]),
        _createVNode(_component_v_row, { class: "mt-2" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_col, { cols: "3" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_card, {
                  color: "primary",
                  variant: "tonal"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_text, { class: "text-center pa-2" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_3, _toDisplayString(stats.value.total), 1),
                        _cache[12] || (_cache[12] = _createElementVNode("div", { class: "text-caption" }, "总计", -1))
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
                    _createVNode(_component_v_card_text, { class: "text-center pa-2" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_4, _toDisplayString(stats.value.active), 1),
                        _cache[13] || (_cache[13] = _createElementVNode("div", { class: "text-caption" }, "做种中", -1))
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
                    _createVNode(_component_v_card_text, { class: "text-center pa-2" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_5, _toDisplayString(stats.value.completed), 1),
                        _cache[14] || (_cache[14] = _createElementVNode("div", { class: "text-caption" }, "已完成", -1))
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
                    _createVNode(_component_v_card_text, { class: "text-center pa-2" }, {
                      default: _withCtx(() => [
                        _createElementVNode("div", _hoisted_6, _toDisplayString(stats.value.pending), 1),
                        _cache[15] || (_cache[15] = _createElementVNode("div", { class: "text-caption" }, "等待中", -1))
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
                _createVNode(_component_v_icon, { class: "mr-2" }, {
                  default: _withCtx(() => [..._cache[16] || (_cache[16] = [
                    _createTextVNode("mdi-sprout", -1)
                  ])]),
                  _: 1
                }),
                _cache[18] || (_cache[18] = _createElementVNode("span", null, "做种任务列表", -1)),
                _createVNode(_component_v_spacer),
                _createVNode(_component_v_btn, {
                  icon: "",
                  size: "small",
                  variant: "text",
                  onClick: loadData
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_icon, null, {
                      default: _withCtx(() => [..._cache[17] || (_cache[17] = [
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
              class: "text-center text-grey py-8"
            }, {
              default: _withCtx(() => [
                _createVNode(_component_v_icon, {
                  size: "48",
                  class: "mb-2 text-grey-lighten-1"
                }, {
                  default: _withCtx(() => [..._cache[19] || (_cache[19] = [
                    _createTextVNode("mdi-sprout-outline", -1)
                  ])]),
                  _: 1
                }),
                _cache[20] || (_cache[20] = _createElementVNode("div", null, "暂无做种任务", -1))
              ]),
              _: 1
            })) : (_openBlock(), _createBlock(_component_v_data_table, {
              key: 2,
              headers: [
                { title: "任务名称", key: "name", minWidth: "160px" },
                { title: "做种目录", key: "seed_dir", minWidth: "140px" },
                { title: "分享率", key: "ratio", width: "90px" },
                { title: "做种时间", key: "seeding_time", width: "90px" },
                { title: "状态", key: "status", width: "90px" },
                { title: "操作", key: "actions", width: "220px", sortable: false }
              ],
              items: tasks.value,
              density: "compact",
              "hide-default-footer": ""
            }, {
              "item.seed_dir": _withCtx(({ item }) => [
                _createElementVNode("div", _hoisted_7, [
                  _createVNode(_component_v_tooltip, {
                    text: item.seed_dir || "（使用下载器原始路径）",
                    location: "top"
                  }, {
                    activator: _withCtx(({ props: tp }) => [
                      _createElementVNode("span", _mergeProps(tp, {
                        class: ["text-caption dir-cell", item.seed_dir ? "text-success" : "text-disabled"]
                      }), [
                        _createVNode(_component_v_icon, {
                          size: "12",
                          class: "mr-1"
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode("mdi-folder" + _toDisplayString(item.seed_dir ? "-open" : "-outline"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        _createTextVNode(" " + _toDisplayString(displayDir(item.seed_dir)), 1)
                      ], 16)
                    ]),
                    _: 2
                  }, 1032, ["text"]),
                  _createVNode(_component_v_btn, {
                    icon: "",
                    size: "x-small",
                    variant: "text",
                    color: "primary",
                    class: "ml-1",
                    onClick: ($event) => openDirDialog(item),
                    title: "修改做种目录"
                  }, {
                    default: _withCtx(() => [
                      _createVNode(_component_v_icon, { size: "14" }, {
                        default: _withCtx(() => [..._cache[21] || (_cache[21] = [
                          _createTextVNode("mdi-pencil-outline", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ]),
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
                  default: _withCtx(() => [..._cache[22] || (_cache[22] = [
                    _createTextVNode("恢复", -1)
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
                  default: _withCtx(() => [..._cache[23] || (_cache[23] = [
                    _createTextVNode("暂停", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])) : _createCommentVNode("", true),
                _createVNode(_component_v_btn, {
                  size: "x-small",
                  color: "primary",
                  variant: "text",
                  onClick: ($event) => openDirDialog(item)
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_icon, {
                      size: "14",
                      class: "mr-1"
                    }, {
                      default: _withCtx(() => [..._cache[24] || (_cache[24] = [
                        _createTextVNode("mdi-folder-edit", -1)
                      ])]),
                      _: 1
                    }),
                    _cache[25] || (_cache[25] = _createTextVNode("目录 ", -1))
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                _createVNode(_component_v_btn, {
                  size: "x-small",
                  color: "error",
                  variant: "text",
                  onClick: ($event) => removeTask(item.hash)
                }, {
                  default: _withCtx(() => [..._cache[26] || (_cache[26] = [
                    _createTextVNode("删除", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            }, 8, ["items"]))
          ]),
          _: 1
        }),
        _createVNode(_component_v_dialog, {
          modelValue: dirDialog.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => dirDialog.value = $event),
          "max-width": "560",
          persistent: ""
        }, {
          default: _withCtx(() => [
            _createVNode(_component_v_card, null, {
              default: _withCtx(() => [
                _createVNode(_component_v_card_title, { class: "d-flex align-center pb-1" }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_icon, {
                      class: "mr-2",
                      color: "primary"
                    }, {
                      default: _withCtx(() => [..._cache[27] || (_cache[27] = [
                        _createTextVNode("mdi-folder-edit", -1)
                      ])]),
                      _: 1
                    }),
                    _cache[28] || (_cache[28] = _createTextVNode(" 选择做种目录 ", -1))
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_card_text, { class: "pb-1" }, {
                  default: _withCtx(() => [
                    dirDialogTask.value ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
                      _createVNode(_component_v_icon, {
                        size: "14",
                        class: "mr-1"
                      }, {
                        default: _withCtx(() => [..._cache[29] || (_cache[29] = [
                          _createTextVNode("mdi-seed", -1)
                        ])]),
                        _: 1
                      }),
                      _createTextVNode(" " + _toDisplayString(dirDialogTask.value.name || dirDialogTask.value.hash), 1)
                    ])) : _createCommentVNode("", true),
                    _createVNode(_component_v_tabs, {
                      modelValue: dirInputTab.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dirInputTab.value = $event),
                      density: "compact",
                      class: "mb-3"
                    }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_tab, { value: "browse" }, {
                          default: _withCtx(() => [
                            _createVNode(_component_v_icon, {
                              size: "16",
                              class: "mr-1"
                            }, {
                              default: _withCtx(() => [..._cache[30] || (_cache[30] = [
                                _createTextVNode("mdi-folder-open", -1)
                              ])]),
                              _: 1
                            }),
                            _cache[31] || (_cache[31] = _createTextVNode("浏览目录 ", -1))
                          ]),
                          _: 1
                        }),
                        _createVNode(_component_v_tab, { value: "input" }, {
                          default: _withCtx(() => [
                            _createVNode(_component_v_icon, {
                              size: "16",
                              class: "mr-1"
                            }, {
                              default: _withCtx(() => [..._cache[32] || (_cache[32] = [
                                _createTextVNode("mdi-pencil", -1)
                              ])]),
                              _: 1
                            }),
                            _cache[33] || (_cache[33] = _createTextVNode("手动输入 ", -1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    _createVNode(_component_v_window, {
                      modelValue: dirInputTab.value,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dirInputTab.value = $event)
                    }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_window_item, { value: "browse" }, {
                          default: _withCtx(() => [
                            _createVNode(FolderBrowser, {
                              api: props.api,
                              modelValue: dirDialogValue.value,
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => dirDialogValue.value = $event),
                              "initial-path": dirDialogValue.value || globalSeedDir.value || "/",
                              onConfirm: onBrowserConfirm,
                              onCancel: _cache[2] || (_cache[2] = ($event) => dirDialog.value = false)
                            }, null, 8, ["api", "modelValue", "initial-path"])
                          ]),
                          _: 1
                        }),
                        _createVNode(_component_v_window_item, { value: "input" }, {
                          default: _withCtx(() => [
                            _createVNode(_component_v_text_field, {
                              modelValue: dirDialogValue.value,
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dirDialogValue.value = $event),
                              label: "做种目录路径",
                              density: "compact",
                              placeholder: globalSeedDir.value || "例如：/vol2/1000/qBittorrent/seeding",
                              "prepend-inner-icon": "mdi-folder-outline",
                              clearable: "",
                              autofocus: "",
                              hint: "设置后将立即通知下载器切换该种子的保存路径，留空则恢复为默认",
                              "persistent-hint": ""
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    dirDialogMsg.value ? (_openBlock(), _createBlock(_component_v_alert, {
                      key: 1,
                      type: dirDialogMsg.value.includes("失败") ? "error" : "success",
                      variant: "tonal",
                      density: "compact",
                      class: "mt-3"
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(dirDialogMsg.value), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])) : _createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_card_actions, null, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_spacer),
                    _createVNode(_component_v_btn, {
                      variant: "text",
                      onClick: _cache[5] || (_cache[5] = ($event) => dirDialog.value = false),
                      disabled: dirDialogLoading.value
                    }, {
                      default: _withCtx(() => [..._cache[34] || (_cache[34] = [
                        _createTextVNode("取消", -1)
                      ])]),
                      _: 1
                    }, 8, ["disabled"]),
                    _createVNode(_component_v_btn, {
                      color: "primary",
                      variant: "flat",
                      onClick: submitDirChange,
                      loading: dirDialogLoading.value,
                      disabled: !dirDialogValue.value
                    }, {
                      default: _withCtx(() => [..._cache[35] || (_cache[35] = [
                        _createTextVNode(" 确认应用 ", -1)
                      ])]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});

const Page = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0b94766c"]]);

export { Page as default };
