import React from "react"
import {FormEvent} from "react"
import {User} from "screens/search-panel"
import {useAuth} from "../../context/auth-context";
import {Form,Input,Button,Card,Divider} from "antd"
import styled from "@emotion/styled"
import logo from "assets/logo.svg"
import background_left from "assets/left.svg"
import background_right from "assets/right.svg"
import {useDocumentTitle} from "../../utils";

// 执行 npm start 取.env.development文件里面的值，执行 npm run build 取.env文件里面的值（注意：这些是自动获取的，不需要做什么操作）
// 注意：配置文件里面的变量名必须由 REACT_APP_ 开头否则不读取
const RestApiUrl = process.env.REACT_APP_ApiUrl

export const handlerLoginResponse = (user:User) => {
    window.localStorage.setItem("__user_token__",JSON.stringify(user) || '')
    return user
}

export const getUser = () => {
    const userStr = window.localStorage.getItem("__user_token__")
    if(userStr) {
        return JSON.parse(userStr)
    }
    return null
}

/**
 * 定义登录函数
 * @param param
 */
export const login = (param:{username:string,password:string}) => {
    return fetch(`${RestApiUrl}/test/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    }).then(
        async (response) => {
            if(response.ok) {
                return handlerLoginResponse(await response.json())
            } else {
                await Promise.reject(param)
            }
        }
    )
}

export const LoginScreen = () => {
    useDocumentTitle("登录")
    // 登录函数使用上下文useAuth组件里面login函数，并使用上下文组件里面user属性对象（注意：上下文组件里面的东西是全局）
    const {user,login} = useAuth()
    /**
     * 定义表单事件函数
     * @param event
     */
    const handleSubmit = (/*event:FormEvent<HTMLFormElement>*/ values: {username: string,password: string}) => {
        //event.preventDefault()
        // as表示强制转换
        //const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        //const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        // 登录
        login(/*{username,password}*/values)
    }
    // 注意：Container是用css写的组件，也就是这个样式作用于这个里面的代码
    return <Container>
        <HeaderLogo/>
        <Background/>
        <ShadowCard>
            <Title>请登录</Title>
            <Form onFinish={handleSubmit}>
                <Form.Item name={"username"} rules={[{required:true,message:"请输入用户名"}]}>
                    <Input placeholder={"用户名"} type="text" id={"username"}/>
                </Form.Item>
                <Form.Item name={"password"} rules={[{required:true,message:"请输入密码"}]}>
                    <Input placeholder={"密码"} type="password" id={"password"}/>
                </Form.Item>
                <Form.Item>
                    <LoginButton htmlType={"submit"} type={"primary"}>登录</LoginButton>
                </Form.Item>
            </Form>
            <Divider/>
            <Button type={"link"} onClick={e => e.preventDefault()}>没有账号，注册账号</Button>
        </ShadowCard>

    </Container>
}

// 该样式组件同是也是Card组件
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px 0;
  text-align: center;
`

// 该样式组件同时也是div
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const HeaderLogo = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom,right bottom;
  background-size: calc(((100vw - 40rem)/2) - 3.2rem),calc(((100vw - 40rem)/2) - 3.2rem),cover;
  background-image: url(${background_left}),url(${background_right});
`

const Title = styled.div`
  margin-bottom: 2.4rem;
  color: rgba(94,108,132);
`

const LoginButton = styled(Button)`
   width: 100%;
`