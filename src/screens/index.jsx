import React from "react"
import {SearchPanel} from "./search-panel"
import {List} from "./list"
import {useEffect, useState} from "react"
import {cleanObject, useDebounced, useMount} from "../utils/index"
// 将对象转换成Get请求参数格式的工具
import Qs from "qs"

// 执行 npm start 取.env.development文件里面的值，执行 npm run build 取.env文件里面的值（注意：这些是自动获取的，不需要做什么操作）
// 注意：配置文件里面的变量名必须由 REACT_APP_ 开头否则不读取
const RestApiUrl = process.env.REACT_APP_ApiUrl

export const ProjectListScreens = () => {
    // 状态变量param（在这里也是参数），使用useState函数的参数指定状态变量的数据类型,调用setParam函数设值
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    // 定义状态变量users，使用useState函数的参数指定状态变量的数据类型,调用setUsers函数设值
    const [users,setUsers] = useState([])
    const [list,setList] = useState([])
    // 使用useDebounced监听状态变量变化后并返回（平滑用户输入事件监听）
    const debouncedParam = useDebounced(param,2000)

    // 请求接口获取列表数据（触发条件是当debouncedParam对象发生变化时）
    useEffect(() => {
        // 使用fetch发起请求获取list列表数据
        fetch(`${RestApiUrl}/test/projects?${Qs.stringify(cleanObject(debouncedParam))}`).then(async response=> {
            // 请求成功（Http状态200）
            if(response.ok) {
                // 给list状态变量赋值
                setList(await response.json())
            }
        })
    },[debouncedParam])


    useMount(() => {
        fetch(`${RestApiUrl}/test/users`).then(async response => {
            // 请求成功（Http状态200）
            if(response.ok) {
                // 给users状态变量赋值
                setUsers(await response.json())
            }
        })
    },[])

    return <div>
        {/*指定状态变量并传递给组件*/}
        <SearchPanel users = {users} param={param} setParam={setParam}/>
        <List users = {users} list={list} setList={setList}/>
    </div>
}