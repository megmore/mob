<!--
    页面底部导航组件
-->
<script lang="jsx">
  export default {
    name: 'MFooter',
    functional: true,
    render (h, { props, data, children }){
        return (
            <div class="m-footer">
              <div class="m-footer--wrapper">
                  {children}
              </div>
            </div>
        )
    }
  }
</script>
