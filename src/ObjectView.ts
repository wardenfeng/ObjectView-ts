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
			var className = getQualifiedClassName(object);
			var objectInfo: ObjectViewInfo = new ObjectViewInfo();

			var classConfig: ClassDefinition = ObjectViewConfig.instance.getClassConfig(object, false);
			if (classConfig) {
				deepCopy(objectInfo, classConfig);
			}

			objectInfo.name = className;
			objectInfo.owner = object;
			return objectInfo;
		}

		public static getAttributeInfoList(object: Object): AttributeInfo[] {
			var objectAttributeInfos: AttributeInfo[] = [];
			for (var attribute in object) {
				var propertyDescriptor = Object.getOwnPropertyDescriptor(object, attribute);
				objectAttributeInfos.push(new AttributeInfo(attribute, getQualifiedClassName(object[attribute]), propertyDescriptor.writable));
			}
			return objectAttributeInfos;
		}
	}
}
