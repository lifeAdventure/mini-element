import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RenderVNode',
  props: {
    vNode: {
      type: [String, Object]
    }
  },
  setup(props) {
    return () => props.vNode;
  }
});
