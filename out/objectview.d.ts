declare module feng3d {
    /**
     * 访问类型
     * @author feng 2016-3-28
     */
    class AccessType {
        /**
         * 可读写
         */
        static readwrite: string;
        /**
         * 只写
         */
        static writeonly: string;
        /**
         * 只读
         */
        static readonly: string;
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
    class BlockViewInfo {
        /**
         * 块名称
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
    class ObjectViewInfo {
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
        private objectAttributeInfos;
        /**
         * 对象块信息列表
         */
        private objectBlockInfos;
        /**
         * 保存类的一个实例，为了能够获取动态属性信息
         */
        owner: Object;
        /**
         * 获取对象属性列表
         */
        getObjectAttributeInfos(): AttributeViewInfo[];
        /**
         * 获取对象块信息列表
         */
        getObjectBlockInfos(): BlockViewInfo[];
    }
}
declare module feng3d {
    /**
     * 默认基础对象界面
     * @author feng 2016-3-11
     */
    class DefaultBaseObjectView extends eui.Label implements IObjectView {
        private _space;
        constructor(objectViewInfo: ObjectViewInfo);
        space: Object;
        getAttributeView(attributeName: String): IObjectAttributeView;
        getblockView(blockName: String): IObjectBlockView;
        /**
         * 更新界面
         */
        updateView(): void;
    }
}
declare module feng3d {
    /**
     * 默认对象属性界面
     * @author feng 2016-3-10
     */
    class DefaultObjectAttributeView extends eui.Group implements IObjectAttributeView {
        private label;
        private text;
        private textTemp;
        private _space;
        private _attributeName;
        private _attributeType;
        constructor(attributeViewInfo: AttributeViewInfo);
        space: Object;
        readonly attributeName: string;
        attributeValue: Object;
        /**
         * 更新界面
         */
        updateView(): void;
    }
}
declare module feng3d {
    /**
     * 默认对象属性块界面
     * @author feng 2016-3-22
     */
    class DefaultObjectBlockView extends eui.Group implements IObjectBlockView {
        private _space;
        private _blockName;
        private attributeViews;
        private itemList;
        private isInitView;
        /**
         * @inheritDoc
         */
        constructor(blockViewInfo: BlockViewInfo);
        private initView();
        space: Object;
        readonly blockName: string;
        /**
         * 更新自身界面
         */
        private $updateView();
        updateView(): void;
        getAttributeView(attributeName: String): IObjectAttributeView;
    }
}
declare module feng3d {
    /**
     * 默认使用块的对象界面
     * @author feng 2016-3-22
     */
    class DefaultObjectView extends eui.Group implements IObjectView {
        private _space;
        private _objectViewInfo;
        private blockViews;
        /**
         * 对象界面数据
         */
        constructor(objectViewInfo: ObjectViewInfo);
        space: Object;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 更新自身界面
         */
        private $updateView();
        getblockView(blockName: string): IObjectBlockView;
        getAttributeView(attributeName: string): IObjectAttributeView;
    }
}
declare module feng3d {
    class ObjectViewEvent extends egret.Event {
        static VALUE_CHANGE: string;
        space: any;
        attributeName: string;
        attributeValue: any;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        toString(): string;
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
        attributeDefaultViewClassByTypeVec: AttributeTypeDefinition[];
        /**
         * ObjectView类配置字典 （key：类名称，value：ObjectView类配置）
         */
        classConfigVec: ClassDefinition[];
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
         * @param object	用于生成界面的对象
         */
        static getObjectView(object: Object): egret.DisplayObject;
        /**
         * 获取属性界面
         */
        static getAttributeView(attributeViewInfo: AttributeViewInfo): egret.DisplayObject;
        /**
         * 获取块界面
         * @param owner		所属对象
         */
        static getBlockView(blockViewInfo: BlockViewInfo): egret.DisplayObject;
        /**
         * 获取对象信息
         * @param object
         * @return
         */
        private static getObjectInfo(object);
        static getAttributeViewInfo(owner: Object, attributeName: string): AttributeViewInfo;
        static getAttributeDefinition(owner: Object, attributeName: string): AttributeDefinition;
        static setCustomObjectViewClass(owner: Object, viewClass: any): void;
        /**
         * 获取对象属性块定义
         * @param blockName		属性名称
         * @param autoCreate	是否自动生成
         * @return
         */
        static getBlockDefinition(owner: Object, blockName: string): BlockDefinition;
        /**
         * 获取ObjectView类配置
         * @param object				对象
         * @param autoCreate			是否自动创建
         * @return
         */
        static getClassConfig(object: any): ClassDefinition;
        /**
         * 获取特定类型的默认属性界面定义
         * @param attributeClass		属性类型
         * @param autoCreate			是否自动创建
         * @return
         */
        static getAttributeDefaultViewClass(attributeClass: any): AttributeTypeDefinition;
    }
}
