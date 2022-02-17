import "./wdyr"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProviders} from "context/index"
// antd样式
import "antd/dist/antd.less"

ReactDOM.render(
  <React.StrictMode>
      {/* 用上下文组件将页面组件全部包裹起来，这样页面里面就可以用上下文组件里面的数据 */}
      <AppProviders>
          <App />
      </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
