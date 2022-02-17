// 显示引入React
import React from "react"
import {User} from "./search-panel"
import {TableProps,Table} from "antd";
import {Link} from "react-router-dom";

export interface Project {
    id:string,
    name:string,
    personId:string
}

// TableProps里面有个dataSource属性它的类型就是 Project
interface ListProps extends TableProps<Project>{
    users:User[]
}

/**
 * ListProps是指定参数类型的接口
 * @param users
 * @param list
 * @constructor
 */
export const List = ({users,...props}:ListProps) => {

      return (
        <Table
          pagination={false}
          rowKey="id"
          columns={[
            {
              title: "名称",
              //dataIndex: "name",
              sorter: (a, b) => a.name.localeCompare(b.name),
              render(value,project) {
                  /*String(project.id)表示强制将id转换成String类型*/
                  return <Link to={`/projects/${project.id}`}>{project.name}</Link>
              }
            },
            {
              title: "负责人",
              render: (value, project) => (
                <span>
                    {/*通过personId查找用户名称（注意：? 号表示如果没有找到就不执行.name代码；还有加了||就表示没有找到用户就返回 ''）*/}
                    {users.find((user: User) => user.id === project.personId)?.name || ''}
                </span>
              ),
            },
          ]}
          // 将使用处传过来的属性都展开到这里（包括 dataSource 和 loading）
          {
              ...props
          }
          //dataSource={list}
        />
      );
}