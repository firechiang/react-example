import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ProjectListScreens} from "./screens";
import {LoginScreen} from "./screens/login/index"
import {MainPage} from "main/index"
import styled from "@emotion/styled"
import {FullPageLoading} from "components/lib"


import {Button} from "antd"

function App() {
  return (
    <div className="App">
        <LoginScreen/>
        {/*<MainPage/>*/}
        {/*<FullPageLoading/>*/}
        {/*<ProjectListScreens/>
        <Button type="primary">Button</Button>*/}

    </div>
  );
}

export default App;
