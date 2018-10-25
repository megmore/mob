<script>

  export default {
    name: 'MLabel',
    functional: true,
    props: {
      name: {
        type: String,
        require: true
      },
        size: {
            type: String,
            default: '1rem'
        }
    },

    render(createElement, context){
      const name = context.props.name
	  const size = context.props.size
	  const labelImage = require(`../../../theme/_base/assets/onemt_label_${name}.png`)
      const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
      const classes = context.data.class !== undefined ? context.data.class : ''
      const styles = Object.assign({ height:size }, context.data.style, context.data.staticStyle)

      return (
        <img alt={name} src={labelImage} class={`m-label ${name} ${staticClasses} ${classes}`} style={styles} />
      )
    }
  }
</script>
