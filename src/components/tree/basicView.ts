export default class BasicView {
  private _components:Record<string, BasicView> = {}
  public _parentView?:BasicView = undefined
  public _componentName?:string = undefined

  render():void {
    console.log('render function')
  }

  registerComponent(name:string, component:BasicView):BasicView {
    if (this._components[name] === component) {
      const comp = this._components[name]
      // 销毁remove待写
      comp.remove()
    }
        // 父子关联
        this._components[name] = component
        component._parentView = this
        component._componentName = name

    return component
  }

  getComponent(name:string) {
    if (this._components[name]) {
      const comp = this._components[name]
      return comp
    } else {
      throw new Error(`${name}组件不存在`)
    }
  }

  remove() {
    console.log('remove function')
  }
}
