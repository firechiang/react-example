import {Project} from "screens/list"
import {useEffect} from "react";
import {cleanObject} from "utils/index"
import {useGet} from "utils/http"
import {useAsync} from "./use-async";
import {useQuery} from "react-query"

export const useProjects = (param?: Partial<Project>) => {
    const httpGet = useGet()
    const {run, ...result} = useAsync<Project[]>()
    useEffect(()=>{
        run(httpGet("/test/projects",{data:param}))
    },[param])
    // 注意：useQuery会缓存结果，在任何地址使用projects就可以获取到值
    //useQuery("projects",()=>httpGet('/test/projects',{data: param}))
    // 注意：useQuery会缓存结果，在任何地址使用projects就可以获取到值,当param对象值发生变化时会自动重新发起请求刷新缓存的数据
    //useQuery(["projects",param],()=>httpGet('/test/projects',{data: param}))
    //useQuery<Project[]>(["projects",param],()=>httpGet('/test/projects',{data: param}))
    return result
}