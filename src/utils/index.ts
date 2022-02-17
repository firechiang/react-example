import {useState, useEffect, useRef} from "react"

// 判断只是不是false（注意：一个!value表示取反，两个!!value表示取反再取反）（注意：any 表示任意类型，unknown也表示任意类型，但是unknown比any更严格建议使用）
// 该函数的返回值类型是 boolean
export const isVoid = (value: unknown): boolean => (value === undefined || value === null || value === '') ? true : false

/**
 * @param object（类型是键值对object）
 */
export const cleanObject = (object: {[key: string]: unknown}) => {
    // 展开对象到另一个新对象
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore（这个注解表示忽略typescript类型检查错误）
        const value = result[key]
        // 如果对象值为空（删除该属性）
        if(isVoid(value)){
            // @ts-ignore（这个注解表示忽略typescript类型检查错误）
            delete result[key]
        }
    })
    return result
}

// 自定义Hook（注意：自定义Hook的名字必须由use开头，而且里面也必须再自带的Hook去执行代码，否则无法使用）
// callback 的类型是一个没有参数没有返回值的函数
export const useMount = (callback: ()=>void) => {
    // 根据条件触发执行代码（触发条件是一个空数数组，就是只触发一次，也就是页面加载时触发）
    // eslint-disable-next-line
    useEffect(callback,[])
}

// 处理类似于input事件，将其平滑化，等输入完成后才发起请求
// 注意：any 表示任意类型，?表示该参数可以不传，S表示泛型
export const useDebounced = <S>(value: S,delay?:number):S => {
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

export const useArray = <S>(initialArray: S[]) => {
    const [value,setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: S) => setValue([...value,item]),
        clear: setValue([]),
        removeIndex: (index:number) => {
            const copy = [...value]
            copy.splice(index,1)
            setValue(copy)
        }

    }
}

/**
 * 修改浏览器标签头信息
 * @param title
 * @param keepOnUnmount 是否还原浏览器标签头信息（false: 还原，true 不还原）
 */
export const useDocumentTitle = (title: string,keepOnUnmount: boolean = true) => {
    // useRef返回的值在整个组件的生命周期内都不会改变
    const oldTitle = useRef(document.title).current
    useEffect(()=>{
        document.title = title
    },[title])

    useEffect(()=>{
        return () => {
            if(!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    },[keepOnUnmount,oldTitle])
}