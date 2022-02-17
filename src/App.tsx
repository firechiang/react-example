import React from 'react';
import logo from './logo.svg';
import './App.css';

import {MainPage} from "main/index"
import styled from "@emotion/styled"
import {FullPageLoading} from "components/lib"


import {Button} from "antd"

function App() {
  return (
    <div className="App">
        <MainPage/>
        {/*<FullPageLoading/>*/}
    </div>
  );
}

export default App;
