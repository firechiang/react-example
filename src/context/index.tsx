/**
 * 这里面定义的全部是上下文组件（注意：该组件要包裹全部UI代码，才能起作用；具体可查看 index.tsx）
 */
import React,{ReactNode} from "react"
import {AuthProvider} from "context/auth-context"

// 指定参数是children而它的类型是ReactNode
export const AppProviders = ({children}:{children: ReactNode}) => {

    return <AuthProvider>
        {children}
    </AuthProvider>
}