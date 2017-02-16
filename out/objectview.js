var feng3d;
(function (feng3d) {
    /**
     * 访问类型
     * @author feng 2016-3-28
     */
    class AccessType {
    }
    /**
     * 可读写
     */
    AccessType.readwrite = "readwrite";
    /**
     * 只写
     */
    AccessType.writeonly = "writeonly";
    /**
     * 只读
     */
    AccessType.readonly = "readonly";
    feng3d.AccessType = AccessType;
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
        constructor() {
            /**
             * 所属块名称
             */
            this.block = "";
            /**
             * 组件
             */
            this.component = "";
        }
    }
    feng3d.AttributeViewInfo = AttributeViewInfo;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 对象属性块
     * @author feng 2016-3-22
     */
    class BlockViewInfo {
        constructor() {
            /**
             * 块名称
             */
            this.name = "";
            /**
             * 组件
             */
            this.component = "";
            /**
             * 属性信息列表
             */
            this.itemList = [];
        }
    }
    feng3d.BlockViewInfo = BlockViewInfo;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 对象信息
     * @author feng 2016-3-29
     */
    class ObjectViewInfo {
        constructor() {
            /**
             * 类名
             */
            this.name = "";
            /**
             * 组件
             */
            this.component = "";
        }
        /**
         * 获取对象属性列表
         */
        getObjectAttributeInfos() {
            if (this.objectAttributeInfos == null) {
                var objectAttributeInfo;
                var i;
                this.objectAttributeInfos = [];
                var classConfig = feng3d.ObjectView.getClassConfig(this.name);
                if (classConfig != null) {
                    //根据配置中默认顺序生产对象属性信息列表
                    var attributeDefinitions = classConfig.attributeDefinitionVec;
                    for (i = 0; i < attributeDefinitions.length; i++) {
                        objectAttributeInfo = feng3d.ObjectView.getAttributeViewInfo(this.owner, attributeDefinitions[i].name);
                        this.objectAttributeInfos.push(objectAttributeInfo);
                    }
                }
                else {
                    var attributeNames = Object.keys(this.owner);
                    attributeNames = attributeNames.sort();
                    for (i = 0; i < attributeNames.length; i++) {
                        objectAttributeInfo = feng3d.ObjectView.getAttributeViewInfo(this.owner, attributeNames[i]);
                        this.objectAttributeInfos.push(objectAttributeInfo);
                    }
                }
            }
            return this.objectAttributeInfos;
        }
        /**
         * 获取对象块信息列表
         */
        getObjectBlockInfos() {
            if (this.objectBlockInfos != null)
                return this.objectBlockInfos;
            var dic = {};
            var objectBlockInfo;
            var objectAttributeInfos = this.getObjectAttributeInfos();
            //收集块信息
            var i = 0;
            var tempVec = [];
            for (i = 0; i < objectAttributeInfos.length; i++) {
                var blockName = objectAttributeInfos[i].block;
                objectBlockInfo = dic[blockName];
                if (objectBlockInfo == null) {
                    objectBlockInfo = dic[blockName] = new feng3d.BlockViewInfo();
                    objectBlockInfo.name = blockName;
                    objectBlockInfo.owner = this.owner;
                    tempVec.push(objectBlockInfo);
                }
                objectBlockInfo.itemList.push(objectAttributeInfos[i]);
            }
            //按快的默认顺序生成 块信息列表
            var blockDefinition;
            this.objectBlockInfos = [];
            var pushDic = {};
            var classConfig = feng3d.ObjectView.getClassConfig(this.name);
            if (classConfig != null) {
                for (i = 0; i < classConfig.blockDefinitionVec.length; i++) {
                    blockDefinition = classConfig.blockDefinitionVec[i];
                    objectBlockInfo = dic[blockDefinition.name];
                    if (objectBlockInfo == null) {
                        objectBlockInfo = new feng3d.BlockViewInfo();
                        objectBlockInfo.name = blockDefinition.name;
                        objectBlockInfo.owner = this.owner;
                    }
                    feng3d.ObjectUtils.deepCopy(objectBlockInfo, blockDefinition);
                    this.objectBlockInfos.push(objectBlockInfo);
                    pushDic[objectBlockInfo.name] = true;
                }
            }
            //添加剩余的块信息
            for (i = 0; i < tempVec.length; i++) {
                if (Boolean(pushDic[tempVec[i].name]) == false) {
                    this.objectBlockInfos.push(tempVec[i]);
                }
            }
            return this.objectBlockInfos;
        }
    }
    feng3d.ObjectViewInfo = ObjectViewInfo;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 默认基础对象界面
     * @author feng 2016-3-11
     */
    class DefaultBaseObjectView extends eui.Label {
        constructor(objectViewInfo) {
            super();
            this._space = objectViewInfo.owner;
            this.updateView();
        }
        get space() {
            return this._space;
        }
        set space(value) {
            this._space = value;
            this.updateView();
        }
        getAttributeView(attributeName) {
            return null;
        }
        getblockView(blockName) {
            return null;
        }
        /**
         * 更新界面
         */
        updateView() {
            this.text = String(this._space);
        }
    }
    feng3d.DefaultBaseObjectView = DefaultBaseObjectView;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 默认对象属性界面
     * @author feng 2016-3-10
     */
    class DefaultObjectAttributeView extends eui.Group {
        constructor(attributeViewInfo) {
            super();
            this._space = attributeViewInfo.owner;
            this._attributeName = attributeViewInfo.name;
            this._attributeType = attributeViewInfo.type;
            this.label = new eui.Label();
            this.label.width = 100;
            this.addChild(this.label);
            this.text = new eui.TextInput();
            this.text.x = 100;
            this.text.width = 100;
            this.addChild(this.text);
            this.text.enabled = attributeViewInfo.writable;
            this.updateView();
        }
        get space() {
            return this._space;
        }
        set space(value) {
            this._space = value;
            this.updateView();
        }
        get attributeName() {
            return this._attributeName;
        }
        get attributeValue() {
            return this._space[this._attributeName];
        }
        set attributeValue(value) {
            if (this._space[this._attributeName] != value) {
                this._space[this._attributeName] = value;
            }
            this.updateView();
        }
        /**
         * 更新界面
         */
        updateView() {
            this.label.text = this._attributeName + ":";
            this.text.text = String(this.attributeValue);
        }
    }
    feng3d.DefaultObjectAttributeView = DefaultObjectAttributeView;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 默认对象属性块界面
     * @author feng 2016-3-22
     */
    class DefaultObjectBlockView extends eui.Group {
        /**
         * @inheritDoc
         */
        constructor(blockViewInfo) {
            super();
            var hLayout = new eui.VerticalLayout();
            hLayout.gap = 10;
            hLayout.paddingTop = 30;
            hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
            this.layout = hLayout;
            this._space = blockViewInfo.owner;
            this._blockName = blockViewInfo.name;
            this.itemList = blockViewInfo.itemList;
            this.$updateView();
        }
        initView() {
            var h = 0;
            if (this._blockName != null && this._blockName.length > 0) {
                var blockTitle = new eui.Label();
                //			label.height = 50;
                blockTitle.width = 100;
                blockTitle.textColor = 0xff0000;
                blockTitle.text = this._blockName;
                this.addChild(blockTitle);
                h = blockTitle.x + blockTitle.height + 2;
            }
            this.attributeViews = [];
            var objectAttributeInfos = this.itemList;
            for (var i = 0; i < objectAttributeInfos.length; i++) {
                var displayObject = feng3d.ObjectView.getAttributeView(objectAttributeInfos[i]);
                displayObject.y = h;
                this.addChild(displayObject);
                h += displayObject.height + 2;
                this.attributeViews.push(displayObject);
            }
            this.isInitView = true;
        }
        get space() {
            return this._space;
        }
        set space(value) {
            this._space = value;
            for (var i = 0; i < this.attributeViews.length; i++) {
                this.attributeViews[i].space = this._space;
            }
            this.$updateView();
        }
        get blockName() {
            return this._blockName;
        }
        /**
         * 更新自身界面
         */
        $updateView() {
            if (!this.isInitView) {
                this.initView();
            }
        }
        updateView() {
            this.$updateView();
            for (var i = 0; i < this.attributeViews.length; i++) {
                this.attributeViews[i].updateView();
            }
        }
        getAttributeView(attributeName) {
            for (var i = 0; i < this.attributeViews.length; i++) {
                if (this.attributeViews[i].attributeName == attributeName) {
                    return this.attributeViews[i];
                }
            }
            return null;
        }
    }
    feng3d.DefaultObjectBlockView = DefaultObjectBlockView;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 默认使用块的对象界面
     * @author feng 2016-3-22
     */
    class DefaultObjectView extends eui.Group {
        /**
         * 对象界面数据
         */
        constructor(objectViewInfo) {
            super();
            var hLayout = new eui.VerticalLayout();
            hLayout.gap = 10;
            hLayout.paddingTop = 30;
            hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
            this.layout = hLayout;
            this._objectViewInfo = objectViewInfo;
            this._space = objectViewInfo.owner;
            this.blockViews = [];
            var h = 0;
            var objectBlockInfos = this._objectViewInfo.getObjectBlockInfos();
            for (var i = 0; i < objectBlockInfos.length; i++) {
                var displayObject = feng3d.ObjectView.getBlockView(objectBlockInfos[i]);
                displayObject.y = h;
                this.addChild(displayObject);
                h += displayObject.height + 2;
                this.blockViews.push(displayObject);
            }
            this.$updateView();
        }
        get space() {
            return this._space;
        }
        set space(value) {
            this._space = value;
            for (var i = 0; i < this.blockViews.length; i++) {
                this.blockViews[i].space = this._space;
            }
            this.$updateView();
        }
        /**
         * 更新界面
         */
        updateView() {
            this.$updateView();
            for (var i = 0; i < this.blockViews.length; i++) {
                this.blockViews[i].updateView();
            }
        }
        /**
         * 更新自身界面
         */
        $updateView() {
        }
        getblockView(blockName) {
            for (var i = 0; i < this.blockViews.length; i++) {
                if (this.blockViews[i].blockName == blockName) {
                    return this.blockViews[i];
                }
            }
            return null;
        }
        getAttributeView(attributeName) {
            for (var i = 0; i < this.blockViews.length; i++) {
                var attributeView = this.blockViews[i].getAttributeView(attributeName);
                if (attributeView != null) {
                    return attributeView;
                }
            }
            return null;
        }
    }
    feng3d.DefaultObjectView = DefaultObjectView;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    class ObjectViewEvent extends egret.Event {
        constructor(type, bubbles = false, cancelable = false) {
            super(type, bubbles, cancelable);
        }
        toString() {
            return "[{0} type=\"{1}\" space=\"{2}\"  attributeName=\"{3}\" attributeValue={4}]".replace("{0}", egret.getQualifiedClassName(this).split("::").pop()).replace("{1}", this.type).replace("{2}", egret.getQualifiedClassName(this).split("::").pop()).replace("{3}", this.attributeName).replace("{4}", JSON.stringify(this.attributeValue));
        }
    }
    feng3d.ObjectViewEvent = ObjectViewEvent;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    feng3d.$objectViewConfig = {
        defaultBaseObjectViewClass: feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultBaseObjectView),
        defaultObjectViewClass: feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultObjectView),
        defaultObjectAttributeViewClass: feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultObjectAttributeView),
        defaultObjectAttributeBlockView: feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultObjectBlockView),
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
         * @param object	用于生成界面的对象
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
         */
        static getAttributeView(attributeViewInfo) {
            if (attributeViewInfo.component == null || attributeViewInfo.component == "") {
                var defaultViewClass = ObjectView.getAttributeDefaultViewClass(attributeViewInfo.type);
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
         * @param owner		所属对象
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
            var objectInfo = new feng3d.ObjectViewInfo();
            var classConfig = ObjectView.getClassConfig(object);
            if (classConfig) {
                feng3d.ObjectUtils.deepCopy(objectInfo, classConfig);
            }
            objectInfo.name = className;
            objectInfo.owner = object;
            return objectInfo;
        }
        static getAttributeViewInfo(owner, attributeName) {
            var attributeDefinition = ObjectView.getAttributeDefinition(owner, attributeName);
            var objectAttributeInfo = new feng3d.AttributeViewInfo();
            objectAttributeInfo.name = attributeName;
            objectAttributeInfo.block = attributeDefinition ? attributeDefinition.block : "";
            objectAttributeInfo.component = attributeDefinition ? attributeDefinition.component : "";
            objectAttributeInfo.componentParam = attributeDefinition ? attributeDefinition.componentParam : null;
            objectAttributeInfo.owner = owner;
            var propertyDescriptor = Object.getOwnPropertyDescriptor(owner, objectAttributeInfo.name);
            if (propertyDescriptor != null) {
                objectAttributeInfo.writable = propertyDescriptor.writable;
            }
            else {
                objectAttributeInfo.writable = true;
            }
            objectAttributeInfo.type = feng3d.ClassUtils.getQualifiedClassName(owner[objectAttributeInfo.name]);
            return objectAttributeInfo;
        }
        static getAttributeDefinition(owner, attributeName) {
            var classConfig = ObjectView.getClassConfig(owner);
            if (!classConfig)
                return null;
            for (var i = 0; i < classConfig.attributeDefinitionVec.length; i++) {
                var attributeDefinition = classConfig.attributeDefinitionVec[i];
                if (attributeDefinition.name == attributeName)
                    return attributeDefinition;
            }
            return null;
        }
        static setCustomObjectViewClass(owner, viewClass) {
            var classConfig = ObjectView.getClassConfig(owner);
            classConfig.component = feng3d.ClassUtils.getQualifiedClassName(viewClass);
        }
        /**
         * 获取对象属性块定义
         * @param blockName		属性名称
         * @param autoCreate	是否自动生成
         * @return
         */
        static getBlockDefinition(owner, blockName) {
            var classConfig = ObjectView.getClassConfig(owner);
            if (!classConfig)
                return null;
            var blockDefinition;
            classConfig.blockDefinitionVec.forEach(element => {
                if (element.name == blockName) {
                    blockDefinition = element;
                }
            });
            return blockDefinition;
        }
        /**
         * 获取ObjectView类配置
         * @param object				对象
         * @param autoCreate			是否自动创建
         * @return
         */
        static getClassConfig(object) {
            var className = object;
            if (typeof object != "string") {
                className = feng3d.ClassUtils.getQualifiedClassName(object);
            }
            var classConfig = feng3d.$objectViewConfig.classConfigVec[className];
            return classConfig;
        }
        /**
         * 获取特定类型的默认属性界面定义
         * @param attributeClass		属性类型
         * @param autoCreate			是否自动创建
         * @return
         */
        static getAttributeDefaultViewClass(attributeClass) {
            var type = attributeClass;
            if (typeof attributeClass != "string") {
                type = feng3d.ClassUtils.getQualifiedClassName(attributeClass);
            }
            var obj = feng3d.$objectViewConfig.attributeDefaultViewClassByTypeVec[type];
            return obj;
        }
        static init() {
            objectViewConfigData = {};
            objectViewConfigData.defaultBaseObjectViewClass = feng3d.$objectViewConfig.defaultBaseObjectViewClass || feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultBaseObjectView);
            objectViewConfigData.defaultObjectViewClass = feng3d.$objectViewConfig.defaultObjectViewClass || feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultObjectView);
            objectViewConfigData.defaultObjectAttributeViewClass = feng3d.$objectViewConfig.defaultObjectAttributeViewClass || feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultObjectAttributeView);
            objectViewConfigData.defaultObjectAttributeBlockView = feng3d.$objectViewConfig.defaultObjectAttributeBlockView || feng3d.ClassUtils.getQualifiedClassName(feng3d.DefaultObjectBlockView);
            feng3d.$objectViewConfig.classConfigVec;
        }
    }
    feng3d.ObjectView = ObjectView;
    var objectViewConfigData;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=objectview.js.map