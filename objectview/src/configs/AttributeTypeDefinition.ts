module feng3d {
	/**
	 * 定义特定属性类型默认界面
	 * @author feng 2016-3-25
	 */
	export class AttributeTypeDefinition {
		/**
		 * 属性类型
		 */
		public type: string;
		/**
		 * 界面类
		 */
		public component: string;

		/**
		 * 组件参数
		 */
		public componentParam: Object;

		/**
		 * 设置组件
		 */
		public setComponent(component: Object): AttributeTypeDefinition {
			this.component = ClassUtils.getClassName(component);
			return this;
		}

		/**
		 * 设置属性组件
		 */
		public setComponentParam(param: Object): AttributeTypeDefinition {
			this.componentParam = param;
			return this;
		}
	}
}
