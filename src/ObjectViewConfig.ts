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

		/**
		 * 获取ObjectView类配置
		 * @param object				对象
		 * @param autoCreate			是否自动创建
		 * @return
		 */
		public getClassConfig(object: any, autoCreate: Boolean = true): ClassDefinition {
			var className: string = object;
			if (typeof object != "string") {
				className = ClassUtils.getQualifiedClassName(object);
			}

			var classConfig: ClassDefinition;
			this.classConfigVec.forEach(element => {
				if (element.name == className) {
					classConfig = element;
				}
			});

			if (classConfig == null && autoCreate) {
				classConfig = new ClassDefinition();
				classConfig.name = className;
				this.classConfigVec.push(classConfig);
			}
			return classConfig;
		}

		/**
		 * 获取特定类型的默认属性界面定义
		 * @param attributeClass		属性类型
		 * @param autoCreate			是否自动创建
		 * @return
		 */
		public getAttributeDefaultViewClass(attributeClass: any, autoCreate: Boolean = true): AttributeTypeDefinition {
			var type: string = attributeClass;
			if (typeof attributeClass != "string") {
				type = ClassUtils.getQualifiedClassName(attributeClass);
			}
			var obj: AttributeTypeDefinition;
			this.attributeDefaultViewClassByTypeVec.forEach(element => {
				if (element.type == type) {
					obj = element;
				}
			});

			if (obj == null && autoCreate) {
				obj = new AttributeTypeDefinition();
				obj.type = type;
				this.attributeDefaultViewClassByTypeVec.push(obj);
			}
			return obj;
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
