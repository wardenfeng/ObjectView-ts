module feng3d {
	/**
	 * 对象属性信息
	 * @author feng 2016-3-10
	 */
	export class AttributeViewInfo {
		/**
		 * 属性名称
		 */
		public name: string;

		/**
		 * 属性类型
		 */
		public type: string;

		/**
		 * 是否可写
		 */
		public writable: boolean;

		/**
		 * 所属块名称
		 */
		public block = "";

		/**
		 * 组件
		 */
		public component = "";

		/**
		 * 组件参数
		 */
		public componentParam: Object;

		/**
		 * 属性所属对象
		 */
		public owner: Object;

		/**
		 * 初始化组件
		 */
		private initComponent(): void {
			if (this.component != null && this.component != "")
				return;

			var defaultViewClass: AttributeTypeDefinition = ObjectViewConfig.instance.getAttributeDefaultViewClass(this.type, false);
			var tempComponent = defaultViewClass ? defaultViewClass.component : "";
			if (tempComponent != null && tempComponent != "") {
				this.component = defaultViewClass.component;
				this.componentParam = defaultViewClass.componentParam;
				return;
			}

			//返回默认对象属性界面类定义
			this.component = ObjectViewConfig.instance.defaultObjectAttributeViewClass;
			this.componentParam = null;
		}

		/**
		 * 获取界面
		 */
		public getView(): egret.DisplayObject {
			this.initComponent();

			var cls = ClassUtils.getDefinitionByName(this.component);
			var view = new cls(this);
			return view;
		}
	}
}
