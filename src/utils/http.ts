import React from "react"
// 将对象转换成Get请求参数格式的工具
import Qs from "qs"
import {cleanObject, useDebounced, useMount} from "../utils"
import {useAuth} from "context/auth-context";

// 执行 npm start 取.env.development文件里面的值，执行 npm run build 取.env文件里面的值（注意：这些是自动获取的，不需要做什么操作）
// 注意：配置文件里面的变量名必须由 REACT_APP_ 开头否则不读取
const RestApiUrl = process.env.REACT_APP_ApiUrl

interface Config extends RequestInit {
    method?: string,
    token?: string,
    data?: {[key: string]:unknown}
}

export const useGet = () => {

    return useHttp("GET")
}

const useHttp = (method: string) => {
    const {user} = useAuth()
    // ...[endpoint,config] 前面加了三个点表示调用方使用时可以一个一个传参数而不需要传一个数组
    // Parameters<typeof http> 表示参数类型遵循 http 函数的参数类型
    return (...[endpoint,config]: Parameters<typeof http>) => http(endpoint,{token:user?.token,method,...config})
}

// 注意：Config是指定数据类型的，加了个等于 {} 其实是指定默认值
const http = async (endpoint: string,{token,method,data,...customConfig}:Config= {}) => {
    const config = {
        method: method,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : ""
        },
        ...customConfig
    }
    if(data) {
        if(config.method === "GET") {
            endpoint += `?${Qs.stringify(cleanObject(data))}`
        } else {
            config.body = JSON.stringify(data)
        }
    }
    return fetch(`${RestApiUrl}/${endpoint}`,config).then(async response => {
        if(response.status === 401) {
            window.location.reload()
            return Promise.reject({msg:"请重新登录"})
        }
        const data = await response.json()
        if(response.ok) {
            return data
        } else {
            // 抛出异常
            await Promise.reject(data)
        }
    })
}