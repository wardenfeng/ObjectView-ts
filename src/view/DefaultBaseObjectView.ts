module feng3d {
	/**
	 * 默认基础对象界面
	 * @author feng 2016-3-11
	 */
	export class DefaultBaseObjectView extends TextField implements IObjectView {
		public static KEY = "DefaultBaseObjectView";
		//
		private _space: Object;

		constructor(objectViewInfo: ObjectViewInfo) {
			super();
			this._space = objectViewInfo.owner;

			this.updateView();
		}

		public get space(): Object {
			return this._space;
		}

		public set space(value: Object) {
			this._space = value;
			this.updateView();
		}

		public getAttributeView(attributeName: String): IObjectAttributeView {
			return null;
		}

		public getblockView(blockName: String): IObjectBlockView {
			return null;
		}

		/**
		 * 更新界面
		 */
		public updateView(): void {
			this.text = String(this._space);
		}
	}
}
