module feng3d {
	/**
	 * 类工具
	 * @author feng 2015-4-27
	 */
	export class ClassUtils {

		/**
		 * 获取类名称（字符串直接返回）
		 * @param obj
		 * @return
		 */
		public static getClassName(obj: any): string {
			if (typeof obj == "string") {
				return obj;
			}
			var className = getClassName(obj);
			if (className == "null" || className == "void") {
				return "";
			}
			return className;
		}

		/**
		 * 获取类定义
		 * @param obj
		 * @return
		 */
		public static getClass(obj: any): Class {
			var className = this.getClassName(obj);
			try {
				return getDefinitionByName(className) as Class;
			}
			catch (error: Error) {

			}
			return null;
		}

		/**
		 * 获取类实例			（不支持构造函数中有参数）
		 * @param obj
		 * @return
		 */
		public static getInstance(obj) {
			var cls = this.getClass(obj);
			try {
				var instance = new cls();
			}
			catch (error: Error) {
				return null;
			}
			return instance;
		}

		/**
		 * 获取对象（类）属性列表
		 * @param object		指定对象（类）
		 * @return 				属性列表
		 */
		public static getAttributeList(object: Object): string[] {
			var objectAttributeInfos: AttributeInfo[] = this.getAttributeInfoList(object);
			var attributes: string[] = [];
			for (var i = 0; i < objectAttributeInfos.length; i++) {
				attributes.push(objectAttributeInfos[i].name);
			}
			return attributes;
		}

		/**
		 * 获取对象（类）所有属性信息列表 （注:不支持内部类）
		 * @param object		指定对象（类）
		 * @return 				属性信息列表
		 */
		public static getAttributeInfoList(object: Object): AttributeInfo[] {
			var objectAttributeInfos: AttributeInfo[] = [];

			var cls = ClassUtils.getClass(object);
			var describeInfo: Object = describeTypeInstance(cls);
			var variables: any[] = describeInfo.traits.variables;
			var i = 0;
			for (i = 0; variables != null && i < variables.length; i++) {
				var variable: Object = variables[i];
				objectAttributeInfos.push(new AttributeInfo(variable.name, variable.type, variable.access));
			}
			var accessors: any[] = describeInfo.traits.accessors;
			for (i = 0; accessors != null && i < accessors.length; i++) {
				var accessor: Object = accessors[i];
				objectAttributeInfos.push(new AttributeInfo(accessor.name, accessor.type, accessor.access));
			}

			if (!(object is Class))
			{
				for (var name: String in object) {
					objectAttributeInfos.push(new AttributeInfo(name, ClassUtils.getClassName(object[name]), AccessType.readwrite));
				}
			}
			return objectAttributeInfos;
		}

		/**
		 * 获取属性信息
		 * @param object			属性所属对象
		 * @param attribute			属性名称
		 * @return
		 */
		public static getAttributeInfo(object: Object, attribute: String): AttributeInfo {
			var objectAttributeInfos: AttributeInfo[] = this.getAttributeInfoList(object);
			for (var i = 0; i < objectAttributeInfos.length; i++) {
				if (objectAttributeInfos[i].name == attribute)
					return objectAttributeInfos[i];
			}
			return null;
		}
	}
}
