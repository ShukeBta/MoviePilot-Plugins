import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {createElementVNode:_createElementVNode,resolveComponent:_resolveComponent,createVNode:_createVNode,withCtx:_withCtx,createTextVNode:_createTextVNode,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');

const _hoisted_1 = { class: "seedkeeper-config" };
const _hoisted_2 = { class: "d-flex gap-2" };
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
    const config = ref({
      enabled: false,
      auto_seed: true,
      strategy: "ratio",
      min_ratio: 1,
      max_ratio: 5,
      seed_time_limit: 0,
      remove_on_limit: false,
      downloaders: []
    });
    const strategies = [
      { title: "按分享率", value: "ratio" },
      { title: "按做种时间", value: "seedtime" },
      { title: "手动管理", value: "manual" }
    ];
    const downloaderOptions = [
      { title: "全部", value: "" },
      { title: "qBittorrent", value: "qbittorrent" },
      { title: "Transmission", value: "transmission" }
    ];
    onMounted(() => {
      if (props.initialConfig) {
        config.value = { ...config.value, ...props.initialConfig };
      }
    });
    function saveConfig() {
      emit("save", config.value);
    }
    function switchToDetail() {
      emit("switch");
    }
    return (_ctx, _cache) => {
      const _component_v_switch = _resolveComponent("v-switch");
      const _component_v_select = _resolveComponent("v-select");
      const _component_v_text_field = _resolveComponent("v-text-field");
      const _component_v_col = _resolveComponent("v-col");
      const _component_v_row = _resolveComponent("v-row");
      const _component_v_divider = _resolveComponent("v-divider");
      const _component_v_btn = _resolveComponent("v-btn");
      const _component_v_spacer = _resolveComponent("v-spacer");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _cache[12] || (_cache[12] = _createElementVNode("div", { class: "text-h6 mb-4" }, "SeedKeeper 做种助手 - 配置", -1)),
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
        _createVNode(_component_v_select, {
          modelValue: config.value.strategy,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => config.value.strategy = $event),
          items: strategies,
          label: "做种策略",
          density: "compact",
          hint: "决定何时停止做种的策略",
          "persistent-hint": "",
          disabled: !config.value.enabled,
          class: "mt-4"
        }, null, 8, ["modelValue", "disabled"]),
        _createVNode(_component_v_row, null, {
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
                  "persistent-hint": "",
                  disabled: !config.value.enabled || config.value.strategy !== "ratio",
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
                  "persistent-hint": "",
                  disabled: !config.value.enabled || config.value.strategy !== "ratio",
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
          disabled: !config.value.enabled || config.value.strategy !== "seedtime",
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
          items: downloaderOptions,
          label: "下载器",
          density: "compact",
          multiple: "",
          chips: "",
          "closable-chips": "",
          hint: "选择要管理的下载器",
          "persistent-hint": "",
          disabled: !config.value.enabled,
          class: "mt-4"
        }, null, 8, ["modelValue", "disabled"]),
        _createVNode(_component_v_divider, { class: "my-4" }),
        _createElementVNode("div", _hoisted_2, [
          _createVNode(_component_v_btn, {
            color: "primary",
            onClick: saveConfig,
            disabled: !config.value.enabled
          }, {
            default: _withCtx(() => [..._cache[9] || (_cache[9] = [
              _createTextVNode(" 保存配置 ", -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          _createVNode(_component_v_btn, {
            variant: "text",
            onClick: switchToDetail
          }, {
            default: _withCtx(() => [..._cache[10] || (_cache[10] = [
              _createTextVNode(" 查看详情 ", -1)
            ])]),
            _: 1
          }),
          _createVNode(_component_v_spacer),
          _createVNode(_component_v_btn, {
            variant: "text",
            onClick: _cache[8] || (_cache[8] = ($event) => emit("close"))
          }, {
            default: _withCtx(() => [..._cache[11] || (_cache[11] = [
              _createTextVNode(" 关闭 ", -1)
            ])]),
            _: 1
          })
        ])
      ]);
    };
  }
});

const Config = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a49af02a"]]);

export { Config as default };
