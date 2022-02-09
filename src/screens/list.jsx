// 显示引入React
import React from "react"

export const List = ({users,list}) => {

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