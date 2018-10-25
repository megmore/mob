<script>
	export default {
		name: 'ListviewItem',
        data(){
			return {
                show: true,
                height: 0,
            }
        },
        computed: {
	        style(){
		        return this.height ? {
                    minHeight: this.height + 'px'
                } : { }
	        }
        },
		mounted(){
			setTimeout(()=>{
				this.height = this.$el.offsetHeight ? this.$el.offsetHeight : this.$el.clientHeight
			},300)
		},

		render(h){
			// console.log(this.order)
			return (
				<div class="listview-item" style={this.style}>
                    {this.show ? this.$slots.default : ''}
                </div>
            )
		},
	};
</script>
