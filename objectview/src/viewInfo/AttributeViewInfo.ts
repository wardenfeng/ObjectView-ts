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
		 * 访问类型
		 */
		public access: string;

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
		 * 是否可编辑
		 */
		public isEditable(): boolean {
			return this.access != AccessType.readonly;
		}

		/**
		 * 是否可读
		 */
		public canRead(): boolean {
			return this.access == AccessType.readonly || this.access == AccessType.readwrite;
		}

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
		public getView(): DisplayObject {
			this.initComponent();

			// var cls = ClassUtils.getClass(this.component);
			// var view: DisplayObject = new cls(this);
			// return view;
			return null;
		}
	}
}
