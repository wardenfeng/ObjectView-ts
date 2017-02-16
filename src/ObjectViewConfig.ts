module feng3d {

	/**
	 * ObjectView总配置数据
	 * @author feng 2016-3-23
	 */
	export class ObjectViewConfig {
		/**
		 * 默认基础类型对象界面类定义
		 */
		public defaultBaseObjectViewClass = ClassUtils.getQualifiedClassName(DefaultBaseObjectView);
		/**
		 * 默认对象界面类定义
		 */
		public defaultObjectViewClass = ClassUtils.getQualifiedClassName(DefaultObjectView);
		/**
		 * 默认对象属性界面类定义
		 */
		public defaultObjectAttributeViewClass = ClassUtils.getQualifiedClassName(DefaultObjectAttributeView);
		/**
		 * 属性块默认界面
		 */
		public defaultObjectAttributeBlockView = ClassUtils.getQualifiedClassName(DefaultObjectBlockView);

		/**
		 * 指定属性类型界面类定义字典（key:属性类名称,value:属性界面类定义）
		 */
		public attributeDefaultViewClassByTypeVec: AttributeTypeDefinition[] = [];

		/**
		 * ObjectView类配置字典 （key：类名称，value：ObjectView类配置）
		 */
		public classConfigVec: ClassDefinition[] = [];

		private static _instance: ObjectViewConfig;

		public static get instance(): ObjectViewConfig {
			if (ObjectViewConfig._instance == null) {
				ObjectViewConfig._instance = new ObjectViewConfig();
			}
			return ObjectViewConfig._instance;
		}

		public setConfig(config: any) {
			this.clearConfig();
			ObjectUtils.deepCopy(this, config);
		}

		public clearConfig() {
			ObjectUtils.deepCopy(this, new ObjectViewConfig());
		}
	}
}
