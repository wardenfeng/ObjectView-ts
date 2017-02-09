module feng3d {


	/**
	 * 对象属性块
	 * @author feng 2016-3-22
	 */
	export class BlockViewInfo {
		/**
		 * 块名称
		 */
		public name = "";

		/**
		 * 组件
		 */
		public component = "";

		/**
		 * 组件参数
		 */
		public componentParam: Object;

		/**
		 * 属性信息列表
		 */
		public itemList: AttributeViewInfo[];

		/**
		 * 属性拥有者
		 */
		public owner: Object;

		/**
		 * 构建一个对象属性块
		 */
		constructor() {
			this.name = "";
			this.itemList = [];
		}

		/**
		 * 获取对象属性块界面类定义
		 * @param objectAttributeBlock		对象属性快信息
		 * @return							对象属性块界面类定义
		 */
		private initComponent(): void {
			if (this.component != null && this.component != "")
				return;

			//返回默认对象属性界面类定义
			this.component = ObjectViewConfig.instance.defaultObjectAttributeBlockView;
			this.componentParam = null;
		}

		/**
		 * 获取界面
		 * @param owner		所属对象
		 * @return
		 */
		public getView(): DisplayObject {
			this.initComponent();

			var cls: Class = ClassUtils.getClass(this.component);
			var view: DisplayObject = new cls(this);
			return view;
		}
	}
}
