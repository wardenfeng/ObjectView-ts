module feng3d {

	/**
	 * 属性信息
	 * @author feng 2016-3-28
	 */
	export class AttributeInfo {
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
		 * 构建
		 */
		constructor(name = "", type = "", access = "") {
			this.name = name;
			this.type = type;
			this.access = access;
		}

		/**
		 * 设置数据
		 * @param data
		 */
		public setData(data: Object) {
			ClassUtils.deepCopy(this, data);
			return this;
		}

		/**
		 * 比较字符串
		 * @param a
		 * @param b
		 * @return
		 */
		public static compare(a: AttributeInfo, b: AttributeInfo): number {
			return SortCompare.stringCompare(a.name, b.name);
		}
	}
}
