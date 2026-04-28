import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {createTextVNode:_createTextVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,createElementVNode:_createElementVNode,renderList:_renderList,Fragment:_Fragment,createElementBlock:_createElementBlock,toDisplayString:_toDisplayString,withKeys:_withKeys,normalizeClass:_normalizeClass,unref:_unref} = await importShared('vue');

const _hoisted_1 = { class: "folder-browser" };
const _hoisted_2 = { class: "mounts-section mb-3" };
const _hoisted_3 = { class: "text-caption text-medium-emphasis mb-1 d-flex align-center" };
const _hoisted_4 = { class: "mounts-chips" };
const _hoisted_5 = { class: "mount-label" };
const _hoisted_6 = {
  key: 0,
  class: "text-caption text-disabled"
};
const _hoisted_7 = { class: "d-flex align-center mb-2 path-jump-row" };
const _hoisted_8 = {
  key: 0,
  class: "text-caption text-error mb-1 ml-1"
};
const _hoisted_9 = { class: "d-flex align-center flex-wrap breadcrumb-row mb-2" };
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "dir-tree" };
const _hoisted_12 = {
  key: 0,
  class: "d-flex justify-center align-center pa-4"
};
const _hoisted_13 = {
  key: 1,
  class: "text-caption text-error pa-3 d-flex align-center"
};
const _hoisted_14 = {
  key: 2,
  class: "text-caption text-disabled pa-4 text-center"
};
const _hoisted_15 = { class: "mt-3" };
const _hoisted_16 = { class: "d-flex justify-end gap-2 mt-3" };
const {ref,watch,onMounted} = await importShared('vue');

const {defineComponent} = await importShared('vue');

