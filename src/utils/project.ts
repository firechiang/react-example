import {Project} from "screens/list"
import {useEffect} from "react";
import {cleanObject} from "utils/index"
import {useGet} from "utils/http"
import {useAsync} from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
    const httpGet = useGet()
    const {run, ...result} = useAsync<Project[]>()
    useEffect(()=>{
        run(httpGet("/test/projects",{data:param}))
    },[param])
    return result
}