import React from "react"
import {Link} from "react-router-dom";
import {ProjectUser} from "./user";
import {Routes,Route} from "react-router"

export const ProjectInfo = () => {

    return <div>
        <div>项目详情</div>
        {/**to指定要去的路由地址（前面不加斜杆，默认去到当前路由再加上指定地址的路由*/}
        <Link to={"user"}>项目用户</Link>
        <Routes>
            <Route path={"user"} element={<ProjectUser/>} />
        </Routes>
    </div>
}