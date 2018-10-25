<!--
  @param {String}  type: 类型，可选值[ success, danger, warning, info,sticky]
  @param {String}  size:  尺寸，可选值[xs, sm, md, lg, xl]
-->
<script>
import MIcon from '../icons/'
const name = 'MIcon'
const prefix = 'm-icon'

const SIZE_MAP = {
	xs: 10,
	sm: 20,
	md: 30,
	lg: 40,
	xl: 50,
}

export default {
    name,
    functional: true,
    props: {
        name: {
            type: String,
            require: true
        },
        color: {
            type: String,
        },
        size: {
            type: String,
            default: 'md'
        }
    },
    render (createElement, { props, data }){
        const name = props.name
        const color = props.color
        const icon = MIcon[`MIcon_${name}`][name]
	    const height = SIZE_MAP[props.size] ? SIZE_MAP[props.size] : props.size
	    const width = height / (Number(icon.height) / Number(icon.width))
	    const staticClasses = data.staticClass !== undefined ? data.staticClass : ''
	    const classes = data.class !== undefined ? data.class : ''
	    const styles = Object.assign({fill:'currentColor'}, data.style, data.staticStyle)

        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 staticClass={`${prefix} ${prefix}--${name} ${staticClasses}`}
                 class={`${classes} m-color--${color}`}
                 style={styles}
                 height={height}
                 width={width}
                 viewBox={icon.viewBox}>
	            {icon.paths ? icon.paths.map(path => <path d={path} />) : ''}
	            {icon.polygons ? icon.polygons.map(path => <polygon points={path} />) : ''}
            </svg>
        )
    }
}
</script>
