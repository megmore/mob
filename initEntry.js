const  glob = require('glob')
const fs=require('fs')
const path=require('path')
const paths=glob.sync('./src/components/*/index.js')

const defaultRegExp=/export\s*default\s*([A-z0-9]*)/gm
const otherRegExp=/export\s*(\{\s*\n*(([A-z0-9]|\,)*\s*\n*)*\n*\s*\})/gm
let entryJs=''

const components=[]

const blackList=['Confirm', 'Dialog', 'Toastr', 'ImageBrowser', 'Popover']//不需要全局注册的组件
module.exports=function () {
    paths.forEach(path=>{//生成import语句和一个组件名称组成的数组
        const res=fs.readFileSync(path, 'utf8')
        const defaultName=defaultRegExp.exec(res)
        const multiName=otherRegExp.exec(res)
        let moduleImportStr=`import `

        if(defaultName){
            const moduleName=defaultName[1]
            moduleImportStr+=moduleName
            components.push(defaultName[1])
        }
        if(multiName){
            const modulesName=multiName[1].replace(/\n|\s/g,'')
            moduleImportStr+=modulesName
            components.push(...modulesName.replace(/\{|\}/g,'').split(','))
        }
        moduleImportStr+=` from '${path.replace('src/','')}';\n`
        entryJs+=moduleImportStr
        otherRegExp.lastIndex=defaultRegExp.lastIndex=0
    })

    const componentsStr=`${components.map(item=>'   '+item).join('\,\n','')}`

    const regComponentsStr=`${components.filter(item=>!blackList.includes(item)).map(item=>'   '+item).join(',','')}`//需要全局注册的组件

    entryJs+=`
    
    import nativeDatePick from './directives/native-date-pick.js'
    const components=[
    ${regComponentsStr}
    ]
    const directives=[
        nativeDatePick
    ]
    
    const install = function (Vue, opts = {}) {
        components.forEach(component => {
            if (component.name) {
                const name = component.name
                Vue.component(name, component)
            }
        });
        directives.forEach(directive => {
            if (directive.name) {
                Vue.directive(directive.name, directive)
            }
        });
        
        Vue.prototype.$confirm = Confirm;
        Vue.prototype.$toast = Toastr;
        Vue.prototype.$dialog = Dialog;
        Vue.prototype.$popover = Popover;
        Vue.prototype.$imagebrowser = ImageBrowser;
    };
    /* istanbul ignore if */
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue);
    }
    
    export default{
        install,
    ${componentsStr}
    }
    
    
    export {
    ${componentsStr}
    }
    // `


    fs.writeFileSync(path.resolve(__dirname,'./src/index.js'),entryJs)
}