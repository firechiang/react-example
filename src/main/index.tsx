import React from "react"
import styled from "@emotion/styled"
import {StyleRow} from "components/lib"
import {ReactComponent as Logo} from "assets/logo.svg"
import {Dropdown,Menu,Button} from "antd";
import {Navigate,Routes,Route} from "react-router";
import {BrowserRouter as Router, Link} from "react-router-dom"

import {ProjectListScreens} from "screens/index";
import {ProjectInfo} from "screens/info"
import {LoginScreen} from "screens/login/index";
import {restRoute} from "utils/index"

export const MainPage = () => {

    const logout = () => {

    }

    return (
        <Container>
            <Header>
                <HeaderLeft gap={true}>
                    {/*点击跳转首页*/}
                    <SoftwareLogo type={"link"} onClick={restRoute}>
                        <Logo width={'7rem'} color={'rgb(38,132,255)'}/>
                    </SoftwareLogo>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={"logout"}>
                                <Button type={"link"} onClick={logout}>登出</Button>
                            </Menu.Item>
                        </Menu>}>
                        <Button type={"link"} onClick={e => e.preventDefault()}>Hi，毛毛</Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <Router>
                    <Routes>
                        <Route path={"/login"} element={<LoginScreen/>}/>
                        <Route path={"/"} element={<ProjectListScreens/>}/>
                        {/*projectId是参数*/}
                        <Route path={"/projects/:projectId/*"} element={<ProjectInfo/>}/>
                        <Route path={"/buttons"} element={<Button type="primary">Button</Button>}/>
                    </Routes>
                </Router>

            </Main>
        </Container>
    );
}


const Container = styled.div`
  display: grid;
  // grid布局，顶部高6rem，中间1fr（就是自适应），底部高6rem
  grid-template-rows: 6rem 1fr 6rem;
  // grid布局，左边宽20rem，中间1fr（就是自适应），右边宽20rem
  grid-template-colums: 20rem 1fr 20rem;
  // 实际布局（就是哪个位置放哪个）下面是个三行三列的布局
  grid-template-areas:
      "header header header"
      "nav main aside"
      "footer footer footer";
  height: 100vh;
  // grid布局每个组件相隔距离
  //grid-gap: 1rem;
`

// 顶部
const Header = styled.header`
  // grid-area 是给grid布局里面的子组件取名字
  grid-area: header;
  // 布局flex-box
  display: flex;
  // 元素以行排列
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`

// 顶部的左边
const HeaderLeft = styled(StyleRow)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// 顶部的右边
const HeaderRight = styled.div`
    
`

// 左边
const Nav = styled.nav`
  grid-area: nav;
`

// 中间
const Main = styled.main`
  height: calc(100vh - 6rem);
  padding: 3.2rem;
`

// 右边
const Aside = styled.aside`
  grid-area: aside;
`

// 下边
const Footer = styled.footer`
  grid-area: footer;
`

const HeaderItem = styled.h3`
  margin-right: 3rem;
`

const SoftwareLogo = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`