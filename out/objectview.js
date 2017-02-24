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
                if (feng3d.ClassUtils.isBaseType(classConfig.owner)) {
                    classConfig.component = feng3d.$objectViewConfig.defaultBaseObjectViewClass;
                }
            }
            if (classConfig.component == null || classConfig.component == "") {
                //使用默认类型界面类定义
                classConfig.component = feng3d.$objectViewConfig.defaultObjectViewClass;
            }
            var cls = feng3d.ClassUtils.getDefinitionByName(classConfig.component);
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
            var cls = feng3d.ClassUtils.getDefinitionByName(attributeViewInfo.component);
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
            var cls = feng3d.ClassUtils.getDefinitionByName(blockViewInfo.component);
            var view = new cls(blockViewInfo);
            return view;
        }
        /**
         * 获取对象信息
         * @param object
         * @return
         */
        static getObjectInfo(object) {
            var className = feng3d.ClassUtils.getQualifiedClassName(object);
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
            var className = feng3d.ClassUtils.getQualifiedClassName(object);
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
                var propertyDescriptors = feng3d.PropertyDescriptorUtils.getAttributes(object);
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
            var className = feng3d.ClassUtils.getQualifiedClassName(object);
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
            var propertyDescriptor = feng3d.PropertyDescriptorUtils.getPropertyDescriptor(object, attributeName);
            var objectAttributeInfo = {
                name: attributeName,
                block: attributeDefinition ? attributeDefinition.block : "",
                component: attributeDefinition ? attributeDefinition.component : "",
                componentParam: attributeDefinition ? attributeDefinition.componentParam : null,
                owner: object,
                writable: propertyDescriptor ? feng3d.PropertyDescriptorUtils.isWritable(propertyDescriptor) : true,
                type: feng3d.ClassUtils.getQualifiedClassName(object[attributeName])
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
            var className = feng3d.ClassUtils.getQualifiedClassName(object);
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