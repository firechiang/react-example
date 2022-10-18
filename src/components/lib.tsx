import styled from "@emotion/styled"
import {Spin,Typography} from "antd"

/**
 * 定义一个样式组件（参数gap和between和marginBottom）
 */
export const StyleRow = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom+'rem'};
  // 设置子元素样式
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap+'rem' : props.gap ? '2rem' : undefined};
  }
`

/**
 * 全屏Loading
 * @constructor
 */
export const FullPageLoading = () => <FullPage>
    <Spin size={"large"}></Spin>
</FullPage>

/**
 * 全屏错误信息
 * @param error
 * @constructor
 */
export const FullPageErrorFallback = ({error}:{error: Error | null}) => <FullPage>
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
</FullPage>

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  // 水平居中
  justify-content: center;
  // 垂直居中
  align-items: center;
`

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({error}: {error: unknown}) => {
    if(isError(error)) {
        return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    }
}
