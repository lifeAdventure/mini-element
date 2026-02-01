import { defineComponent } from 'vue';

export default defineComponent({
  name: 'renderVNode',
  props: {
    vNode: {
      type: [String, Object]
    }
  },
  setup(props) {
    return () => props.vNode;
  }
});
