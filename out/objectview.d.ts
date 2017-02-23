declare module feng3d.objectview {
    /**
     * 属性描述工具类
     * @author feng 2017-02-23
     */
    class PropertyDescriptorUtils {
        /**
         * 判断是否为函数
         *
         * @static
         * @param {PropertyDescriptor} propertyDescriptor 属性描述
         * @returns
         *
         * @memberOf PropertyDescriptorUtils
         */
        static isFunction(propertyDescriptor: PropertyDescriptor): boolean;
        /**
         * 判断是否写
         *
         * @static
         * @param {PropertyDescriptor} propertyDescriptor 属性描述
         * @returns
         *
         * @memberOf PropertyDescriptorUtils
         */
        static isWritable(propertyDescriptor: PropertyDescriptor): boolean;
        /**
         * 获取属性描述
         *
         * @static
         * @param {Object} object
         * @param {string} name
         * @returns
         *
         * @memberOf PropertyDescriptorUtils
         */
        static getPropertyDescriptor(object: Object, name: string): PropertyDescriptor;
        /**
         * 获取所有属性描述（不包含函数）
         *
         * @static
         * @param {Object} object 对象
         * @returns
         *
         * @memberOf PropertyDescriptorUtils
         */
        static getAttributes(object: Object): {
            [propertyKey: string]: PropertyDescriptor;
        };
        /**
         * 获取所有属性描述
         *
         * @static
         * @param {Object} object
         * @returns
         *
         * @memberOf PropertyDescriptorUtils
         */
        static getPropertyDescriptors(object: Object): {
            [propertyKey: string]: PropertyDescriptor;
        };
    }
}
declare module feng3d.objectview {
    /**
     * 类工具
     * @author feng 2017-02-15
     */
    class ClassUtils {
        /**
         * 判断a对象是否为b类型
         */
        static is<T>(a: any, b: new () => T): boolean;
        /**
         * 如果a为b类型则返回，否则返回null
         */
        static as<T>(a: any, b: new () => T): T;
        /**
         * 是否为基础类型
         * @param object    对象
         */
        static isBaseType(object: any): boolean;
        /**
         * 返回对象的完全限定类名。
         * @param value 需要完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型
         * （如number)和类对象
         * @returns 包含完全限定类名称的字符串。
         */
        static getQualifiedClassName(value: any): string;
        /**
         * 返回 value 参数指定的对象的基类的完全限定类名。
         * @param value 需要取得父类的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象
         * @returns 完全限定的基类名称，或 null（如果不存在基类名称）。
         */
        static getQualifiedSuperclassName(value: any): string;
        /**
         * 返回 name 参数指定的类的类对象引用。
         * @param name 类的名称。
         */
        static getDefinitionByName(name: string): any;
        /**
         * 为一个类定义注册完全限定类名
         * @param classDefinition 类定义
         * @param className 完全限定类名
         */
        static registerClass(classDefinition: any, className: string): void;
        /**
         * 新增反射对象所在的命名空间，使得getQualifiedClassName能够得到正确的结果
         */
        static addClassNameSpace(namespace: string): void;
    }
}
declare module feng3d {
    /**
     * 排序比较函数
     * @author feng 2016-3-29
     */
    class SortCompare {
        /**
         * 比较字符串
         * @param a
         * @param b
         * @return
         */
        static stringCompare(a: string, b: string): number;
    }
}
declare module feng3d {
    /**
     * 属性信息
     * @author feng 2016-3-28
     */
    class AttributeInfo {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 属性类型
         */
        type: string;
        /**
         * 是否可写
         */
        writable: boolean;
        /**
         * 构建
         */
        constructor(name?: string, type?: string, writable?: boolean);
        /**
         * 比较字符串
         * @param a
         * @param b
         * @return
         */
        static compare(a: AttributeInfo, b: AttributeInfo): number;
    }
}
declare module feng3d {
    /**
     * 定义属性
     * @author feng 2016-3-23
     */
    interface AttributeDefinition {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 所属块名称
         */
        block?: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: Object;
    }
}
declare module feng3d {
    /**
     * 定义特定属性类型默认界面
     * @author feng 2016-3-25
     */
    interface AttributeTypeDefinition {
        /**
         * 属性类型
         */
        type: string;
        /**
         * 界面类
         */
        component: string;
        /**
         * 组件参数
         */
        componentParam?: Object;
    }
}
declare module feng3d {
    /**
     * 块定义
     * @author feng 2016-3-23
     */
    interface BlockDefinition {
        /**
         * 块名称
         */
        name: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: Object;
    }
}
declare module feng3d {
    /**
     * ObjectView类配置
     * @author feng 2016-3-23
     */
    interface ClassDefinition {
        /**
         * 类名
         */
        name: string;
        /**
         * 组件
         */
        component: string;
        /**
         * 组件参数
         */
        componentParam: Object;
        /**
         * 自定义对象属性定义字典（key:属性名,value:属性定义）
         */
        attributeDefinitionVec: AttributeDefinition[];
        /**
         * 自定义对象属性块界面类定义字典（key:属性块名称,value:自定义对象属性块界面类定义）
         */
        blockDefinitionVec: BlockDefinition[];
    }
}
declare module feng3d {
    /**
     * 对象属性界面接口
     * @author feng 2016-3-10
     */
    interface IObjectAttributeView {
        /**
         * 界面所属对象（空间）
         */
        space: Object;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 属性名称
         */
        attributeName: string;
        /**
         * 属性值
         */
        attributeValue: Object;
    }
}
declare module feng3d {
    /**
     * 对象属性块界面接口
     * @author feng 2016-3-22
     */
    interface IObjectBlockView {
        /**
         * 界面所属对象（空间）
         */
        space: Object;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 块名称
         */
        blockName: string;
        /**
         * 获取属性界面
         * @param attributeName		属性名称
         */
        getAttributeView(attributeName: string): IObjectAttributeView;
    }
}
declare module feng3d {
    /**
     * 对象界面接口
     * @author feng 2016-3-11
     */
    interface IObjectView {
        /**
         * 界面所属对象（空间）
         */
        space: Object;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 获取块界面
         * @param blockName		块名称
         */
        getblockView(blockName: string): IObjectBlockView;
        /**
         * 获取属性界面
         * @param attributeName		属性名称
         */
        getAttributeView(attributeName: string): IObjectAttributeView;
    }
}
declare module feng3d {
    /**
     * 对象属性信息
     * @author feng 2016-3-10
     */
    class AttributeViewInfo {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 属性类型
         */
        type: string;
        /**
         * 是否可写
         */
        writable: boolean;
        /**
         * 所属块名称
         */
        block: string;
        /**
         * 组件
         */
        component: string;
        /**
         * 组件参数
         */
        componentParam: Object;
        /**
         * 属性所属对象
         */
        owner: Object;
    }
}
declare module feng3d {
    /**
     * 对象属性块
     * @author feng 2016-3-22
     */
    interface BlockViewInfo {
        /**
         * 块名称
         */
        name: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: Object;
        /**
         * 属性信息列表
         */
        itemList: AttributeViewInfo[];
        /**
         * 属性拥有者
         */
        owner: Object;
    }
}
declare module feng3d {
    /**
     * 对象信息
     * @author feng 2016-3-29
     */
    interface ObjectViewInfo {
        /**
         * 类名
         */
        name: string;
        /**
         * 组件
         */
        component: string;
        /**
         * 组件参数
         */
        componentParam: Object;
        /**
         * 对象属性列表
         */
        objectAttributeInfos: AttributeViewInfo[];
        /**
         * 对象块信息列表
         */
        objectBlockInfos: BlockViewInfo[];
        /**
         * 保存类的一个实例，为了能够获取动态属性信息
         */
        owner: Object;
    }
}
declare module feng3d {
    /**
     * ObjectView总配置数据
     * @author feng 2016-3-23
     */
    interface ObjectViewConfig {
        /**
         * 默认基础类型对象界面类定义
         */
        defaultBaseObjectViewClass: string;
        /**
         * 默认对象界面类定义
         */
        defaultObjectViewClass: string;
        /**
         * 默认对象属性界面类定义
         */
        defaultObjectAttributeViewClass: string;
        /**
         * 属性块默认界面
         */
        defaultObjectAttributeBlockView: string;
        /**
         * 指定属性类型界面类定义字典（key:属性类名称,value:属性界面类定义）
         */
        attributeDefaultViewClassByTypeVec: {
            [type: string]: AttributeTypeDefinition;
        };
        /**
         * ObjectView类配置字典 （key：类名称，value：ObjectView类配置）
         */
        classConfigVec: {
            [name: string]: ClassDefinition;
        };
    }
    var $objectViewConfig: ObjectViewConfig;
}
declare module feng3d {
    /**
     * 对象界面
     * @author feng 2016-3-10
     */
    class ObjectView {
        /**
         * 获取对象界面
         *
         * @static
         * @param {Object} object				用于生成界面的对象
         * @returns {egret.DisplayObject}		对象界面
         *
         * @memberOf ObjectView
         */
        static getObjectView(object: Object): any;
        /**
         * 获取属性界面
         *
         * @static
         * @param {AttributeViewInfo} attributeViewInfo			属性界面信息
         * @returns {egret.DisplayObject}						属性界面
         *
         * @memberOf ObjectView
         */
        static getAttributeView(attributeViewInfo: AttributeViewInfo): any;
        /**
         * 获取块界面
         *
         * @static
         * @param {BlockViewInfo} blockViewInfo			块界面信息
         * @returns {egret.DisplayObject}				块界面
         *
         * @memberOf ObjectView
         */
        static getBlockView(blockViewInfo: BlockViewInfo): any;
        /**
         * 获取对象信息
         * @param object
         * @return
         */
        private static getObjectInfo(object);
        /**
         * 获取对象属性列表
         */
        private static getObjectAttributeInfos(object, filterReg?);
        /**
         * 获取对象块信息列表
         *
         * @private
         * @static
         * @param {Object} object			对象
         * @returns {BlockViewInfo[]}		对象块信息列表
         *
         * @memberOf ObjectView
         */
        private static getObjectBlockInfos(object);
        /**
         * 获取属性界面信息
         *
         * @private
         * @static
         * @param {Object} object				属性所属对象
         * @param {string} attributeName		属性名称
         * @returns {AttributeViewInfo}			属性界面信息
         *
         * @memberOf ObjectView
         */
        private static getAttributeViewInfo(object, attributeName);
        /**
         * 获取属性定义
         *
         * @private
         * @static
         * @param {Object} object					属性所属对象
         * @param {string} attributeName			属性名称
         * @returns {AttributeDefinition}			属性定义信息
         *
         * @memberOf ObjectView
         */
        private static getAttributeDefinition(object, attributeName);
    }
}
