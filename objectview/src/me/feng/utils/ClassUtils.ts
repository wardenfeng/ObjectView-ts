module feng3d {
	/**
	 * 类工具
	 * @author feng 2015-4-27
	 */
	export class ClassUtils {
		/**
		 * 基础类型列表
		 */
		public static BASETYPES = ["int", "Boolean", "Number", "uint", "String", "null"];

		/**
		 * 获取类名称（字符串直接返回）
		 * @param obj
		 * @return
		 */
		public static getClassName(obj: any): string {
			if (typeof obj == "string") {
				return obj;
			}
			var className = getQualifiedClassName(obj);
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
			var cls: Class = getClass(obj);
			try {
				var instance = new cls();
			}
			catch (error: Error) {
				return null;
			}
			return instance;
		}

		/**
		 * 构造实例
		 * @param cla						类定义
		 * @param params					构造参数
		 * @return							构造出的实例
		 */
		public static structureInstance(cla: Class, params: []) {
			if (params == null) {
				return new cla();
			}

			var paramNum = params.length;
			switch (paramNum) {
				case 0:
					return new cla();
				case 1:
					return new cla(params[0]);
				case 2:
					return new cla(params[0], params[1]);
				case 3:
					return new cla(params[0], params[1], params[2]);
				case 4:
					return new cla(params[0], params[1], params[2], params[3]);
				case 5:
					return new cla(params[0], params[1], params[2], params[3], params[4]);
				case 6:
					return new cla(params[0], params[1], params[2], params[3], params[4], params[5]);
				case 7:
					return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
				case 8:
					return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]);
				case 9:
					return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]);
				case 10:
					return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9]);
				default:
					throw new Error("不支持" + paramNum + "个参数的类构造");
			}
		}

		/**
		 * 构造实例
		 * @param space						运行空间
		 * @param funcName					函数名称
		 * @param params					函数参数
		 * @return							函数返回值
		 */
		public static call(space: Object, funcName: string, params: []) {
			var func: Function = space[funcName];
			var result = func.apply(null, params);
			return result;
		}

		/**
		 * 编码参数
		 * @param params		参数数组
		 */
		public static encodeParams(params: []): void {
			for (var i: number = 0; i < params.length; i++) {
				var item: Object = params[i];
				var paramType: String = getQualifiedClassName(item);
				params[i] = { paramType: paramType, paramValue: item };
			}
		}

		/**
		 * 解码参数
		 * @param params		参数数组
		 */
		public static decodeParams(params: []): void {
			for (var i: number = 0; i < params.length; i++) {
				var item: Object = params[i];

				if (item.hasOwnProperty("paramType") && item.hasOwnProperty("paramValue")) {
					var obj: Object;
					if (item.paramType == "flash.geom::Matrix3D") {
						obj = new Matrix3D(Vector.<Number>(item.paramValue.rawData));
					}
					else {
						obj = ClassUtils.getInstance(item.paramType);
						if (isBaseType(item.paramValue)) {
							obj = item.paramValue;
						}
						else {
							deepCopy(obj, item.paramValue);
						}
					}
					params[i] = obj;
				}
			}
		}

		/**
		 * 拷贝数据（深度拷贝，不支持循环引用） （支持无参数构建的强类型/弱类型/Array/Vector，注意:不支持Dictionary/内部类）
		 * @param obj			需要赋值的对象
		 * @param value			拥有数据的对象
		 */
		public static deepCopy(obj: Object, value: Object): void {
			if (obj == null || value == null)
				return;

			if (isVector(obj)) {
				copyVectorValue(obj, value);
				return;
			}

			getCanCopyAttributeList(obj, value);
		}

		/**
		 * 获取可赋值的属性列表
		 * @param obj
		 * @param value
		 * @return
		 */
		private static getCanCopyAttributeList(obj: Object, value: Object): void {
			var objAttributeList: Vector.<AttributeInfo> = getAttributeInfoList(obj);
			var valueAttributeList: Vector.<AttributeInfo> = getAttributeInfoList(value);
			var isDynamic: Boolean = describeTypeInstance(getClass(obj)).isDynamic;

			var temp: Object;
			var dic: Dictionary = new Dictionary();
			var i: int = 0;
			for (i = 0; i < objAttributeList.length; i++) {
				dic[objAttributeList[i].name] = objAttributeList[i];
			}
			for (i = 0; i < valueAttributeList.length; i++) {
				var valueAttributeInfo: AttributeInfo = valueAttributeList[i];
				var attributeName: String = valueAttributeInfo.name;
				var objAttributeInfo: AttributeInfo = dic[attributeName];
				if (valueAttributeInfo.access == AccessType.readwrite || valueAttributeInfo.access == AccessType.readonly) {
					if (objAttributeInfo != null && objAttributeInfo.access == AccessType.writeonly) {
						temp = getInstance(objAttributeInfo.type);
						deepCopy(temp, value[attributeName]);
						obj[attributeName] = temp;
					}
					else if (isDynamic || (objAttributeInfo != null && objAttributeInfo.access == AccessType.readwrite)) {
						if (isBaseType(value[attributeName])) {
							obj[attributeName] = value[attributeName];
						}
						else {
							temp = obj[attributeName];
							if (obj[attributeName] == null) {
								if (objAttributeInfo != null) {
									temp = getInstance(objAttributeInfo.type);
								}
								else {
									temp = getInstance(valueAttributeInfo.type);
								}
							}
							deepCopy(temp, value[attributeName]);
							obj[attributeName] = temp;
						}
					}
				}
			}
		}

		/**
		 * 拷贝数据到向量数组中
		 * @param obj				需要赋值的对象
		 * @param value				拥有数据的对象
		 * @param attributeName		属性名称
		 */
		private static copyVectorValue(obj: Object, value: Object): void {
			obj.length = 0;
			var lenght: int = obj.length = value.length;
			var objClassName: String = ClassUtils.getClassName(obj);
			var itemClassName: String = objClassName.replace("__AS3__.vec::Vector.<", "").replace(">", "");

			for (var i: int = 0; i < value.length; i++) {
				if (value[i] != null) {
					if (isBaseType(value[i])) {
						obj[i] = value[i];
					}
					else {
						obj[i] = ClassUtils.getInstance(itemClassName);
						deepCopy(obj[i], value[i]);
					}
				}
			}
		}

		/**
		 * 获取对象（类）属性类型
		 * @param obj					对象（类）
		 * @param attributeName			属性名称
		 * @return 						属性类型
		 */
		private static getAttributeType(obj: Object, attributeName: String): String {
			var objectAttributeInfos: Vector.<AttributeInfo> = getAttributeInfoList(obj);
			for (var i: int = 0; i < objectAttributeInfos.length; i++) {
				if (objectAttributeInfos[i].name == attributeName) {
					return objectAttributeInfos[i].type;
				}
			}
			return null;
		}

		/**
		 * 判断对象是否为基础类型
		 * @param obj			对象
		 * @return				true为基础类型，false为复杂类型
		 */
		public static isBaseType(obj: Object): Boolean {
			if (obj is Function)
			return true;
			if (obj is Class)
			return true;

			var type: String = getQualifiedClassName(obj);
			var index: int = BASETYPES.indexOf(type);
			return index != -1;
		}

		/**
		 * 是否为动态对象
		 * @param obj
		 * @return
		 */
		public static isDynamic(obj: Object): Boolean {
			var cls: Class = ClassUtils.getClass(obj);
			var describeInfo: Object = describeTypeInstance(cls);
			return describeInfo.isDynamic;
		}

		/**
		 * 是否为向量数组
		 * @param obj			对象
		 * @return
		 */
		private static isVector(obj: Object): Boolean {
			var objClassName: String = ClassUtils.getClassName(obj);

			return objClassName.indexOf("__AS3__.vec::Vector.<") != -1;
		}

		/**
		 * 获取对象默认名称
		 * @param obj				对象
		 * @return					对象默认名称
		 */
		public static getDefaultName(obj: Object): String {
			return getQualifiedClassName(obj).split("::").pop();
		}

		/**
		 * 判断两个对象的完全限定类名是否相同
		 * @param obj1			对象1
		 * @param obj2			对象2
		 * @return
		 */
		public static isSameClass(obj1:*, obj2:*): Boolean {
			var className1: String = getQualifiedClassName(obj1);
			var className2: String = getQualifiedClassName(obj2);
			return className1 == className2;
		}

		/**
		 * 获取对象（类）属性列表
		 * @param object		指定对象（类）
		 * @return 				属性列表
		 */
		public static getAttributeList(object: Object): Vector.<String> {
			var objectAttributeInfos: Vector.<AttributeInfo> = getAttributeInfoList(object);
			var attributes: Vector.<String> = new Vector.<String>();
			for (var i: int = 0; i < objectAttributeInfos.length; i++) {
				attributes.push(objectAttributeInfos[i].name);
			}
			return attributes;
		}

		/**
		 * 获取对象（类）所有属性信息列表 （注:不支持内部类）
		 * @param object		指定对象（类）
		 * @return 				属性信息列表
		 */
		public static getAttributeInfoList(object: Object): Vector.<AttributeInfo> {
			var objectAttributeInfos: Vector.<AttributeInfo> = new Vector.<AttributeInfo>();

			var cls: Class = ClassUtils.getClass(object);
			var describeInfo: Object = describeTypeInstance(cls);
			var variables: Array = describeInfo.traits.variables;
			var i: int = 0;
			for (i = 0; variables != null && i < variables.length; i++) {
				var variable: Object = variables[i];
				objectAttributeInfos.push(new AttributeInfo(variable.name, variable.type, variable.access));
			}
			var accessors: Array = describeInfo.traits.accessors;
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
			var objectAttributeInfos: AttributeInfo[] = getAttributeInfoList(object);
			for (var i: number = 0; i < objectAttributeInfos.length; i++) {
				if (objectAttributeInfos[i].name == attribute)
					return objectAttributeInfos[i];
			}
			return null;
		}
	}
}
