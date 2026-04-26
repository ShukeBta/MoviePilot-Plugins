import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {toDisplayString:_toDisplayString,createElementVNode:_createElementVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,openBlock:_openBlock,createBlock:_createBlock} = await importShared('vue');

const _hoisted_1 = { class: "d-flex justify-space-around" };
const _hoisted_2 = { class: "text-h5 text-primary" };
const _hoisted_3 = { class: "text-h5 text-success" };
const _hoisted_4 = { class: "text-h5 text-warning" };
const {ref,onMounted} = await importShared('vue');

const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "Dashboard",
  props: {
    config: {},
    api: {}
  },
  setup(__props) {
    const props = __props;
    const stats = ref({ total: 0, active: 0, completed: 0, pending: 0 });
    const loading = ref(false);
    onMounted(async () => {
      if (props.api) {
        await loadStats();
      }
    });
    async function loadStats() {
      loading.value = true;
      try {
        const data = await props.api.get("plugin/Seedkeeper/stats");
        stats.value = data || { total: 0, active: 0, completed: 0, pending: 0 };
      } catch (e) {
        console.error("加载统计数据失败:", e);
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _cache) => {
      const _component_v_card_text = _resolveComponent("v-card-text");
      const _component_v_card = _resolveComponent("v-card");
      return _openBlock(), _createBlock(_component_v_card, {
        class: "seedkeeper-dashboard",
        variant: "flat"
      }, {
        default: _withCtx(() => [
          _createVNode(_component_v_card_text, { class: "text-center" }, {
            default: _withCtx(() => [
              _createElementVNode("div", _hoisted_1, [
                _createElementVNode("div", null, [
                  _createElementVNode("div", _hoisted_2, _toDisplayString(stats.value.total), 1),
                  _cache[0] || (_cache[0] = _createElementVNode("div", { class: "text-caption" }, "总任务", -1))
                ]),
                _createElementVNode("div", null, [
                  _createElementVNode("div", _hoisted_3, _toDisplayString(stats.value.active), 1),
                  _cache[1] || (_cache[1] = _createElementVNode("div", { class: "text-caption" }, "做种中", -1))
                ]),
                _createElementVNode("div", null, [
                  _createElementVNode("div", _hoisted_4, _toDisplayString(stats.value.pending), 1),
                  _cache[2] || (_cache[2] = _createElementVNode("div", { class: "text-caption" }, "等待中", -1))
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});

const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69e5a4d8"]]);

export { Dashboard as default };
