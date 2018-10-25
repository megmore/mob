<!--
  @param {String}  type: 类型，可选值[ success, danger, warning, info,sticky]
  @param {String}  size:  尺寸，可选值[xs, sm, md, lg, xl]
-->
<script>
export default {
    name: 'MTag',
    functional: true,
    props: {
        name: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        size: String,
        preset:String
    },
    render (createElement, context){
        const name = context.props.name
        const type = context.props.type
        const preset = context.props.preset
        const size = context.props.size ? context.props.size : 'sm'
        const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
        const classes = context.data.class !== undefined ? context.data.class : ''
        const styles = Object.assign({},context.data.style, context.data.staticStyle)

        return (
            preset?
                (<span class={`m-tag sm ${preset} ${size} ${classes} ${staticClasses} `} style={styles}>{name}</span>):
        (<span class={`m-tag ${type} ${size} ${classes} ${staticClasses}`} style={styles}>{name}</span>)

    )
    }
};
</script>
