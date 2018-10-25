export default {
    functional:true,
    render: function (h, context) {
        if(context.children){
            return context.props.children
        }else if(typeof context.props.render==='function'){
            return context.props.render(h)
        }

    }
}