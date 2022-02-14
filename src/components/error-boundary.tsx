import React,{ReactNode} from "react"

type FallbackRender = (props: {error:Error| null}) => React.ReactElement

/**
 * 错误边界简单使用（界面渲染发时生错误处理）
 */
// React.PropsWithChildren 等价于 children:ReactNode，React.PropsWithChildren的泛型就是父组件还需要的泛型类型；所以下面的两种写法是等价的
//export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>, { error: Error | null }>{
export class ErrorBoundary extends React.Component<{children:ReactNode,fallbackRender:FallbackRender}, { error: Error | null }>{
    state = {error: null}
    // 当当前组件的子组件渲染发生错误时该函数会被调用，那么error的值就不是空的了
    static getDerivedStateFromError(error:Error) {
        return {error}
    }
    render() {
        const {error} = this.state
        const {fallbackRender,children} = this.props
        if(error) {
            return fallbackRender({error})
        }
        return children
    }
}