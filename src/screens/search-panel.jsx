// 显示引入React
import React from "react"

export const SearchPanel = ({users,param,setParam}) => {

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