const FolderNode = defineComponent({
  name: "FolderNode",
  props: {
    node: { type: Object, required: true },
    selected: { type: String, default: "" },
    depth: { type: Number, default: 0 }
  },
  emits: ["select", "enter", "toggle"],
  template: `
    <div>
      <div
        class="dir-row"
        :class="{ 'dir-selected': selected === node.path }"
        :style="{ paddingLeft: (depth * 16 + 6) + 'px' }"
        @click.stop="$emit('select', node)"
        @dblclick.stop="$emit('enter', node)"
      >
        <v-btn
          v-if="node.has_children || node.children"
          icon size="x-small" variant="text"
          class="expand-btn mr-1"
          @click.stop="$emit('toggle', node)"
        >
          <v-progress-circular v-if="node.loading" size="12" indeterminate></v-progress-circular>
          <v-icon v-else size="14">{{ node.expanded ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
        </v-btn>
        <span v-else class="expand-placeholder mr-1"></span>

        <v-icon size="15" class="mr-1 flex-shrink-0" :color="selected === node.path ? 'primary' : 'amber-darken-2'">
          {{ node.expanded ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>

        <span class="dir-name text-body-2">{{ node.name }}</span>

        <v-btn
          icon size="x-small" variant="text"
          class="enter-btn ml-auto"
          title="进入此目录查看子目录"
          @click.stop="$emit('enter', node)"
        >
          <v-icon size="12">mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <template v-if="node.expanded && node.children">
        <FolderNode
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          :selected="selected"
          :depth="depth + 1"
          @select="$emit('select', $event)"
          @enter="$emit('enter', $event)"
          @toggle="$emit('toggle', $event)"
        />
      </template>
    </div>
  `
});
const __default__ = {};
const _sfc_main = /* @__PURE__ */ _defineComponent({
  ...__default__,
  __name: "FolderBrowser",
  props: {
    api: {},
    modelValue: {},
    initialPath: {}
  },
  emits: ["update:modelValue", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentPath = ref("/");
    const selectedPath = ref(props.modelValue || "");
    const rootNodes = ref([]);
    const breadcrumb = ref(["/"]);
    const loadingDir = ref(false);
    const loadingMounts = ref(false);
    const errorMsg = ref("");
    const mounts = ref([]);
    const pathInput = ref("");
    const pathInputError = ref("");
    onMounted(async () => {
      await loadMounts();
      const start = props.initialPath || props.modelValue || "/";
      await navigateTo(start);
    });
    async function loadMounts() {
      loadingMounts.value = true;
      try {
        const res = await props.api.get("plugin/Seedkeeper/fs/mounts");
        mounts.value = res?.mounts || [];
      } catch {
        mounts.value = [];
      } finally {
        loadingMounts.value = false;
      }
    }
    async function navigateTo(path) {
      if (!path) path = "/";
      pathInput.value = path;
      pathInputError.value = "";
      buildBreadcrumb(path);
      await loadDir(path);
    }
    function buildBreadcrumb(path) {
      const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);
      breadcrumb.value = ["/"];
      let acc = "";
      for (const p of parts) {
        acc += "/" + p;
        breadcrumb.value.push(acc);
      }
      currentPath.value = path;
    }
    async function loadDir(path) {
      loadingDir.value = true;
      errorMsg.value = "";
      try {
        const res = await props.api.get(`plugin/Seedkeeper/fs/ls?path=${encodeURIComponent(path)}`);
        if (res?.error) {
          errorMsg.value = res.error;
          rootNodes.value = [];
        } else {
          rootNodes.value = (res?.dirs || []).map((d) => ({
            ...d,
            children: void 0,
            loading: false,
            expanded: false
          }));
          currentPath.value = res?.path || path;
          errorMsg.value = "";
        }
      } catch (e) {
        errorMsg.value = "加载目录失败：" + (e?.message || String(e));
        rootNodes.value = [];
      } finally {
        loadingDir.value = false;
      }
    }
    async function toggleDir(node) {
      if (node.expanded) {
        node.expanded = false;
        return;
      }
      if (!node.children) {
        node.loading = true;
        try {
          const res = await props.api.get(`plugin/Seedkeeper/fs/ls?path=${encodeURIComponent(node.path)}`);
          node.children = (res?.dirs || []).map((d) => ({
            ...d,
            children: void 0,
            loading: false,
            expanded: false
          }));
        } catch {
          node.children = [];
        }
        node.loading = false;
      }
      node.expanded = true;
    }
    function selectDir(node) {
      selectedPath.value = node.path;
      emit("update:modelValue", node.path);
    }
    async function enterDir(node) {
      selectedPath.value = node.path;
      emit("update:modelValue", node.path);
      await navigateTo(node.path);
    }
    async function onBreadcrumb(path) {
      selectedPath.value = "";
      await navigateTo(path);
    }
    async function jumpToInput() {
      const p = pathInput.value.trim();
      if (!p) return;
      if (!p.startsWith("/")) {
        pathInputError.value = "请输入绝对路径（以 / 开头）";
        return;
      }
      selectedPath.value = "";
      await navigateTo(p);
    }
    function confirm() {
      const val = selectedPath.value || currentPath.value;
      emit("update:modelValue", val);
      emit("confirm", val);
    }
    watch(() => props.modelValue, (v) => {
      if (v && v !== selectedPath.value) selectedPath.value = v;
    });
    return (_ctx, _cache) => {
      const _component_v_icon = _resolveComponent("v-icon");
      const _component_v_progress_circular = _resolveComponent("v-progress-circular");
      const _component_v_chip = _resolveComponent("v-chip");
      const _component_v_text_field = _resolveComponent("v-text-field");
      const _component_v_btn = _resolveComponent("v-btn");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _createVNode(_component_v_icon, {
              size: "13",
              class: "mr-1"
            }, {
              default: _withCtx(() => [..._cache[3] || (_cache[3] = [
                _createTextVNode("mdi-lightning-bolt", -1)
              ])]),
              _: 1
            }),
            _cache[4] || (_cache[4] = _createTextVNode(" 快速跳转 ", -1)),
            loadingMounts.value ? (_openBlock(), _createBlock(_component_v_progress_circular, {
              key: 0,
              size: "12",
              width: "2",
              indeterminate: "",
              class: "ml-2"
            })) : _createCommentVNode("", true)
          ]),
          _createElementVNode("div", _hoisted_4, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(mounts.value, (m) => {
              return _openBlock(), _createBlock(_component_v_chip, {
                key: m.path,
                size: "small",
                variant: "tonal",
                color: currentPath.value === m.path ? "primary" : "default",
                class: "mount-chip mr-1 mb-1",
                "prepend-icon": m.icon,
                onClick: ($event) => navigateTo(m.path)
              }, {
                default: _withCtx(() => [
                  _createElementVNode("span", _hoisted_5, _toDisplayString(m.label), 1)
                ]),
                _: 2
              }, 1032, ["color", "prepend-icon", "onClick"]);
            }), 128)),
            !loadingMounts.value && mounts.value.length === 0 ? (_openBlock(), _createElementBlock("span", _hoisted_6, " 未检测到挂载点 ")) : _createCommentVNode("", true)
          ])
        ]),
        _createElementVNode("div", _hoisted_7, [
          _createVNode(_component_v_text_field, {
            modelValue: pathInput.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => pathInput.value = $event),
            density: "compact",
            variant: "outlined",
            "hide-details": "",
            placeholder: "输入路径直接跳转，如 /vol2/1000",
            class: "flex-grow-1",
            error: !!pathInputError.value,
            "prepend-inner-icon": "mdi-folder-outline",
            onKeydown: _withKeys(jumpToInput, ["enter"])
          }, null, 8, ["modelValue", "error"]),
          _createVNode(_component_v_btn, {
            size: "small",
            color: "primary",
            variant: "tonal",
            class: "ml-2 flex-shrink-0",
            onClick: jumpToInput
          }, {
            default: _withCtx(() => [
              _createVNode(_component_v_icon, { size: "16" }, {
                default: _withCtx(() => [..._cache[5] || (_cache[5] = [
                  _createTextVNode("mdi-arrow-right", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        pathInputError.value ? (_openBlock(), _createElementBlock("div", _hoisted_8, _toDisplayString(pathInputError.value), 1)) : _createCommentVNode("", true),
        _createElementVNode("div", _hoisted_9, [
          _createVNode(_component_v_icon, {
            size: "14",
            class: "mr-1 text-medium-emphasis"
          }, {
            default: _withCtx(() => [..._cache[6] || (_cache[6] = [
              _createTextVNode("mdi-folder-home", -1)
            ])]),
            _: 1
          }),
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(breadcrumb.value, (seg, i) => {
            return _openBlock(), _createElementBlock(_Fragment, { key: seg }, [
              _createElementVNode("span", {
                class: _normalizeClass(["breadcrumb-seg", i === breadcrumb.value.length - 1 ? "text-primary font-weight-bold" : "text-medium-emphasis"]),
                onClick: ($event) => onBreadcrumb(seg)
              }, _toDisplayString(i === 0 ? "/" : seg.split("/").pop()), 11, _hoisted_10),
              i < breadcrumb.value.length - 1 ? (_openBlock(), _createBlock(_component_v_icon, {
                key: 0,
                size: "11",
                class: "mx-1 text-disabled"
              }, {
                default: _withCtx(() => [..._cache[7] || (_cache[7] = [
                  _createTextVNode("mdi-chevron-right", -1)
                ])]),
                _: 1
              })) : _createCommentVNode("", true)
            ], 64);
          }), 128))
        ]),
        _createElementVNode("div", _hoisted_11, [
          loadingDir.value ? (_openBlock(), _createElementBlock("div", _hoisted_12, [
            _createVNode(_component_v_progress_circular, {
              indeterminate: "",
              size: "22",
              color: "primary"
            })
          ])) : errorMsg.value ? (_openBlock(), _createElementBlock("div", _hoisted_13, [
            _createVNode(_component_v_icon, {
              size: "14",
              class: "mr-1 flex-shrink-0"
            }, {
              default: _withCtx(() => [..._cache[8] || (_cache[8] = [
                _createTextVNode("mdi-alert-circle-outline", -1)
              ])]),
              _: 1
            }),
            _createTextVNode(" " + _toDisplayString(errorMsg.value), 1)
          ])) : rootNodes.value.length === 0 ? (_openBlock(), _createElementBlock("div", _hoisted_14, [
            _createVNode(_component_v_icon, {
              size: "28",
              class: "d-block mx-auto mb-1 text-grey-lighten-2"
            }, {
              default: _withCtx(() => [..._cache[9] || (_cache[9] = [
                _createTextVNode("mdi-folder-open-outline", -1)
              ])]),
              _: 1
            }),
            _cache[10] || (_cache[10] = _createTextVNode(" 当前目录为空（无子目录） ", -1))
          ])) : (_openBlock(true), _createElementBlock(_Fragment, { key: 3 }, _renderList(rootNodes.value, (node) => {
            return _openBlock(), _createBlock(_unref(FolderNode), {
              key: node.path,
              node,
              selected: selectedPath.value,
              onSelect: selectDir,
              onEnter: enterDir,
              onToggle: toggleDir
            }, null, 8, ["node", "selected"]);
          }), 128))
        ]),
        _createElementVNode("div", _hoisted_15, [
          _createVNode(_component_v_text_field, {
            "model-value": selectedPath.value || currentPath.value,
            label: "已选路径",
            density: "compact",
            variant: "outlined",
            readonly: "",
            "prepend-inner-icon": "mdi-folder-check",
            color: selectedPath.value ? "success" : "grey",
            "hide-details": ""
          }, {
            "append-inner": _withCtx(() => [
              selectedPath.value ? (_openBlock(), _createBlock(_component_v_btn, {
                key: 0,
                icon: "",
                size: "x-small",
                variant: "text",
                onClick: _cache[1] || (_cache[1] = ($event) => {
                  selectedPath.value = "";
                  emit("update:modelValue", "");
                })
              }, {
                default: _withCtx(() => [
                  _createVNode(_component_v_icon, { size: "13" }, {
                    default: _withCtx(() => [..._cache[11] || (_cache[11] = [
                      _createTextVNode("mdi-close", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              })) : _createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["model-value", "color"])
        ]),
        _createElementVNode("div", _hoisted_16, [
          _createVNode(_component_v_btn, {
            variant: "text",
            size: "small",
            onClick: _cache[2] || (_cache[2] = ($event) => emit("cancel"))
          }, {
            default: _withCtx(() => [..._cache[12] || (_cache[12] = [
              _createTextVNode("取消", -1)
            ])]),
            _: 1
          }),
          _createVNode(_component_v_btn, {
            color: "primary",
            variant: "flat",
            size: "small",
            onClick: confirm
          }, {
            default: _withCtx(() => [
              _createVNode(_component_v_icon, {
                size: "14",
                class: "mr-1"
              }, {
                default: _withCtx(() => [..._cache[13] || (_cache[13] = [
                  _createTextVNode("mdi-check", -1)
                ])]),
                _: 1
              }),
              _cache[14] || (_cache[14] = _createTextVNode(" 选择此目录 ", -1))
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});

const FolderBrowser = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-074b2e76"]]);

export { FolderBrowser as F };
