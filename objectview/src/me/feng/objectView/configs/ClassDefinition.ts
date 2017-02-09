module feng3d {
	/**
	 * ObjectView类配置
	 * @author feng 2016-3-23
	 */
	export class ClassDefinition {
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
		 * 自定义对象属性定义字典（key:属性名,value:属性定义）
		 */
		public attributeDefinitionVec: AttributeDefinition[] = [];

		/**
		 * 自定义对象属性块界面类定义字典（key:属性块名称,value:自定义对象属性块界面类定义）
		 */
		public blockDefinitionVec: BlockDefinition[] = [];

		/**
		 * 设置自定义对象界面类定义
		 * @param viewClass				自定义对象界面类定义（该类必须是实现IObjectView接口并且是DisplayObject的子类）
		 */
		public setCustomObjectViewClass(viewClass): void {
			this.component = ClassUtils.getClassName(viewClass);
		}

		/**
		 * 获取自定义对象属性定义
		 * @param attributeName			属性名称
		 * @param autoCreate			是否自动生成
		 * @return
		 */
		public getAttributeDefinition(attributeName: string, autoCreate: Boolean = true): AttributeDefinition {
			var attributeDefinition: AttributeDefinition;
			this.attributeDefinitionVec.forEach(element => {

				if (element.name == attributeName) {
					return element;
				}
			});

			attributeDefinition = new AttributeDefinition();
			attributeDefinition.name = attributeName;
			if (autoCreate) {
				this.attributeDefinitionVec.push(attributeDefinition);
			}
			return attributeDefinition;
		}

		/**
		 * 获取对象属性块定义
		 * @param blockName		属性名称
		 * @param autoCreate	是否自动生成
		 * @return
		 */
		public getBlockDefinition(blockName: string, autoCreate: Boolean = true): BlockDefinition {
			var blockDefinition: BlockDefinition;
			this.blockDefinitionVec.forEach(element => {
				if (element.name == blockName) {
					return element;
				}
			});

			blockDefinition = new BlockDefinition();
			blockDefinition.name = blockName;
			if (autoCreate) {
				this.blockDefinitionVec.push(blockDefinition);
			}
			return blockDefinition;
		}

		/**
		 * 设置类配置
		 * @param config
		 */
		public setConfig(config: Object): void {
			//清理数据
			ClassUtils.deepCopy(this, ClassUtils.getInstance(this));
			//设置数据
			ClassUtils.deepCopy(this, config);
		}

		/**
		 * 初始化默认定义
		 * @param object
		 * @return
		 */
		public initDefault(object: Object): ClassDefinition {
			this.attributeDefinitionVec.length = 0;
			this.blockDefinitionVec.length = 0;

			var attributes: string[] = ClassUtils.getAttributeList(object);
			attributes = attributes.sort(SortCompare.stringCompare);
			for (var i = 0; i < attributes.length; i++) {
				this.getAttributeDefinition(attributes[i]);
			}
			this.getBlockDefinition("");

			return this;
		}
	}
}
