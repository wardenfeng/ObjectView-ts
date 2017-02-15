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

			var classConfig: ClassDefinition = ObjectViewConfig.instance.getClassConfig(object, false);
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

			var classConfig: ClassDefinition = ObjectViewConfig.instance.getClassConfig(owner);
			if (!classConfig)
				return null;
			for (var i = 0; i < classConfig.attributeDefinitionVec.length; i++) {
				var attributeDefinition: AttributeDefinition = classConfig.attributeDefinitionVec[i];
				if (attributeDefinition.name == attributeName)
					return attributeDefinition;
			}
			return null;
		}
	}
}
