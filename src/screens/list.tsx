// 显示引入React
import React from "react"
import {User} from "./search-panel"

interface Project {
    id:string,
    name:string,
    personId:string
}

interface ListProps {
    users:User[]
    list:Project[]
}

/**
 * ListProps是指定参数类型的接口
 * @param users
 * @param list
 * @constructor
 */
export const List = ({users,list}:ListProps) => {

    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
        {
            // 遍历生成td标签
            //
            list.map(project =>
                <tr key={project.id}>
                    <td>{project.name}</td>
                    {/*通过personId查找用户名称（注意：? 号表示如果没有找到就不执行.name代码；还有加了||就表示没有找到用户就返回 ''）*/}
                    <td>{users.find(user => user.id === project.personId)?.name || ''}</td>
                </tr>)
        }
        </tbody>
    </table>
}