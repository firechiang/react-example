/**
 * 全局登录信息组件，也就是无论在那个组件里面都可以使用该组件里面的数据
 */
import React,{ReactNode,useState} from "react"

import {User} from "screens/search-panel"

import * as auth from "screens/login/index"
import {useMount} from "../utils";

interface AuthForm {
    username: string,
    password: string
}

// 指定泛型的类型是一个对象而且这个对象里面有user属性和login属性而且login是一个Promise；或者泛型的类型是undefined
const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
} | undefined>(undefined)

AuthContext.displayName = "AuthContent"

// 指定参数是children而它的类型是ReactNode
export const AuthProvider = ({children}:{children: ReactNode})=> {
    // 指定user变量的泛型类型是User或者是null
    const [user,setUser] = useState<User | null>(null)
    // 请求登录并给user赋值
    // @ts-ignore
    const login = (form: AuthForm) => auth.login(form).then(setUser)

    // 页面刷新时从localStorage里面加载User信息到上下文组件，以供全局使用（作用是保持登录状态，要不然用户刷新页面后User信息没有了）
    useMount(() => {
        setUser(auth.getUser())
    })

    return <AuthContext.Provider children={children} value={{user,login}}></AuthContext.Provider>
}

// 自定义Hook（注意：如果某个函数里面要使用Hook，那么该函数本身就要是一个Hook）
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}

