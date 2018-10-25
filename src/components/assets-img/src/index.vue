<script>
  const LABELS = {
    NEW: '',
    MOD: '',
    ADMIN: '',
    GM: '',
    VETERAN: '',
  }

  export default {
    name: 'AssetsImg',
    functional: true,
    props: {
      name: {
        type: String,
        require: true
      }
    },

    render(createElement, context){
      const name = context.props.name
      const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
      const classes = context.data.class !== undefined ? context.data.class : ''
      const styles = Object.assign({}, context.data.style, context.data.staticStyle)

      return (
        <div class={`assets-img ${name} ${staticClasses} ${classes}`} style={styles}> </div>
      )
    }
  }
</script>
