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

		/**
		 * 构建
		 */
		constructor(type: string, bubbles: Boolean = false, cancelable: Boolean = false) {
			super(type, bubbles, cancelable);
		}

		public toString() {
			return "[{0} type=\"{1}\" space=\"{2}\"  attributeName=\"{3}\" attributeValue={4}]" //
				.replace("{0}", getQualifiedClassName(this).split("::").pop()) //
				.replace("{1}", type) //
				.replace("{2}", getQualifiedClassName(this).split("::").pop()) //
				.replace("{3}", this.attributeName) //
				.replace("{4}", JSON.stringify(this.attributeValue)) //
				;
		}
	}
}
