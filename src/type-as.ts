


export const Test = () => {
    // 定义一个类型别名（也就是customType表示string和number）
    let customType: string | number
}

/**
 * 定义Person数据类型
 */
type Person = {
    name: string,
    age: number
}

// 定义一个类型PersonKeys它的属性从Person里面来，但是它的属性是可选的，也就是非必传
type PersonKeys = keyof Person

/**
 * 注意：这样定义出来对象的属性一定要和Person类型的属性一模一样
 */
const maomao: Person = {
    name: "",
    age: 1
}

/**
 * 使用Partial修饰Person类型定义对象的属性，使得属性是可选的，也就是非必传
 */
const tinatian: Partial<Person> = {

}
/**
 * 使用Omit修饰Person类型定义对象可以忽略掉Person的某些属性
 */
const ddd: Omit<Person, "name" | "age"> = {

}

/**
 * 定义一个PartialP类型，用来修饰泛型的类型，使得其属性是可选的，也就是非必传（注意：这个其实就是官方的 Partial 实现代码）
 */
type PartialP<T> = {
    // 所有的属性来自T；?号表示属性是可选的，也就是非必传；属性的类型和T的属性类型一致
    [P in keyof T]?: T[P]
}
