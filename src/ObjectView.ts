module feng3d {
	/**
	 * 对象界面
	 * @author feng 2016-3-10
	 */
	export class ObjectView {

		/**
		 * 获取对象界面
		 * 
		 * @static
		 * @param {Object} object				用于生成界面的对象
		 * @returns {egret.DisplayObject}		对象界面
		 * 
		 * @memberOf ObjectView
		 */
		public static getObjectView(object: Object): egret.DisplayObject {

			var classConfig: ObjectViewInfo = ObjectView.getObjectInfo(object);

			if (classConfig.component == null || classConfig.component == "") {

				//返回基础类型界面类定义
				if (ClassUtils.isBaseType(classConfig.owner)) {
					classConfig.component = $objectViewConfig.defaultBaseObjectViewClass;
				}
			}
			if (classConfig.component == null || classConfig.component == "") {

				//使用默认类型界面类定义
				classConfig.component = $objectViewConfig.defaultObjectViewClass;
			}

			var cls = ClassUtils.getDefinitionByName(classConfig.component);
			var view = new cls(classConfig)
			return view;
		}

		/**
		 * 获取属性界面
		 * 
		 * @static
		 * @param {AttributeViewInfo} attributeViewInfo			属性界面信息
		 * @returns {egret.DisplayObject}						属性界面
		 * 
		 * @memberOf ObjectView
		 */
		public static getAttributeView(attributeViewInfo: AttributeViewInfo): egret.DisplayObject {

			if (attributeViewInfo.component == null || attributeViewInfo.component == "") {

				var defaultViewClass: AttributeTypeDefinition = $objectViewConfig.attributeDefaultViewClassByTypeVec[attributeViewInfo.type];
				var tempComponent = defaultViewClass ? defaultViewClass.component : "";
				if (tempComponent != null && tempComponent != "") {
					attributeViewInfo.component = defaultViewClass.component;
					attributeViewInfo.componentParam = defaultViewClass.componentParam;
				}
			}

			if (attributeViewInfo.component == null || attributeViewInfo.component == "") {

				//使用默认对象属性界面类定义
				attributeViewInfo.component = $objectViewConfig.defaultObjectAttributeViewClass;
				attributeViewInfo.componentParam = null;
			}

			var cls = ClassUtils.getDefinitionByName(attributeViewInfo.component);
			var view = new cls(attributeViewInfo);
			return view;
		}

		/**
		 * 获取块界面
		 * 
		 * @static
		 * @param {BlockViewInfo} blockViewInfo			块界面信息
		 * @returns {egret.DisplayObject}				块界面
		 * 
		 * @memberOf ObjectView
		 */
		public static getBlockView(blockViewInfo: BlockViewInfo): egret.DisplayObject {

			if (blockViewInfo.component == null || blockViewInfo.component == "") {

				//返回默认对象属性界面类定义
				blockViewInfo.component = $objectViewConfig.defaultObjectAttributeBlockView;
				blockViewInfo.componentParam = null;
			}

			var cls = ClassUtils.getDefinitionByName(blockViewInfo.component);
			var view = new cls(blockViewInfo);
			return view;
		}

		/**
		 * 获取对象信息
		 * @param object
		 * @return
		 */
		private static getObjectInfo(object: Object): ObjectViewInfo {

			var className = ClassUtils.getQualifiedClassName(object);
			var classConfig: ClassDefinition = $objectViewConfig.classConfigVec[className];

			var objectInfo: ObjectViewInfo = {
				objectAttributeInfos: ObjectView.getObjectAttributeInfos(object),
				objectBlockInfos: ObjectView.getObjectBlockInfos(object),
				name: className,
				owner: object,
				component: classConfig ? classConfig.component : "",
				componentParam: classConfig ? classConfig.componentParam : null
			};
			return objectInfo;
		}

		/**
		 * 获取对象属性列表
		 */
		private static getObjectAttributeInfos(object: Object): AttributeViewInfo[] {

			var attributeNames: string[] = [];
			var className = ClassUtils.getQualifiedClassName(object);
			var classConfig: ClassDefinition = $objectViewConfig.classConfigVec[className];
			if (classConfig != null) {
				//根据配置中默认顺序生产对象属性信息列表
				var attributeDefinitions: AttributeDefinition[] = classConfig.attributeDefinitionVec;
				for (var i = 0; i < attributeDefinitions.length; i++) {
					if (attributeNames.indexOf(attributeDefinitions[i].name) == -1)
						attributeNames.push(attributeDefinitions[i].name);
				}
			}
			else {
				attributeNames = Object.keys(object);
				attributeNames = attributeNames.sort();
			}

			var objectAttributeInfos: AttributeViewInfo[] = [];
			for (var i = 0; i < attributeNames.length; i++) {
				var objectAttributeInfo = ObjectView.getAttributeViewInfo(object, attributeNames[i]);
				objectAttributeInfos.push(objectAttributeInfo);
			}
			return objectAttributeInfos;
		}

		/**
		 * 获取对象块信息列表
		 * 
		 * @private
		 * @static
		 * @param {Object} object			对象
		 * @returns {BlockViewInfo[]}		对象块信息列表
		 * 
		 * @memberOf ObjectView
		 */
		private static getObjectBlockInfos(object: Object): BlockViewInfo[] {

			var objectBlockInfos: BlockViewInfo[] = [];
			var dic: { [blockName: string]: BlockViewInfo } = {};
			var objectBlockInfo: BlockViewInfo
			var objectAttributeInfos: AttributeViewInfo[] = ObjectView.getObjectAttributeInfos(object);

			//收集块信息
			var i: number = 0;
			var tempVec: BlockViewInfo[] = [];
			for (i = 0; i < objectAttributeInfos.length; i++) {
				var blockName: string = objectAttributeInfos[i].block;
				objectBlockInfo = dic[blockName];
				if (objectBlockInfo == null) {
					objectBlockInfo = dic[blockName] = { name: blockName, owner: object, itemList: [] };
					tempVec.push(objectBlockInfo);
				}
				objectBlockInfo.itemList.push(objectAttributeInfos[i]);
			}

			//按快的默认顺序生成 块信息列表
			var blockDefinition: BlockDefinition;
			var pushDic = {};

			var className = ClassUtils.getQualifiedClassName(object);
			var classConfig: ClassDefinition = $objectViewConfig.classConfigVec[className];
			if (classConfig != null) {
				for (i = 0; i < classConfig.blockDefinitionVec.length; i++) {
					blockDefinition = classConfig.blockDefinitionVec[i];
					objectBlockInfo = dic[blockDefinition.name];
					if (objectBlockInfo == null) {
						objectBlockInfo = {
							name: blockDefinition.name,
							owner: object,
							itemList: []
						};
					}
					objectBlockInfo.component = blockDefinition.component;
					objectBlockInfo.componentParam = blockDefinition.componentParam;
					objectBlockInfos.push(objectBlockInfo);
					pushDic[objectBlockInfo.name] = true;
				}
			}
			//添加剩余的块信息
			for (i = 0; i < tempVec.length; i++) {
				if (Boolean(pushDic[tempVec[i].name]) == false) {
					objectBlockInfos.push(tempVec[i]);
				}
			}

			return objectBlockInfos;
		}

		/**
		 * 获取属性界面信息
		 * 
		 * @private
		 * @static
		 * @param {Object} object				属性所属对象
		 * @param {string} attributeName		属性名称
		 * @returns {AttributeViewInfo}			属性界面信息
		 * 
		 * @memberOf ObjectView
		 */
		private static getAttributeViewInfo(object: Object, attributeName: string): AttributeViewInfo {

			var attributeDefinition: AttributeDefinition = ObjectView.getAttributeDefinition(object, attributeName);
			var propertyDescriptor = Object.getOwnPropertyDescriptor(object, objectAttributeInfo.name);
			var objectAttributeInfo: AttributeViewInfo = {
				name: attributeName,
				block: attributeDefinition ? attributeDefinition.block : "",
				component: attributeDefinition ? attributeDefinition.component : "",
				componentParam: attributeDefinition ? attributeDefinition.componentParam : null,
				owner: object,
				writable: propertyDescriptor ? propertyDescriptor.writable : true,
				type: ClassUtils.getQualifiedClassName(object[objectAttributeInfo.name])
			};
			return objectAttributeInfo;
		}

		/**
		 * 获取属性定义
		 * 
		 * @private
		 * @static
		 * @param {Object} object					属性所属对象
		 * @param {string} attributeName			属性名称
		 * @returns {AttributeDefinition}			属性定义信息
		 * 
		 * @memberOf ObjectView
		 */
		private static getAttributeDefinition(object: Object, attributeName: string): AttributeDefinition {

			var className = ClassUtils.getQualifiedClassName(object);
			var classConfig: ClassDefinition = $objectViewConfig.classConfigVec[className];
			if (!classConfig)
				return null;
			for (var i = 0; i < classConfig.attributeDefinitionVec.length; i++) {
				var attributeDefinition: AttributeDefinition = classConfig.attributeDefinitionVec[i];
				if (attributeDefinition.name == attributeName)
					return attributeDefinition;
			}
			return null;
		}
	}
}