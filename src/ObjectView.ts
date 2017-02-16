module feng3d {
	/**
	 * 对象界面
	 * @author feng 2016-3-10
	 */
	export class ObjectView {
		/**
		 * 获取对象界面
		 * @param object	用于生成界面的对象
		 */
		public static getObjectView(object: Object): egret.DisplayObject {

			var classConfig: ObjectViewInfo = ObjectView.getObjectInfo(object);

			if (classConfig.component == null || classConfig.component == "") {

				//返回基础类型界面类定义
				if (ClassUtils.isBaseType(classConfig.owner)) {
					classConfig.component = $objectViewConfig.defaultBaseObjectViewClass;
				}
			}
			if (classConfig.component == null || classConfig.component == "") {

				//使用默认类型界面类定义
				classConfig.component = $objectViewConfig.defaultObjectViewClass;
			}

			var cls = ClassUtils.getDefinitionByName(classConfig.component);
			var view = new cls(classConfig)
			return view;
		}

		/**
		 * 获取属性界面
		 */
		public static getAttributeView(attributeViewInfo: AttributeViewInfo): egret.DisplayObject {

			if (attributeViewInfo.component == null || attributeViewInfo.component == "") {

				var defaultViewClass: AttributeTypeDefinition = ObjectView.getAttributeDefaultViewClass(attributeViewInfo.type);
				var tempComponent = defaultViewClass ? defaultViewClass.component : "";
				if (tempComponent != null && tempComponent != "") {
					attributeViewInfo.component = defaultViewClass.component;
					attributeViewInfo.componentParam = defaultViewClass.componentParam;
				}
			}

			if (attributeViewInfo.component == null || attributeViewInfo.component == "") {

				//使用默认对象属性界面类定义
				attributeViewInfo.component = $objectViewConfig.defaultObjectAttributeViewClass;
				attributeViewInfo.componentParam = null;
			}

			var cls = ClassUtils.getDefinitionByName(attributeViewInfo.component);
			var view = new cls(attributeViewInfo);
			return view;
		}

		/**
		 * 获取块界面
		 * @param owner		所属对象
		 */
		public static getBlockView(blockViewInfo: BlockViewInfo): egret.DisplayObject {

			if (blockViewInfo.component == null || blockViewInfo.component == "") {

				//返回默认对象属性界面类定义
				blockViewInfo.component = $objectViewConfig.defaultObjectAttributeBlockView;
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
		private static getObjectInfo(object: Object): ObjectViewInfo {
			var className = ClassUtils.getQualifiedClassName(object);
			var objectInfo: ObjectViewInfo = new ObjectViewInfo();

			var classConfig: ClassDefinition = ObjectView.getClassConfig(object);
			if (classConfig) {
				ObjectUtils.deepCopy(objectInfo, classConfig);
			}

			objectInfo.name = className;
			objectInfo.owner = object;
			return objectInfo;
		}

		public static getAttributeViewInfo(owner: Object, attributeName: string) {

			var attributeDefinition: AttributeDefinition = ObjectView.getAttributeDefinition(owner, attributeName);
			var objectAttributeInfo = new AttributeViewInfo();
			objectAttributeInfo.name = attributeName;
			objectAttributeInfo.block = attributeDefinition ? attributeDefinition.block : "";
			objectAttributeInfo.component = attributeDefinition ? attributeDefinition.component : "";
			objectAttributeInfo.componentParam = attributeDefinition ? attributeDefinition.componentParam : null;
			objectAttributeInfo.owner = owner;
			var propertyDescriptor = Object.getOwnPropertyDescriptor(owner, objectAttributeInfo.name);
			if (propertyDescriptor != null) {
				objectAttributeInfo.writable = propertyDescriptor.writable;
			} else {
				objectAttributeInfo.writable = true;
			}
			objectAttributeInfo.type = ClassUtils.getQualifiedClassName(owner[objectAttributeInfo.name]);
			return objectAttributeInfo;
		}

		public static getAttributeDefinition(owner: Object, attributeName: string) {

			var classConfig: ClassDefinition = ObjectView.getClassConfig(owner);
			if (!classConfig)
				return null;
			for (var i = 0; i < classConfig.attributeDefinitionVec.length; i++) {
				var attributeDefinition: AttributeDefinition = classConfig.attributeDefinitionVec[i];
				if (attributeDefinition.name == attributeName)
					return attributeDefinition;
			}
			return null;
		}

		public static setCustomObjectViewClass(owner: Object, viewClass: any) {

			var classConfig: ClassDefinition = ObjectView.getClassConfig(owner);
			classConfig.component = ClassUtils.getQualifiedClassName(viewClass);
		}

		/**
		 * 获取对象属性块定义
		 * @param blockName		属性名称
		 * @param autoCreate	是否自动生成
		 * @return
		 */
		public static getBlockDefinition(owner: Object, blockName: string): BlockDefinition {

			var classConfig: ClassDefinition = ObjectView.getClassConfig(owner);
			if (!classConfig)
				return null;

			var blockDefinition: BlockDefinition;
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
		public static getClassConfig(object: any): ClassDefinition {
			var className: string = object;
			if (typeof object != "string") {
				className = ClassUtils.getQualifiedClassName(object);
			}

			var classConfig: ClassDefinition = $objectViewConfig.classConfigVec[className];
			return classConfig;
		}

		/**
		 * 获取特定类型的默认属性界面定义
		 * @param attributeClass		属性类型
		 * @param autoCreate			是否自动创建
		 * @return
		 */
		public static getAttributeDefaultViewClass(attributeClass: any): AttributeTypeDefinition {
			var type: string = attributeClass;
			if (typeof attributeClass != "string") {
				type = ClassUtils.getQualifiedClassName(attributeClass);
			}
			var obj: AttributeTypeDefinition = $objectViewConfig.attributeDefaultViewClassByTypeVec[type];
			return obj;
		}

		public static init() {

			objectViewConfigData = <any>{};
			objectViewConfigData.defaultBaseObjectViewClass = $objectViewConfig.defaultBaseObjectViewClass || ClassUtils.getQualifiedClassName(DefaultBaseObjectView);
			objectViewConfigData.defaultObjectViewClass = $objectViewConfig.defaultObjectViewClass || ClassUtils.getQualifiedClassName(DefaultObjectView);
			objectViewConfigData.defaultObjectAttributeViewClass = $objectViewConfig.defaultObjectAttributeViewClass || ClassUtils.getQualifiedClassName(DefaultObjectAttributeView);
			objectViewConfigData.defaultObjectAttributeBlockView = $objectViewConfig.defaultObjectAttributeBlockView || ClassUtils.getQualifiedClassName(DefaultObjectBlockView);
			$objectViewConfig.classConfigVec
		}
	}

	var objectViewConfigData: ObjectViewConfigData;

	interface ObjectViewConfigData {
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
	}
}