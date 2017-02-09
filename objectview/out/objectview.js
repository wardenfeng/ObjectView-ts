var feng3d;
(function (feng3d) {
    feng3d.DisplayObject = laya.display.Sprite;
    feng3d.Sprite = laya.display.Sprite;
    feng3d.TextField = laya.display.Text;
})(feng3d || (feng3d = {}));
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
     * 类工具
     * @author feng 2015-4-27
     */
    class ClassUtils {
        /**
         * 获取类名称（字符串直接返回）
         * @param obj
         * @return
         */
        static getClassName(obj) {
            if (typeof obj == "string") {
                return obj;
            }
            var className = feng3d.getClassName(obj);
            if (className == "null" || className == "void") {
                return "";
            }
            return className;
        }
        /**
         * 获取类定义
         * @param obj
         * @return
         */
        static getClass(obj) {
            var className = this.getClassName(obj);
            try {
                return getDefinitionByName(className);
            }
            catch (error) {
            }
            return null;
        }
        /**
         * 获取类实例			（不支持构造函数中有参数）
         * @param obj
         * @return
         */
        static getInstance(obj) {
            var cls = this.getClass(obj);
            try {
                var instance = new cls();
            }
            catch (error) {
                return null;
            }
            return instance;
        }
        /**
         * 获取对象（类）属性列表
         * @param object		指定对象（类）
         * @return 				属性列表
         */
        static getAttributeList(object) {
            var objectAttributeInfos = this.getAttributeInfoList(object);
            var attributes = [];
            for (var i = 0; i < objectAttributeInfos.length; i++) {
                attributes.push(objectAttributeInfos[i].name);
            }
            return attributes;
        }
        /**
         * 获取对象（类）所有属性信息列表 （注:不支持内部类）
         * @param object		指定对象（类）
         * @return 				属性信息列表
         */
        static getAttributeInfoList(object) {
            var objectAttributeInfos = [];
            var cls = ClassUtils.getClass(object);
            var describeInfo = describeTypeInstance(cls);
            var variables = describeInfo.traits.variables;
            var i = 0;
            for (i = 0; variables != null && i < variables.length; i++) {
                var variable = variables[i];
                objectAttributeInfos.push(new feng3d.AttributeInfo(variable.name, variable.type, variable.access));
            }
            var accessors = describeInfo.traits.accessors;
            for (i = 0; accessors != null && i < accessors.length; i++) {
                var accessor = accessors[i];
                objectAttributeInfos.push(new feng3d.AttributeInfo(accessor.name, accessor.type, accessor.access));
            }
            if (!(object))
                feng3d.is;
            Class;
            {
                for (var name in object) {
                    objectAttributeInfos.push(new feng3d.AttributeInfo(name, ClassUtils.getClassName(object[name]), feng3d.AccessType.readwrite));
                }
            }
            return objectAttributeInfos;
        }
        /**
         * 获取属性信息
         * @param object			属性所属对象
         * @param attribute			属性名称
         * @return
         */
        static getAttributeInfo(object, attribute) {
            var objectAttributeInfos = this.getAttributeInfoList(object);
            for (var i = 0; i < objectAttributeInfos.length; i++) {
                if (objectAttributeInfos[i].name == attribute)
                    return objectAttributeInfos[i];
            }
            return null;
        }
    }
    feng3d.ClassUtils = ClassUtils;
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
        constructor(name = "", type = "", access = "") {
            this.name = name;
            this.type = type;
            this.access = access;
        }
        /**
         * 设置数据
         * @param data
         */
        setData(data) {
            feng3d.ClassUtils.deepCopy(this, data);
            return this;
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
     * 定义属性
     * @author feng 2016-3-23
     */
    class AttributeDefinition {
        constructor() {
            /**
             * 属性名称
             */
            this.name = "";
            /**
             * 所属块名称
             */
            this.block = "";
            /**
             * 组件
             */
            this.component = "";
        }
        /**
         * 设置所在块名称
         */
        setBlock(block) {
            this.block = block;
            return this;
        }
        /**
         * 设置属性组件
         */
        setComponent(component) {
            this.component = feng3d.ClassUtils.getClassName(component);
            return this;
        }
        /**
         * 设置属性组件
         */
        setComponentParam(param) {
            this.componentParam = param;
            return this;
        }
    }
    feng3d.AttributeDefinition = AttributeDefinition;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 定义特定属性类型默认界面
     * @author feng 2016-3-25
     */
    class AttributeTypeDefinition {
        /**
         * 设置组件
         */
        setComponent(component) {
            this.component = feng3d.ClassUtils.getClassName(component);
            return this;
        }
        /**
         * 设置属性组件
         */
        setComponentParam(param) {
            this.componentParam = param;
            return this;
        }
    }
    feng3d.AttributeTypeDefinition = AttributeTypeDefinition;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 块定义
     * @author feng 2016-3-23
     */
    class BlockDefinition {
        constructor() {
            /**
             * 块名称
             */
            this.name = "";
            /**
             * 组件
             */
            this.component = "";
        }
        /**
         * 设置显示组件
         * @param component					组件
         */
        setComponent(component) {
            this.component = feng3d.ClassUtils.getClassName(component);
            return this;
        }
        /**
         * 设置属性组件
         */
        setComponentParam(param) {
            this.componentParam = param;
            return this;
        }
    }
    feng3d.BlockDefinition = BlockDefinition;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * ObjectView类配置
     * @author feng 2016-3-23
     */
    class ClassDefinition {
        constructor() {
            /**
             * 类名
             */
            this.name = "";
            /**
             * 组件
             */
            this.component = "";
            /**
             * 自定义对象属性定义字典（key:属性名,value:属性定义）
             */
            this.attributeDefinitionVec = [];
            /**
             * 自定义对象属性块界面类定义字典（key:属性块名称,value:自定义对象属性块界面类定义）
             */
            this.blockDefinitionVec = [];
        }
        /**
         * 设置自定义对象界面类定义
         * @param viewClass				自定义对象界面类定义（该类必须是实现IObjectView接口并且是DisplayObject的子类）
         */
        setCustomObjectViewClass(viewClass) {
            this.component = feng3d.ClassUtils.getClassName(viewClass);
        }
        /**
         * 获取自定义对象属性定义
         * @param attributeName			属性名称
         * @param autoCreate			是否自动生成
         * @return
         */
        getAttributeDefinition(attributeName, autoCreate = true) {
            var attributeDefinition;
            this.attributeDefinitionVec.forEach(element => {
                if (element.name == attributeName) {
                    return element;
                }
            });
            attributeDefinition = new feng3d.AttributeDefinition();
            attributeDefinition.name = attributeName;
            if (autoCreate) {
                this.attributeDefinitionVec.push(attributeDefinition);
            }
            return attributeDefinition;
        }
        /**
         * 获取对象属性块定义
         * @param blockName		属性名称
         * @param autoCreate	是否自动生成
         * @return
         */
        getBlockDefinition(blockName, autoCreate = true) {
            var blockDefinition;
            this.blockDefinitionVec.forEach(element => {
                if (element.name == blockName) {
                    return element;
                }
            });
            blockDefinition = new feng3d.BlockDefinition();
            blockDefinition.name = blockName;
            if (autoCreate) {
                this.blockDefinitionVec.push(blockDefinition);
            }
            return blockDefinition;
        }
        /**
         * 设置类配置
         * @param config
         */
        setConfig(config) {
            //清理数据
            feng3d.ClassUtils.deepCopy(this, feng3d.ClassUtils.getInstance(this));
            //设置数据
            feng3d.ClassUtils.deepCopy(this, config);
        }
        /**
         * 初始化默认定义
         * @param object
         * @return
         */
        initDefault(object) {
            this.attributeDefinitionVec.length = 0;
            this.blockDefinitionVec.length = 0;
            var attributes = Object.keys(object);
            attributes = attributes.sort(feng3d.SortCompare.stringCompare);
            for (var i = 0; i < attributes.length; i++) {
                this.getAttributeDefinition(attributes[i]);
            }
            this.getBlockDefinition("");
            return this;
        }
    }
    feng3d.ClassDefinition = ClassDefinition;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 对象界面事件
     * @author feng 2016-4-19
     */
    class ObjectViewEvent extends feng3d.Event {
        /**
         * 构建
         */
        constructor(type, bubbles = false, cancelable = false) {
            super(type, bubbles, cancelable);
        }
        toString() {
            return "[{0} type=\"{1}\" space=\"{2}\"  attributeName=\"{3}\" attributeValue={4}]" //
                .replace("{0}", getQualifiedClassName(this).split("::").pop()) //
                .replace("{1}", type) //
                .replace("{2}", getQualifiedClassName(this).split("::").pop()) //
                .replace("{3}", this.attributeName) //
                .replace("{4}", JSON.stringify(this.attributeValue)) //
            ;
        }
    }
    /**
     * 属性值变化时间
     */
    ObjectViewEvent.VALUE_CHANGE = "valueChange";
    feng3d.ObjectViewEvent = ObjectViewEvent;
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
        /**
         * 是否可编辑
         */
        isEditable() {
            return this.access != feng3d.AccessType.readonly;
        }
        /**
         * 是否可读
         */
        canRead() {
            return this.access == feng3d.AccessType.readonly || this.access == feng3d.AccessType.readwrite;
        }
        /**
         * 初始化组件
         */
        initComponent() {
            if (this.component != null && this.component != "")
                return;
            var defaultViewClass = feng3d.ObjectViewConfig.instance.getAttributeDefaultViewClass(this.type, false);
            var tempComponent = defaultViewClass ? defaultViewClass.component : "";
            if (tempComponent != null && tempComponent != "") {
                this.component = defaultViewClass.component;
                this.componentParam = defaultViewClass.componentParam;
                return;
            }
            //返回默认对象属性界面类定义
            this.component = feng3d.ObjectViewConfig.instance.defaultObjectAttributeViewClass;
            this.componentParam = null;
        }
        /**
         * 获取界面
         */
        getView() {
            this.initComponent();
            var cls = feng3d.ClassUtils.getClass(this.component);
            var view = new cls(this);
            return view;
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
        /**
         * 构建一个对象属性块
         */
        constructor() {
            /**
             * 块名称
             */
            this.name = "";
            /**
             * 组件
             */
            this.component = "";
            this.name = "";
            this.itemList = [];
        }
        /**
         * 获取对象属性块界面类定义
         * @param objectAttributeBlock		对象属性快信息
         * @return							对象属性块界面类定义
         */
        initComponent() {
            if (this.component != null && this.component != "")
                return;
            //返回默认对象属性界面类定义
            this.component = feng3d.ObjectViewConfig.instance.defaultObjectAttributeBlockView;
            this.componentParam = null;
        }
        /**
         * 获取界面
         * @param owner		所属对象
         * @return
         */
        getView() {
            this.initComponent();
            var cls = feng3d.ClassUtils.getClass(this.component);
            var view = new cls(this);
            return view;
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
                //获取属性信息列表
                var attributes;
                if (this.owner != null) {
                    attributes = feng3d.ClassUtils.getAttributeInfoList(this.owner);
                }
                else {
                    attributes = feng3d.ClassUtils.getAttributeInfoList(name);
                }
                attributes.sort(feng3d.AttributeInfo.compare);
                //收集对象属性信息
                var dic = {};
                var tempInfos = [];
                var objectAttributeInfo;
                var i;
                for (i = 0; i < attributes.length; i++) {
                    var attributeInfo = attributes[i];
                    objectAttributeInfo = new feng3d.AttributeViewInfo();
                    objectAttributeInfo.owner = this.owner;
                    feng3d.ClassUtils.deepCopy(objectAttributeInfo, attributeInfo);
                    dic[objectAttributeInfo.name] = objectAttributeInfo;
                    tempInfos.push(objectAttributeInfo);
                }
                var classConfig = feng3d.ObjectViewConfig.instance.getClassConfig(name, false);
                //				if(classConfig == null)
                //				{
                //					classConfig = ObjectViewConfig.instance.createDefaultClassConfig(name);
                //				}
                if (classConfig != null) {
                    //根据配置中默认顺序生产对象属性信息列表
                    this.objectAttributeInfos = [];
                    var attributeDefinitions = classConfig.attributeDefinitionVec;
                    for (i = 0; i < attributeDefinitions.length; i++) {
                        objectAttributeInfo = dic[attributeDefinitions[i].name];
                        if (objectAttributeInfo != null) {
                            feng3d.ClassUtils.deepCopy(objectAttributeInfo, attributeDefinitions[i]);
                            this.objectAttributeInfos.push(objectAttributeInfo);
                        }
                    }
                }
                else {
                    this.objectAttributeInfos = tempInfos.concat();
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
            var classConfig = feng3d.ObjectViewConfig.instance.getClassConfig(name, false);
            if (classConfig != null) {
                for (i = 0; i < classConfig.blockDefinitionVec.length; i++) {
                    blockDefinition = classConfig.blockDefinitionVec[i];
                    objectBlockInfo = dic[blockDefinition.name];
                    if (objectBlockInfo == null) {
                        objectBlockInfo = new feng3d.BlockViewInfo();
                        objectBlockInfo.name = blockDefinition.name;
                        objectBlockInfo.owner = this.owner;
                    }
                    feng3d.ClassUtils.deepCopy(objectBlockInfo, blockDefinition);
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
        /**
         * 获取对象界面类定义
         * @param object		用于生成界面的对象
         * @return				对象界面类定义
         */
        initComponent() {
            //获取自定义类型界面类定义
            if (this.component != null && this.component != "")
                return;
            //返回基础类型界面类定义
            var isBaseType = feng3d.ClassUtils.isBaseType(this.owner);
            if (isBaseType) {
                this.component = feng3d.ObjectViewConfig.instance.defaultBaseObjectViewClass;
                return;
            }
            //返回默认类型界面类定义
            this.component = feng3d.ObjectViewConfig.instance.defaultObjectViewClass;
        }
        /**
         * 获取界面
         */
        getView() {
            this.initComponent();
            var cls = feng3d.ClassUtils.getClass(this.component);
            var view = new cls(this);
            return view;
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
    class DefaultBaseObjectView extends feng3d.TextField {
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
    class DefaultObjectAttributeView extends feng3d.Sprite {
        constructor(attributeViewInfo) {
            super();
            this._space = attributeViewInfo.owner;
            this._attributeName = attributeViewInfo.name;
            this._attributeType = attributeViewInfo.type;
            this.label = new feng3d.TextField();
            //			label.height = 50;
            this.label.width = 100;
            this.label.height = 20;
            this.addChild(this.label);
            this.text = new feng3d.TextField();
            this.text.bold = true;
            this.text.x = 100;
            this.text.height = 20;
            this.text.width = 100;
            this.addChild(this.text);
            this.graphics.drawRect(0, 0, 200, 24, 0x999999);
            this.text.mouseEnabled = attributeViewInfo.isEditable();
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
                //派发属性值修改事件
                var objectViewEvent = new feng3d.ObjectViewEvent(feng3d.ObjectViewEvent.VALUE_CHANGE, true);
                objectViewEvent.space = this._space;
                objectViewEvent.attributeName = this._attributeName;
                objectViewEvent.attributeValue = this.attributeValue;
                this.dispatchEvent(objectViewEvent);
            }
            this.updateView();
        }
        onFocusOut(event) {
            if (this.textTemp != this.text.text) {
                var cls = getDefinitionByName(this._attributeType);
                this.attributeValue = cls(this.text.text);
                if (cls == Boolean && (this.text.text == "0" || this.text.text == "false")) {
                    this.attributeValue = false;
                }
            }
            this.textTemp = null;
        }
        onFocusIn(event) {
            this.textTemp = this.text.text;
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
    class DefaultObjectBlockView extends feng3d.Sprite {
        /**
         * @inheritDoc
         */
        constructor(blockViewInfo) {
            super();
            this._space = blockViewInfo.owner;
            this._blockName = blockViewInfo.name;
            this.itemList = blockViewInfo.itemList;
            this.$updateView();
        }
        initView() {
            var h = 0;
            if (this._blockName != null && this._blockName.length > 0) {
                var blockTitle = new feng3d.TextField();
                //			label.height = 50;
                blockTitle.width = 100;
                blockTitle.height = 20;
                blockTitle.color = "#ff0000";
                blockTitle.text = this._blockName;
                this.addChild(blockTitle);
                h = blockTitle.x + blockTitle.height + 2;
            }
            this.attributeViews = [];
            var objectAttributeInfos = this.itemList;
            for (var i = 0; i < objectAttributeInfos.length; i++) {
                if (!objectAttributeInfos[i].canRead())
                    continue;
                var displayObject = objectAttributeInfos[i].getView();
                displayObject.y = h;
                this.addChild(displayObject);
                h += displayObject.height + 2;
                this.attributeViews.push(displayObject);
            }
            this.graphics.clear();
            this.graphics.drawRect(0, 0, 200, h, 0x666666, 0x00ff00);
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
    class DefaultObjectView extends feng3d.Sprite {
        /**
         * 对象界面数据
         */
        constructor(objectViewInfo) {
            super();
            this._objectViewInfo = objectViewInfo;
            this._space = objectViewInfo.owner;
            this.blockViews = [];
            var h = 0;
            var objectBlockInfos = this._objectViewInfo.getObjectBlockInfos();
            for (var i = 0; i < objectBlockInfos.length; i++) {
                var displayObject = objectBlockInfos[i].getView();
                displayObject.y = h;
                this.addChild(displayObject);
                h += displayObject.height + 2;
                this.blockViews.push(displayObject);
            }
            this.graphics.clear();
            this.graphics.drawRect(0, 0, 200, h, 0x666666);
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
    /**
     * ObjectView总配置数据
     * @author feng 2016-3-23
     */
    class ObjectViewConfig {
        constructor() {
            /**
             * 默认基础类型对象界面类定义
             */
            this.defaultBaseObjectViewClass = feng3d.ClassUtils.getClassName(feng3d.DefaultBaseObjectView);
            /**
             * 默认对象界面类定义
             */
            this.defaultObjectViewClass = feng3d.ClassUtils.getClassName(feng3d.DefaultObjectView);
            /**
             * 默认对象属性界面类定义
             */
            this.defaultObjectAttributeViewClass = feng3d.ClassUtils.getClassName(feng3d.DefaultObjectAttributeView);
            /**
             * 属性块默认界面
             */
            this.defaultObjectAttributeBlockView = feng3d.ClassUtils.getClassName(feng3d.DefaultObjectBlockView);
            /**
             * 指定属性类型界面类定义字典（key:属性类名称,value:属性界面类定义）
             */
            this.attributeDefaultViewClassByTypeVec = [];
            /**
             * ObjectView类配置字典 （key：类名称，value：ObjectView类配置）
             */
            this.classConfigVec = [];
        }
        static get instance() {
            if (ObjectViewConfig._instance == null) {
                ObjectViewConfig._instance = new ObjectViewConfig();
            }
            return ObjectViewConfig._instance;
        }
        /**
         * 获取ObjectView类配置
         * @param object				对象
         * @param autoCreate			是否自动创建
         * @return
         */
        getClassConfig(object, autoCreate = true) {
            var className = feng3d.ClassUtils.getClassName(object);
            var classConfig;
            this.classConfigVec.forEach(element => {
                if (element.name == className) {
                    return element;
                }
            });
            if (autoCreate) {
                classConfig = new feng3d.ClassDefinition();
                classConfig.name = className;
                this.classConfigVec.push(classConfig);
                return classConfig;
            }
            return null;
        }
        /**
         * 获取特定类型的默认属性界面定义
         * @param attributeClass		属性类型
         * @param autoCreate			是否自动创建
         * @return
         */
        getAttributeDefaultViewClass(attributeClass, autoCreate = true) {
            var type = feng3d.ClassUtils.getClassName(attributeClass);
            var obj;
            this.attributeDefaultViewClassByTypeVec.forEach(element => {
                if (element.type == type) {
                    return element;
                }
            });
            if (autoCreate) {
                obj = new feng3d.AttributeTypeDefinition();
                obj.type = type;
                this.attributeDefaultViewClassByTypeVec.push(obj);
                return obj;
            }
            return null;
        }
        /**
         * 设置类配置
         * @param config
         */
        setConfig(config) {
            this.clearConfig();
            //设置数据
            feng3d.ClassUtils.deepCopy(this, config);
        }
        /**
         * 清理数据
         */
        clearConfig() {
            feng3d.ClassUtils.deepCopy(this, feng3d.ClassUtils.getInstance(this));
        }
    }
    feng3d.ObjectViewConfig = ObjectViewConfig;
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
            var view = classConfig.getView();
            return view;
        }
        /**
         * 获取对象信息
         * @param object
         * @return
         */
        static getObjectInfo(object) {
            var className = feng3d.ClassUtils.getClassName(object);
            var objectInfo = new feng3d.ObjectViewInfo();
            var classConfig = feng3d.ObjectViewConfig.instance.getClassConfig(object, false);
            feng3d.ClassUtils.deepCopy(objectInfo, classConfig);
            objectInfo.name = className;
            objectInfo.owner = object;
            return objectInfo;
        }
    }
    feng3d.ObjectView = ObjectView;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=objectview.js.map