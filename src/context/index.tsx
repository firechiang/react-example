/**
 * 这里面定义的全部是上下文组件（注意：该组件要包裹全部UI代码，才能起作用；具体可查看 index.tsx）
 */
import React,{ReactNode} from "react"
import {AuthProvider} from "context/auth-context"
import {QueryClient,QueryClientProvider} from "react-query"

// 指定参数是children而它的类型是ReactNode
export const AppProviders = ({children}:{children: ReactNode}) => {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
}