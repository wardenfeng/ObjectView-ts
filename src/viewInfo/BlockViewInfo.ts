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
		public itemList: AttributeViewInfo[] = [];

		/**
		 * 属性拥有者
		 */
		public owner: Object;
	}
}
