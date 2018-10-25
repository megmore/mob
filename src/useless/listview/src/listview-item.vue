
<script>
	export default {
		name: 'ListviewItem',
        inject: ['appendHeight'],
		mounted(){
			setTimeout(()=>{
				this.appendHeight(this.$el.offsetHeight)
			},300)
		},

		render(h){
			return (
				<div class="listview-item" style={this.style}>
                    {this.$slots.default}
                </div>
            )
		},
	};
</script>
