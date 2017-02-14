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

		public setComponent(component: any): BlockDefinition {
			this.component = getClassName(component);
			return this;
		}

		public setComponentParam(param: any): BlockDefinition {
			this.componentParam = param;
			return this;
		}
	}
}
