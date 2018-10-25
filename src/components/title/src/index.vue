<script>
  export default {
    name: 'MTitle',
    functional: true,
    props: {
      name: {
        type: String,
        require: true
      },
      type: {
        type: String,
        require: true
      }
    },
    render (createElement, context){
      /**
       * @name: board-title
       */
      const name = context.props.name
      const type = context.props.type
      const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
      const classes = context.data.class !== undefined ? context.data.class : ''
      const styles = Object.assign({},context.data.style, context.data.staticStyle)

      return (
        <div class={`m-title ${type} ${classes} ${staticClasses}`} style={styles}>{name}</div>
      )
    }
  }
</script>