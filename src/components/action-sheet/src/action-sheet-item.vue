<script>
  export default {
    name: 'MActionSheetItem',

    props: {
      name: {
        type: String,
        require: true
      },
      preset: String
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt)
      }
    },

    render(h){
      const preset = this.preset ? this.preset : ''
      const name = preset === '' ? this.name : preset

      function presetSlot() {
        if(preset !== '') return <div class='icon'> </div>
        return ''
      }

      return (
        <div class={`m-action-sheet-item ${preset}`} onClick={this.handleClick}>
          {presetSlot()}
          {name}
          {this.$slots.default}
        </div>
      )
    }
  };
</script>
