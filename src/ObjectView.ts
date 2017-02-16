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
			var view = classConfig.getView();
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

			var classConfig: ClassDefinition;
			ObjectViewConfig.instance.classConfigVec.forEach(element => {
				if (element.name == className) {
					classConfig = element;
				}
			});
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
			var obj: AttributeTypeDefinition;
			ObjectViewConfig.instance.attributeDefaultViewClassByTypeVec.forEach(element => {
				if (element.type == type) {
					obj = element;
				}
			});
			return obj;
		}
	}
}
