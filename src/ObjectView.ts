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
			var className = getClassName(object);
			var objectInfo: ObjectViewInfo = new ObjectViewInfo();

			var classConfig: ClassDefinition = ObjectViewConfig.instance.getClassConfig(object, false);
			if (classConfig) {
				deepCopy(objectInfo, classConfig);
			}

			objectInfo.name = className;
			objectInfo.owner = object;
			return objectInfo;
		}

		public static getClass(className: string) {

			return ObjectView.viewClass[className];
		}

		private static _viewClass: { [className: string]: any };
		private static get viewClass() {

			var viewClassList = [DefaultBaseObjectView, DefaultObjectAttributeView, DefaultObjectBlockView, DefaultObjectView];

			if (!ObjectView._viewClass) {
				ObjectView._viewClass = {};
				viewClassList.forEach(element => {
					ObjectView._viewClass[getClassName(element)] = element;
				});
			}
			return ObjectView._viewClass;
		}
	}
}
