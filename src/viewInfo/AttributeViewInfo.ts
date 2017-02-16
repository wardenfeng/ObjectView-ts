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
	}
}
