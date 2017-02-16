module feng3d {

	/**
	 * 对象信息
	 * @author feng 2016-3-29
	 */
	export class ObjectViewInfo {
		/**
		 * 类名
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
		 * 对象属性列表
		 */
		public objectAttributeInfos: AttributeViewInfo[];
		/**
		 * 对象块信息列表
		 */
		public objectBlockInfos: BlockViewInfo[];

		/**
		 * 保存类的一个实例，为了能够获取动态属性信息
		 */
		public owner: Object;
	}
}
