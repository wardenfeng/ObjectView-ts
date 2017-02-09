module feng3d {
	/**
	 * 块定义
	 * @author feng 2016-3-23
	 */
	export class BlockDefinition {
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
		 * 设置显示组件
		 * @param component					组件
		 */
		public setComponent(component: Object): BlockDefinition {
			this.component = ClassUtils.getClassName(component);
			return this;
		}

		/**
		 * 设置属性组件
		 */
		public setComponentParam(param: Object): BlockDefinition {
			this.componentParam = param;
			return this;
		}
	}
}
