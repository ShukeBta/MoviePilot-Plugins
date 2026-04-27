import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {createTextVNode:_createTextVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,renderList:_renderList,Fragment:_Fragment,openBlock:_openBlock,createElementBlock:_createElementBlock,toDisplayString:_toDisplayString,normalizeClass:_normalizeClass,createElementVNode:_createElementVNode,createBlock:_createBlock,createCommentVNode:_createCommentVNode,unref:_unref} = await importShared('vue');

const _hoisted_1 = { class: "folder-browser" };
const _hoisted_2 = { class: "d-flex align-center flex-wrap breadcrumb-row mb-2" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 0,
  class: "dir-tree"
};
const _hoisted_5 = {
  key: 0,
  class: "text-caption text-error pa-2"
};
const _hoisted_6 = {
  key: 1,
  class: "text-caption text-disabled pa-4 text-center"
};
const _hoisted_7 = {
  key: 1,
  class: "d-flex justify-center align-center pa-4"
};
const _hoisted_8 = { class: "selected-path mt-3" };
const _hoisted_9 = { class: "d-flex justify-end gap-2 mt-3" };
const {ref,watch} = await importShared('vue');

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
        :style="{ paddingLeft: (depth * 16 + 8) + 'px' }"
        @click.stop="$emit('select', node)"
        @dblclick.stop="$emit('enter', node)"
      >
        <!-- 展开/折叠箭头 -->
        <v-btn
          v-if="node.has_children || node.children"
          icon
          size="x-small"
          variant="text"
          class="expand-btn mr-1"
          @click.stop="$emit('toggle', node)"
        >
          <v-progress-circular v-if="node.loading" size="12" indeterminate></v-progress-circular>
          <v-icon v-else size="14">{{ node.expanded ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
        </v-btn>
        <span v-else class="expand-placeholder mr-1"></span>

        <!-- 文件夹图标 -->
        <v-icon size="16" class="mr-1" :color="selected === node.path ? 'primary' : 'amber-darken-2'">
          {{ node.expanded ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>

        <!-- 目录名 -->
        <span class="dir-name text-body-2">{{ node.name }}</span>

        <!-- 进入箭头 -->
        <v-btn
          icon
          size="x-small"
          variant="text"
          class="enter-btn ml-auto"
          title="进入此目录"
          @click.stop="$emit('enter', node)"
        >
          <v-icon size="12">mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <!-- 递归子节点 -->
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
    const currentPath = ref(props.modelValue || props.initialPath || "/");
    const selectedPath = ref(props.modelValue || "");
    const rootNodes = ref([]);
    const breadcrumb = ref(["/"]);
    const loading = ref(false);
    const errorMsg = ref("");
    async function init() {
      errorMsg.value = "";
      const startPath = props.initialPath || props.modelValue || "/";
      buildBreadcrumb(startPath);
      await loadDir(startPath, rootNodes);
    }
    function buildBreadcrumb(path) {
      const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);
      breadcrumb.value = ["/"];
      let acc = "";
      for (const p of parts) {
        acc += "/" + p;
        breadcrumb.value.push(acc);
      }
    }
    async function loadDir(path, targetList) {
      loading.value = true;
      try {
        const res = await props.api.get(`plugin/Seedkeeper/fs/ls?path=${encodeURIComponent(path)}`);
        if (res?.error) {
          errorMsg.value = res.error;
          targetList.value = [];
        } else {
          targetList.value = (res?.dirs || []).map((d) => ({
            ...d,
            children: void 0,
            loading: false,
            expanded: false
          }));
          currentPath.value = res?.path || path;
          errorMsg.value = "";
        }
      } catch (e) {
        errorMsg.value = "加载目录失败：" + (e?.message || e);
        targetList.value = [];
      } finally {
        loading.value = false;
      }
    }
    async function onBreadcrumb(path) {
      selectedPath.value = "";
      buildBreadcrumb(path);
      await loadDir(path, rootNodes);
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
      buildBreadcrumb(node.path);
      await loadDir(node.path, rootNodes);
    }
    function confirm() {
      const val = selectedPath.value || currentPath.value;
      emit("update:modelValue", val);
      emit("confirm", val);
    }
    init();
    watch(() => props.modelValue, (v) => {
      if (v && v !== selectedPath.value) selectedPath.value = v;
    });
    return (_ctx, _cache) => {
      const _component_v_icon = _resolveComponent("v-icon");
      const _component_v_progress_circular = _resolveComponent("v-progress-circular");
      const _component_v_btn = _resolveComponent("v-btn");
      const _component_v_text_field = _resolveComponent("v-text-field");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createVNode(_component_v_icon, {
            size: "16",
            class: "mr-1 text-medium-emphasis"
          }, {
            default: _withCtx(() => [..._cache[2] || (_cache[2] = [
              _createTextVNode("mdi-folder-home", -1)
            ])]),
            _: 1
          }),
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(breadcrumb.value, (seg, i) => {
            return _openBlock(), _createElementBlock(_Fragment, { key: seg }, [
              _createElementVNode("span", {
                class: _normalizeClass(["breadcrumb-seg", i === breadcrumb.value.length - 1 ? "text-primary font-weight-bold" : "text-medium-emphasis"]),
                onClick: ($event) => onBreadcrumb(seg)
              }, _toDisplayString(i === 0 ? "/" : seg.split("/").pop()), 11, _hoisted_3),
              i < breadcrumb.value.length - 1 ? (_openBlock(), _createBlock(_component_v_icon, {
                key: 0,
                size: "12",
                class: "mx-1 text-disabled"
              }, {
                default: _withCtx(() => [..._cache[3] || (_cache[3] = [
                  _createTextVNode("mdi-chevron-right", -1)
                ])]),
                _: 1
              })) : _createCommentVNode("", true)
            ], 64);
          }), 128))
        ]),
        !loading.value ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          errorMsg.value ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
            _createVNode(_component_v_icon, {
              size: "14",
              class: "mr-1"
            }, {
              default: _withCtx(() => [..._cache[4] || (_cache[4] = [
                _createTextVNode("mdi-alert-circle-outline", -1)
              ])]),
              _: 1
            }),
            _createTextVNode(_toDisplayString(errorMsg.value), 1)
          ])) : rootNodes.value.length === 0 ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
            _createVNode(_component_v_icon, {
              size: "32",
              class: "d-block mx-auto mb-1 text-grey-lighten-2"
            }, {
              default: _withCtx(() => [..._cache[5] || (_cache[5] = [
                _createTextVNode("mdi-folder-open-outline", -1)
              ])]),
              _: 1
            }),
            _cache[6] || (_cache[6] = _createTextVNode(" 当前目录为空 ", -1))
          ])) : (_openBlock(true), _createElementBlock(_Fragment, { key: 2 }, _renderList(rootNodes.value, (node) => {
            return _openBlock(), _createBlock(_unref(FolderNode), {
              key: node.path,
              node,
              selected: selectedPath.value,
              onSelect: selectDir,
              onEnter: enterDir,
              onToggle: toggleDir
            }, null, 8, ["node", "selected"]);
          }), 128))
        ])) : (_openBlock(), _createElementBlock("div", _hoisted_7, [
          _createVNode(_component_v_progress_circular, {
            indeterminate: "",
            size: "24",
            color: "primary"
          })
        ])),
        _createElementVNode("div", _hoisted_8, [
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
                onClick: _cache[0] || (_cache[0] = ($event) => {
                  selectedPath.value = "";
                  emit("update:modelValue", "");
                }),
                title: "清除选择"
              }, {
                default: _withCtx(() => [
                  _createVNode(_component_v_icon, { size: "14" }, {
                    default: _withCtx(() => [..._cache[7] || (_cache[7] = [
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
        _createElementVNode("div", _hoisted_9, [
          _createVNode(_component_v_btn, {
            variant: "text",
            size: "small",
            onClick: _cache[1] || (_cache[1] = ($event) => emit("cancel"))
          }, {
            default: _withCtx(() => [..._cache[8] || (_cache[8] = [
              _createTextVNode("取消", -1)
            ])]),
            _: 1
          }),
          _createVNode(_component_v_btn, {
            color: "primary",
            variant: "flat",
            size: "small",
            disabled: !selectedPath.value && !currentPath.value,
            onClick: confirm
          }, {
            default: _withCtx(() => [
              _createVNode(_component_v_icon, {
                size: "14",
                class: "mr-1"
              }, {
                default: _withCtx(() => [..._cache[9] || (_cache[9] = [
                  _createTextVNode("mdi-check", -1)
                ])]),
                _: 1
              }),
              _cache[10] || (_cache[10] = _createTextVNode(" 选择此目录 ", -1))
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]);
    };
  }
});

const FolderBrowser = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fe562a2"]]);

export { FolderBrowser as F };
