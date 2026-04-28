import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { F as FolderBrowser } from './FolderBrowser-BWK0KtmX.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {createElementVNode:_createElementVNode,resolveComponent:_resolveComponent,createVNode:_createVNode,createTextVNode:_createTextVNode,withCtx:_withCtx,toDisplayString:_toDisplayString,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,createElementBlock:_createElementBlock} = await importShared('vue');

const _hoisted_1 = { class: "seedkeeper-config" };
const _hoisted_2 = { class: "strategy-group mt-4 mb-2" };
const _hoisted_3 = { class: "text-subtitle-2 mb-2 text-medium-emphasis" };
const _hoisted_4 = { class: "d-flex gap-2" };
const {ref,onMounted} = await importShared('vue');
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "Config",
  props: {
    initialConfig: {},
    api: {}
  },
  emits: ["save", "close", "switch"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const dirBrowseDialog = ref(false);
    const dirBrowseValue = ref("");
    const downloaderOptions = ref([]);
    function openDirBrowse() {
      dirBrowseValue.value = config.value.seed_dir || "";
      dirBrowseDialog.value = true;
    }
    function onDirConfirm(path) {
      config.value.seed_dir = path;
      dirBrowseDialog.value = false;
    }
    const config = ref({
      enabled: false,
      auto_seed: true,
      strategy: "ratio",
      min_ratio: 1,
      max_ratio: 5,
      seed_time_limit: 0,
      remove_on_limit: false,
      downloaders: [],
      seed_dir: ""
    });
    onMounted(async () => {
      if (props.initialConfig) {
        config.value = { ...config.value, ...props.initialConfig };
      }
      await fetchDownloaders();
    });
    async function fetchDownloaders() {
      try {
        const res = await props.api.get("plugin/Seedkeeper/downloaders/list");
        if (res.downloaders && Array.isArray(res.downloaders)) {
          downloaderOptions.value = res.downloaders.map((d) => ({
            title: `${d.name}${d.type ? " (" + d.type + ")" : ""}`,
            value: d.name,
            disabled: !d.enabled
          }));
        }
      } catch (e) {
        console.warn("获取下载器列表失败:", e);
      }
    }
    function saveConfig() {
      emit("save", config.value);
    }
    function switchToDetail() {
      emit("switch");
    }
    return (_ctx, _cache) => {
      const _component_v_switch = _resolveComponent("v-switch");
      const _component_v_icon = _resolveComponent("v-icon");
      const _component_v_btn = _resolveComponent("v-btn");
      const _component_v_btn_toggle = _resolveComponent("v-btn-toggle");
      const _component_v_text_field = _resolveComponent("v-text-field");
      const _component_v_col = _resolveComponent("v-col");
      const _component_v_row = _resolveComponent("v-row");
      const _component_v_select = _resolveComponent("v-select");
      const _component_v_divider = _resolveComponent("v-divider");
      const _component_v_alert = _resolveComponent("v-alert");
      const _component_v_spacer = _resolveComponent("v-spacer");
      const _component_v_card_title = _resolveComponent("v-card-title");
      const _component_v_card_text = _resolveComponent("v-card-text");
      const _component_v_card = _resolveComponent("v-card");
      const _component_v_dialog = _resolveComponent("v-dialog");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _cache[30] || (_cache[30] = _createElementVNode("div", { class: "text-h6 mb-4" }, "SeedKeeper 做种助手 - 配置", -1)),
        _createVNode(_component_v_switch, {
          modelValue: config.value.enabled,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => config.value.enabled = $event),
          label: "启用插件",
          color: "primary",
          density: "compact",
          hint: "开启后自动管理做种任务",
          "persistent-hint": ""
        }, null, 8, ["modelValue"]),
        _createVNode(_component_v_switch, {
          modelValue: config.value.auto_seed,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => config.value.auto_seed = $event),
          label: "自动做种",
          color: "primary",
          density: "compact",
          hint: "下载完成后自动开始做种",
          "persistent-hint": "",
          disabled: !config.value.enabled
        }, null, 8, ["modelValue", "disabled"]),
        _createElementVNode("div", _hoisted_2, [
          _cache[19] || (_cache[19] = _createElementVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, "做种策略（决定何时停止做种）", -1)),
          _createVNode(_component_v_btn_toggle, {
            modelValue: config.value.strategy,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => config.value.strategy = $event),
            mandatory: "",
            color: "primary",
            density: "compact",
            class: "strategy-toggle"
          }, {
            default: _withCtx(() => [
              _createVNode(_component_v_btn, {
                value: "ratio",
                size: "small"
              }, {
                default: _withCtx(() => [
                  _createVNode(_component_v_icon, {
                    start: "",
                    size: "16"
                  }, {
                    default: _withCtx(() => [..._cache[13] || (_cache[13] = [
                      _createTextVNode("mdi-chart-areaspline", -1)
                    ])]),
                    _: 1
                  }),
                  _cache[14] || (_cache[14] = _createTextVNode(" 按分享率 ", -1))
                ]),
                _: 1
              }),
              _createVNode(_component_v_btn, {
                value: "seedtime",
                size: "small"
              }, {
                default: _withCtx(() => [
                  _createVNode(_component_v_icon, {
                    start: "",
                    size: "16"
                  }, {
                    default: _withCtx(() => [..._cache[15] || (_cache[15] = [
                      _createTextVNode("mdi-clock-outline", -1)
                    ])]),
                    _: 1
                  }),
                  _cache[16] || (_cache[16] = _createTextVNode(" 按做种时间 ", -1))
                ]),
                _: 1
              }),
              _createVNode(_component_v_btn, {
                value: "manual",
                size: "small"
              }, {
                default: _withCtx(() => [
                  _createVNode(_component_v_icon, {
                    start: "",
                    size: "16"
                  }, {
                    default: _withCtx(() => [..._cache[17] || (_cache[17] = [
                      _createTextVNode("mdi-hand-pointing-up", -1)
                    ])]),
                    _: 1
                  }),
                  _cache[18] || (_cache[18] = _createTextVNode(" 手动管理 ", -1))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _createVNode(_component_v_row, { class: "mt-4" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_col, { cols: "6" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_text_field, {
                  modelValue: config.value.min_ratio,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => config.value.min_ratio = $event),
                  modelModifiers: { number: true },
                  label: "最小分享率",
                  type: "number",
                  density: "compact",
                  hint: "达到此分享率后开始计算",
                  disabled: config.value.strategy !== "ratio",
                  min: "0",
                  step: "0.1"
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            _createVNode(_component_v_col, { cols: "6" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_text_field, {
                  modelValue: config.value.max_ratio,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => config.value.max_ratio = $event),
                  modelModifiers: { number: true },
                  label: "最大分享率",
                  type: "number",
                  density: "compact",
                  hint: "达到此分享率后自动处理",
                  disabled: config.value.strategy !== "ratio",
                  min: "0",
                  step: "0.1"
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        _createVNode(_component_v_text_field, {
          modelValue: config.value.seed_time_limit,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => config.value.seed_time_limit = $event),
          modelModifiers: { number: true },
          label: "做种时间限制（小时）",
          type: "number",
          density: "compact",
          hint: "0 表示不做限制",
          "persistent-hint": "",
          disabled: config.value.strategy !== "seedtime",
          min: "0",
          class: "mt-2"
        }, null, 8, ["modelValue", "disabled"]),
        _createVNode(_component_v_switch, {
          modelValue: config.value.remove_on_limit,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => config.value.remove_on_limit = $event),
          label: "达到限制后删除种子",
          color: "error",
          density: "compact",
          hint: "否则只暂停不做种",
          "persistent-hint": "",
          disabled: !config.value.enabled
        }, null, 8, ["modelValue", "disabled"]),
        _createVNode(_component_v_select, {
          modelValue: config.value.downloaders,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => config.value.downloaders = $event),
          items: downloaderOptions.value,
          label: "下载器",
          density: "compact",
          multiple: "",
          chips: "",
          "closable-chips": "",
          hint: "勾选要由 SeedKeeper 管理的下载器（仅显示已在 MoviePilot 中配置的下载器）",
          "persistent-hint": "",
          class: "mt-4"
        }, null, 8, ["modelValue", "items"]),
        _createVNode(_component_v_divider, { class: "my-4" }),
        _createElementVNode("div", _hoisted_3, [
          _createVNode(_component_v_icon, {
            size: "small",
            class: "mr-1"
          }, {
            default: _withCtx(() => [..._cache[20] || (_cache[20] = [
              _createTextVNode("mdi-folder-open", -1)
            ])]),
            _: 1
          }),
          _cache[21] || (_cache[21] = _createTextVNode(" 做种目录设置 ", -1))
        ]),
        _createVNode(_component_v_text_field, {
          modelValue: config.value.seed_dir,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => config.value.seed_dir = $event),
          label: "默认做种目录",
          density: "compact",
          hint: "转移完成后种子使用此目录继续上传做种。留空则保持下载器原始保存路径不变。",
          "persistent-hint": "",
          placeholder: "例如：/vol2/1000/qBittorrent/seeding",
          "prepend-inner-icon": "mdi-folder-outline",
          clearable: "",
          class: "mb-2"
        }, {
          "append-inner": _withCtx(() => [
            _createVNode(_component_v_btn, {
              icon: "",
              size: "x-small",
              variant: "text",
              color: "primary",
              title: "浏览目录",
              onClick: openDirBrowse
            }, {
              default: _withCtx(() => [
                _createVNode(_component_v_icon, { size: "16" }, {
                  default: _withCtx(() => [..._cache[22] || (_cache[22] = [
                    _createTextVNode("mdi-folder-search", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        config.value.seed_dir ? (_openBlock(), _createBlock(_component_v_alert, {
          key: 0,
          type: "info",
          variant: "tonal",
          density: "compact",
          class: "mb-4"
        }, {
          default: _withCtx(() => [
            _cache[23] || (_cache[23] = _createTextVNode(" 转移完成后，种子保存路径将自动切换到 ", -1)),
            _createElementVNode("strong", null, _toDisplayString(config.value.seed_dir), 1),
            _cache[24] || (_cache[24] = _createTextVNode("，以便继续做种上传。 每个任务也可在任务列表中单独覆盖此目录。 ", -1))
          ]),
          _: 1
        })) : _createCommentVNode("", true),
        _createVNode(_component_v_divider, { class: "my-4" }),
        _createElementVNode("div", _hoisted_4, [
          _createVNode(_component_v_btn, {
            color: "primary",
            onClick: saveConfig,
            disabled: !config.value.enabled
          }, {
            default: _withCtx(() => [..._cache[25] || (_cache[25] = [
              _createTextVNode(" 保存配置 ", -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          _createVNode(_component_v_btn, {
            variant: "text",
            onClick: switchToDetail
          }, {
            default: _withCtx(() => [..._cache[26] || (_cache[26] = [
              _createTextVNode(" 查看详情 ", -1)
            ])]),
            _: 1
          }),
          _createVNode(_component_v_spacer),
          _createVNode(_component_v_btn, {
            variant: "text",
            onClick: _cache[9] || (_cache[9] = ($event) => emit("close"))
          }, {
            default: _withCtx(() => [..._cache[27] || (_cache[27] = [
              _createTextVNode(" 关闭 ", -1)
            ])]),
            _: 1
          })
        ]),
        _createVNode(_component_v_dialog, {
          modelValue: dirBrowseDialog.value,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => dirBrowseDialog.value = $event),
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
                      default: _withCtx(() => [..._cache[28] || (_cache[28] = [
                        _createTextVNode("mdi-folder-search", -1)
                      ])]),
                      _: 1
                    }),
                    _cache[29] || (_cache[29] = _createTextVNode(" 选择默认做种目录 ", -1))
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_card_text, null, {
                  default: _withCtx(() => [
                    _createVNode(FolderBrowser, {
                      api: props.api,
                      modelValue: dirBrowseValue.value,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => dirBrowseValue.value = $event),
                      "initial-path": dirBrowseValue.value || "/",
                      onConfirm: onDirConfirm,
                      onCancel: _cache[11] || (_cache[11] = ($event) => dirBrowseDialog.value = false)
                    }, null, 8, ["api", "modelValue", "initial-path"])
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

const Config = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91d298b5"]]);

export { Config as default };
