// 显示引入React
import React from "react"

/**
 * 定义User结构
 */
export interface User {
    id:string,
    name:string,
    token:string
}

/**
 * 定义组件参数类型
 */
interface SearchPanelProps {
    users:User[],
    param:{
        name:string,
        personId:string
    },
    // setParam是一个没有返回值的函数，它的参数是SearchPanelProps接口的param属性类型
    setParam:(param:SearchPanelProps['param']) => void
}

/**
 * SearchPanelProps是指定参数类型的接口
 * @param users
 * @param param
 * @param setParam
 * @constructor
 */
export const SearchPanel = ({users,param,setParam}:SearchPanelProps) => {

    return <form>
        <div>
            {
                /**
                 * 注意：大括号包起来就说明是js代码
                 * setParam(Object.assign({},param,{name:evt.target.value}))
                 * 下面的setParam的参数就是上面这段代码的意思（说白了就是合并对象）
                 */
            }
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name:evt.target.value
            })}></input>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId:evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    // 遍历users再生成多个option
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}