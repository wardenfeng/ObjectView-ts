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
		private objectAttributeInfos: AttributeViewInfo[];
		/**
		 * 对象块信息列表
		 */
		private objectBlockInfos: BlockViewInfo[];

		/**
		 * 保存类的一个实例，为了能够获取动态属性信息
		 */
		public owner: Object;

		/**
		 * 获取对象属性列表
		 */
		public getObjectAttributeInfos(): AttributeViewInfo[] {
			if (this.objectAttributeInfos == null) {
				//获取属性信息列表
				var attributes: AttributeInfo[];
				if (this.owner != null) {
					attributes = ClassUtils.getAttributeInfoList(this.owner);
				}
				else {
					attributes = ClassUtils.getAttributeInfoList(name);
				}
				attributes.sort(AttributeInfo.compare);

				//收集对象属性信息
				var dic = {};
				var tempInfos: AttributeViewInfo[] = [];
				var objectAttributeInfo: AttributeViewInfo;
				var i: number;
				for (i = 0; i < attributes.length; i++) {
					var attributeInfo: AttributeInfo = attributes[i];
					objectAttributeInfo = new AttributeViewInfo();
					objectAttributeInfo.owner = this.owner;
					deepCopy(objectAttributeInfo, attributeInfo);
					dic[objectAttributeInfo.name] = objectAttributeInfo;
					tempInfos.push(objectAttributeInfo);
				}

				var classConfig: ClassDefinition = ObjectViewConfig.instance.getClassConfig(name, false);
				//				if(classConfig == null)
				//				{
				//					classConfig = ObjectViewConfig.instance.createDefaultClassConfig(name);
				//				}

				if (classConfig != null) {
					//根据配置中默认顺序生产对象属性信息列表
					this.objectAttributeInfos = [];
					var attributeDefinitions: AttributeDefinition[] = classConfig.attributeDefinitionVec;
					for (i = 0; i < attributeDefinitions.length; i++) {
						objectAttributeInfo = dic[attributeDefinitions[i].name];
						if (objectAttributeInfo != null) {
							deepCopy(objectAttributeInfo, attributeDefinitions[i]);
							this.objectAttributeInfos.push(objectAttributeInfo);
						}
					}
				}
				else {
					this.objectAttributeInfos = tempInfos.concat();
				}
			}
			return this.objectAttributeInfos;
		}

		/**
		 * 获取对象块信息列表
		 */
		public getObjectBlockInfos(): BlockViewInfo[] {
			if (this.objectBlockInfos != null)
				return this.objectBlockInfos;

			var dic = {};
			var objectBlockInfo: BlockViewInfo

			var objectAttributeInfos: AttributeViewInfo[] = this.getObjectAttributeInfos();

			//收集块信息
			var i: number = 0;
			var tempVec: BlockViewInfo[] = [];
			for (i = 0; i < objectAttributeInfos.length; i++) {
				var blockName: string = objectAttributeInfos[i].block;
				objectBlockInfo = dic[blockName];
				if (objectBlockInfo == null) {
					objectBlockInfo = dic[blockName] = new BlockViewInfo();
					objectBlockInfo.name = blockName
					objectBlockInfo.owner = this.owner;
					tempVec.push(objectBlockInfo);
				}
				objectBlockInfo.itemList.push(objectAttributeInfos[i]);
			}

			//按快的默认顺序生成 块信息列表
			var blockDefinition: BlockDefinition;
			this.objectBlockInfos = [];
			var pushDic = {};
			var classConfig: ClassDefinition = ObjectViewConfig.instance.getClassConfig(name, false);
			if (classConfig != null) {
				for (i = 0; i < classConfig.blockDefinitionVec.length; i++) {
					blockDefinition = classConfig.blockDefinitionVec[i];
					objectBlockInfo = dic[blockDefinition.name];
					if (objectBlockInfo == null) {
						objectBlockInfo = new BlockViewInfo();
						objectBlockInfo.name = blockDefinition.name;
						objectBlockInfo.owner = this.owner;
					}
					deepCopy(objectBlockInfo, blockDefinition);
					this.objectBlockInfos.push(objectBlockInfo);
					pushDic[objectBlockInfo.name] = true;
				}
			}
			//添加剩余的块信息
			for (i = 0; i < tempVec.length; i++) {
				if (Boolean(pushDic[tempVec[i].name]) == false) {
					this.objectBlockInfos.push(tempVec[i]);
				}
			}

			return this.objectBlockInfos;
		}

		/**
		 * 获取对象界面类定义
		 * @param object		用于生成界面的对象
		 * @return				对象界面类定义
		 */
		private initComponent(): void {
			//获取自定义类型界面类定义
			if (this.component != null && this.component != "")
				return;

			//返回基础类型界面类定义
			if (isBaseType(this.owner)) {
				this.component = ObjectViewConfig.instance.defaultBaseObjectViewClass;
				return;
			}

			//返回默认类型界面类定义
			this.component = ObjectViewConfig.instance.defaultObjectViewClass;
		}

		/**
		 * 获取界面
		 */
		public getView(): DisplayObject {
			this.initComponent();

			// var cls = ClassUtils.getClass(this.component);
			// var view: DisplayObject = new cls(this)
			// return view;

			return null;
		}
	}
}
