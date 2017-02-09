module feng3d {

	/**
	 * 获取类实例描述
	 * @param type		类类型
	 * @return			类实例描述
	 *
	 * @author feng 2012-10-23
	 */
	export function describeTypeInstance(type): Object {
		return describeTypeJSON(type, DescribeTypeFlags.INSTANCE_FLAGS);
	}
}
