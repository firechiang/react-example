import {useState,useEffect} from "react"

// 判断只是不是false（注意：一个!value表示取反，两个!!value表示取反再取反）
export const isFalse = (value) => value === 0 ? false : !value

export const cleanObject = (object) => {
    // 展开对象到另一个新对象
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        // 如果对象值为空（删除该属性）
        if(isFalse(value)){
            delete result[key]
        }
    })
    return result
}

// 自定义Hook（注意：自定义Hook的名字必须由use开头，而且里面也必须再自带的Hook去执行代码，否则无法使用）
export const useMount = (callback) => {
    // 根据条件触发执行代码（触发条件是一个空数数组，就是只触发一次，也就是页面加载时触发）
    useEffect(callback,[])
}

// 处理类似于input事件，将其平滑化，等输入完成后才发起请求
export const useDebounced = (value,delay) => {
    // 定义状态变量debouncedValue，使用useState函数的参数指定状态变量的数据类型,调用setDebouncedValue函数设值
    const [debouncedValue,setDebouncedValue]  = useState(value)
     // 根据条件触发执行代码（这里是当value或delpay的值发生变化是触发）
    useEffect(() => {
        // 每次value或delpay的值发生变化时设置定时器在指定时间后执行
        const timeout = setTimeout(() => setDebouncedValue(value),delay)
        // 返回的函数是在useEffect上一次执行完成以后才会执行（注意：如果useEffect连续执行两次，那么在第二次开始执行之前会执行该函数；如果useEffect只执行一次那么该函数将不会被执行）
        // 返回函数的目的是清理掉上一次的定时器，因为用户还在输入嘛
        return () => clearTimeout(timeout)
    },[value,delay])
    return debouncedValue
}