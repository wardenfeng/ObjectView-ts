module feng3d {

	/**
	 * 对象界面事件
	 * @author feng 2016-4-19
	 */
	export class ObjectViewEvent extends Event {
		/**
		 * 属性值变化时间
		 */
		public static VALUE_CHANGE = "valueChange";

		/**
		 * 界面所属对象（空间）
		 */
		public space: Object;

		/**
		 * 属性名称
		 */
		public attributeName: string;

		/**
		 * 属性值
		 */
		public attributeValue: Object;
	}
}
