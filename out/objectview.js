var feng3d;
(function (feng3d) {
    var objectview;
    (function (objectview) {
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
            static isFunction(propertyDescriptor) {
                return Boolean(propertyDescriptor.value && typeof propertyDescriptor.value == "function");
            }
            /**
             * 判断是否写
             *
             * @static
             * @param {PropertyDescriptor} propertyDescriptor 属性描述
             * @returns
             *
             * @memberOf PropertyDescriptorUtils
             */
            static isWritable(propertyDescriptor) {
                return Boolean(propertyDescriptor.writable || propertyDescriptor.set);
            }
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
            static getPropertyDescriptor(object, name) {
                return Object.getOwnPropertyDescriptor(object, name) || Object.getOwnPropertyDescriptor(object.constructor.prototype, name);
            }
            /**
             * 获取所有属性描述（不包含函数）
             *
             * @static
             * @param {Object} object 对象
             * @returns
             *
             * @memberOf PropertyDescriptorUtils
             */
            static getAttributes(object) {
                var attributePropertyDescriptors = {};
                var propertyDescriptors = this.getPropertyDescriptors(object);
                for (var property in propertyDescriptors) {
                    var element = propertyDescriptors[property];
                    if (!this.isFunction(element))
                        attributePropertyDescriptors[property] = element;
                }
                return attributePropertyDescriptors;
            }
            /**
             * 获取所有属性描述
             *
             * @static
             * @param {Object} object
             * @returns
             *
             * @memberOf PropertyDescriptorUtils
             */
            static getPropertyDescriptors(object) {
                var propertyDescriptors = {};
                var names = Object.getOwnPropertyNames(object);
                names.forEach(element => {
                    propertyDescriptors[element] = this.getPropertyDescriptor(object, element);
                });
                if (object.constructor != Object) {
                    var names = Object.getOwnPropertyNames(object.constructor.prototype);
                    names.forEach(element => {
                        propertyDescriptors[element] = this.getPropertyDescriptor(object, element);
                    });
                }
                delete propertyDescriptors["constructor"];
                return propertyDescriptors;
            }
        }
        objectview.PropertyDescriptorUtils = PropertyDescriptorUtils;
    })(objectview = feng3d.objectview || (feng3d.objectview = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var objectview;
    (function (objectview) {
        /**
         * 类工具
         * @author feng 2017-02-15
         */
        class ClassUtils {
            /**
             * 判断a对象是否为b类型
             */
            static is(a, b) {
                var prototype = a.prototype ? a.prototype : Object.getPrototypeOf(a);
                while (prototype != null) {
                    //类型==自身原型的构造函数
                    if (prototype.constructor == b)
                        return true;
                    //父类就是原型的原型构造函数
                    prototype = Object.getPrototypeOf(prototype);
                }
                return false;
            }
            /**
             * 如果a为b类型则返回，否则返回null
             */
            static as(a, b) {
                if (!ClassUtils.is(a, b))
                    return null;
                return a;
            }
            /**
             * 是否为基础类型
             * @param object    对象
             */
            static isBaseType(object) {
                return object == null || typeof object == "number" || typeof object == "boolean" || typeof object == "string";
            }
            /**
             * 返回对象的完全限定类名。
             * @param value 需要完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型
             * （如number)和类对象
             * @returns 包含完全限定类名称的字符串。
             */
            static getQualifiedClassName(value) {
                if (value == null) {
                    return null;
                }
                var className = null;
                var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
                if (prototype.hasOwnProperty(CLASS_KEY)) {
                    className = prototype[CLASS_KEY];
                }
                if (className == null) {
                    className = prototype.constructor.name;
                    if (ClassUtils.getDefinitionByName(className) == prototype.constructor) {
                        ClassUtils.registerClass(prototype.constructor, className);
                    }
                    else {
                        //在可能的命名空间内查找
                        for (var i = 0; i < classNameSpaces.length; i++) {
                            var tryClassName = classNameSpaces[i] + "." + className;
                            if (ClassUtils.getDefinitionByName(tryClassName) == prototype.constructor) {
                                className = tryClassName;
                                ClassUtils.registerClass(prototype.constructor, className);
                                break;
                            }
                        }
                    }
                }
                if (ClassUtils.getDefinitionByName(className) != prototype.constructor) {
                    throw new Error("");
                }
                return className;
            }
            /**
             * 返回 value 参数指定的对象的基类的完全限定类名。
             * @param value 需要取得父类的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象
             * @returns 完全限定的基类名称，或 null（如果不存在基类名称）。
             */
            static getQualifiedSuperclassName(value) {
                if (value == null) {
                    return null;
                }
                var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
                var superProto = Object.getPrototypeOf(prototype);
                if (!superProto) {
                    return null;
                }
                var superClass = ClassUtils.getQualifiedClassName(superProto.constructor);
                if (!superClass) {
                    return null;
                }
                return superClass;
            }
            /**
             * 返回 name 参数指定的类的类对象引用。
             * @param name 类的名称。
             */
            static getDefinitionByName(name) {
                if (!name)
                    return null;
                var definition = definitionCache[name];
                if (definition) {
                    return definition;
                }
                var paths = name.split(".");
                var length = paths.length;
                definition = global;
                for (var i = 0; i < length; i++) {
                    var path = paths[i];
                    definition = definition[path];
                    if (!definition) {
                        return null;
                    }
                }
                definitionCache[name] = definition;
                return definition;
            }
            /**
             * 为一个类定义注册完全限定类名
             * @param classDefinition 类定义
             * @param className 完全限定类名
             */
            static registerClass(classDefinition, className) {
                var prototype = classDefinition.prototype;
                Object.defineProperty(prototype, CLASS_KEY, {
                    value: className,
                    enumerable: false,
                    writable: true
                });
            }
            /**
             * 新增反射对象所在的命名空间，使得getQualifiedClassName能够得到正确的结果
             */
            static addClassNameSpace(namespace) {
                if (classNameSpaces.indexOf(namespace) == -1) {
                    classNameSpaces.push(namespace);
                }
            }
        }
        objectview.ClassUtils = ClassUtils;
        var definitionCache = {};
        var global = window;
        var CLASS_KEY = "__class__";
        var classNameSpaces = ["feng3d"];
    })(objectview = feng3d.objectview || (feng3d.objectview = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
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
        static stringCompare(a, b) {
            var index = 0;
            var len = Math.min(a.length, b.length);
            for (var i = 0; i < len; i++) {
                if (a.charCodeAt(i) != b.charCodeAt(i))
                    return a.charCodeAt(i) - b.charCodeAt(i);
            }
            if (a.length != b.length)
                return a.length - b.length;
            return 0;
        }
    }
    feng3d.SortCompare = SortCompare;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 属性信息
     * @author feng 2016-3-28
     */
    class AttributeInfo {
        /**
         * 构建
         */
        constructor(name = "", type = "", writable = true) {
            this.name = name;
            this.type = type;
            this.writable = writable;
        }
        /**
         * 比较字符串
         * @param a
         * @param b
         * @return
         */
        static compare(a, b) {
            return feng3d.SortCompare.stringCompare(a.name, b.name);
        }
    }
    feng3d.AttributeInfo = AttributeInfo;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 对象属性信息
     * @author feng 2016-3-10
     */
    class AttributeViewInfo {
    }
    feng3d.AttributeViewInfo = AttributeViewInfo;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    feng3d.$objectViewConfig = {
        defaultBaseObjectViewClass: "",
        defaultObjectViewClass: "",
        defaultObjectAttributeViewClass: "",
        defaultObjectAttributeBlockView: "",
        attributeDefaultViewClassByTypeVec: {},
        classConfigVec: {}
    };
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ClassUtils = feng3d.objectview.ClassUtils;
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
        static getObjectView(object) {
            var classConfig = ObjectView.getObjectInfo(object);
            if (classConfig.component == null || classConfig.component == "") {
                //返回基础类型界面类定义
                if (ClassUtils.isBaseType(classConfig.owner)) {
                    classConfig.component = feng3d.$objectViewConfig.defaultBaseObjectViewClass;
                }
            }
            if (classConfig.component == null || classConfig.component == "") {
                //使用默认类型界面类定义
                classConfig.component = feng3d.$objectViewConfig.defaultObjectViewClass;
            }
            var cls = ClassUtils.getDefinitionByName(classConfig.component);
            var view = new cls(classConfig);
            return view;
        }
        /**
         * 获取属性界面
         *
         * @static
         * @param {AttributeViewInfo} attributeViewInfo			属性界面信息
         * @returns {egret.DisplayObject}						属性界面
         *
         * @memberOf ObjectView
         */
        static getAttributeView(attributeViewInfo) {
            if (attributeViewInfo.component == null || attributeViewInfo.component == "") {
                var defaultViewClass = feng3d.$objectViewConfig.attributeDefaultViewClassByTypeVec[attributeViewInfo.type];
                var tempComponent = defaultViewClass ? defaultViewClass.component : "";
                if (tempComponent != null && tempComponent != "") {
                    attributeViewInfo.component = defaultViewClass.component;
                    attributeViewInfo.componentParam = defaultViewClass.componentParam;
                }
            }
            if (attributeViewInfo.component == null || attributeViewInfo.component == "") {
                //使用默认对象属性界面类定义
                attributeViewInfo.component = feng3d.$objectViewConfig.defaultObjectAttributeViewClass;
                attributeViewInfo.componentParam = null;
            }
            var cls = ClassUtils.getDefinitionByName(attributeViewInfo.component);
            var view = new cls(attributeViewInfo);
            return view;
        }
        /**
         * 获取块界面
         *
         * @static
         * @param {BlockViewInfo} blockViewInfo			块界面信息
         * @returns {egret.DisplayObject}				块界面
         *
         * @memberOf ObjectView
         */
        static getBlockView(blockViewInfo) {
            if (blockViewInfo.component == null || blockViewInfo.component == "") {
                //返回默认对象属性界面类定义
                blockViewInfo.component = feng3d.$objectViewConfig.defaultObjectAttributeBlockView;
                blockViewInfo.componentParam = null;
            }
            var cls = ClassUtils.getDefinitionByName(blockViewInfo.component);
            var view = new cls(blockViewInfo);
            return view;
        }
        /**
         * 获取对象信息
         * @param object
         * @return
         */
        static getObjectInfo(object) {
            var className = ClassUtils.getQualifiedClassName(object);
            var classConfig = feng3d.$objectViewConfig.classConfigVec[className];
            var objectInfo = {
                objectAttributeInfos: ObjectView.getObjectAttributeInfos(object),
                objectBlockInfos: ObjectView.getObjectBlockInfos(object),
                name: className,
                owner: object,
                component: classConfig ? classConfig.component : "",
                componentParam: classConfig ? classConfig.componentParam : null
            };
            return objectInfo;
        }
        /**
         * 获取对象属性列表
         */
        static getObjectAttributeInfos(object, filterReg = /_\w+|\$\w+|_/) {
            var attributeNames = [];
            var className = ClassUtils.getQualifiedClassName(object);
            var classConfig = feng3d.$objectViewConfig.classConfigVec[className];
            if (classConfig != null) {
                //根据配置中默认顺序生产对象属性信息列表
                var attributeDefinitions = classConfig.attributeDefinitionVec;
                for (var i = 0; i < attributeDefinitions.length; i++) {
                    if (attributeNames.indexOf(attributeDefinitions[i].name) == -1)
                        attributeNames.push(attributeDefinitions[i].name);
                }
            }
            else {
                var propertyDescriptors = feng3d.objectview.PropertyDescriptorUtils.getAttributes(object);
                var attributeNames = Object.keys(propertyDescriptors);
                attributeNames = attributeNames.filter(function (value, index, array) {
                    var result = filterReg.exec(value);
                    return !result || value.indexOf(result[0]) != 0;
                });
                attributeNames = attributeNames.sort();
            }
            var objectAttributeInfos = [];
            for (var i = 0; i < attributeNames.length; i++) {
                var objectAttributeInfo = ObjectView.getAttributeViewInfo(object, attributeNames[i]);
                objectAttributeInfos.push(objectAttributeInfo);
            }
            return objectAttributeInfos;
        }
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
        static getObjectBlockInfos(object) {
            var objectBlockInfos = [];
            var dic = {};
            var objectBlockInfo;
            var objectAttributeInfos = ObjectView.getObjectAttributeInfos(object);
            //收集块信息
            var i = 0;
            var tempVec = [];
            for (i = 0; i < objectAttributeInfos.length; i++) {
                var blockName = objectAttributeInfos[i].block;
                objectBlockInfo = dic[blockName];
                if (objectBlockInfo == null) {
                    objectBlockInfo = dic[blockName] = { name: blockName, owner: object, itemList: [] };
                    tempVec.push(objectBlockInfo);
                }
                objectBlockInfo.itemList.push(objectAttributeInfos[i]);
            }
            //按快的默认顺序生成 块信息列表
            var blockDefinition;
            var pushDic = {};
            var className = ClassUtils.getQualifiedClassName(object);
            var classConfig = feng3d.$objectViewConfig.classConfigVec[className];
            if (classConfig != null) {
                for (i = 0; i < classConfig.blockDefinitionVec.length; i++) {
                    blockDefinition = classConfig.blockDefinitionVec[i];
                    objectBlockInfo = dic[blockDefinition.name];
                    if (objectBlockInfo == null) {
                        objectBlockInfo = {
                            name: blockDefinition.name,
                            owner: object,
                            itemList: []
                        };
                    }
                    objectBlockInfo.component = blockDefinition.component;
                    objectBlockInfo.componentParam = blockDefinition.componentParam;
                    objectBlockInfos.push(objectBlockInfo);
                    pushDic[objectBlockInfo.name] = true;
                }
            }
            //添加剩余的块信息
            for (i = 0; i < tempVec.length; i++) {
                if (Boolean(pushDic[tempVec[i].name]) == false) {
                    objectBlockInfos.push(tempVec[i]);
                }
            }
            return objectBlockInfos;
        }
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
        static getAttributeViewInfo(object, attributeName) {
            var attributeDefinition = ObjectView.getAttributeDefinition(object, attributeName);
            var propertyDescriptor = feng3d.objectview.PropertyDescriptorUtils.getPropertyDescriptor(object, attributeName);
            var objectAttributeInfo = {
                name: attributeName,
                block: attributeDefinition ? attributeDefinition.block : "",
                component: attributeDefinition ? attributeDefinition.component : "",
                componentParam: attributeDefinition ? attributeDefinition.componentParam : null,
                owner: object,
                writable: propertyDescriptor ? feng3d.objectview.PropertyDescriptorUtils.isWritable(propertyDescriptor) : true,
                type: ClassUtils.getQualifiedClassName(object[attributeName])
            };
            return objectAttributeInfo;
        }
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
        static getAttributeDefinition(object, attributeName) {
            var className = ClassUtils.getQualifiedClassName(object);
            var classConfig = feng3d.$objectViewConfig.classConfigVec[className];
            if (!classConfig)
                return null;
            for (var i = 0; i < classConfig.attributeDefinitionVec.length; i++) {
                var attributeDefinition = classConfig.attributeDefinitionVec[i];
                if (attributeDefinition.name == attributeName)
                    return attributeDefinition;
            }
            return null;
        }
    }
    feng3d.ObjectView = ObjectView;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=objectview.js.map