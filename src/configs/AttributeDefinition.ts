module feng3d {
	/**
	 * 定义属性
	 * @author feng 2016-3-23
	 */
	export class AttributeDefinition {
		/**
		 * 属性名称
		 */
		public name = "";

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

		public setBlock(block: string): AttributeDefinition {
			this.block = block;
			return this;
		}

		public setComponent(component: any): AttributeDefinition {
			this.component = getQualifiedClassName(component);
			return this;
		}

		public setComponentParam(param: any): AttributeDefinition {
			this.componentParam = param;
			return this;
		}
	}
}
