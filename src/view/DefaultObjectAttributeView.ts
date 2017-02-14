module feng3d {

	/**
	 * 默认对象属性界面
	 * @author feng 2016-3-10
	 */
	export class DefaultObjectAttributeView extends eui.Group implements IObjectAttributeView {
		private label: eui.Label;
		private text: eui.TextInput;
		private textTemp: string;
		private _space: Object;
		private _attributeName: string;
		private _attributeType: string;

		constructor(attributeViewInfo: AttributeViewInfo) {
			super();
			this._space = attributeViewInfo.owner;
			this._attributeName = attributeViewInfo.name;
			this._attributeType = attributeViewInfo.type;

			this.label = new eui.Label();
			this.label.width = 100;
			this.addChild(this.label);

			this.text = new eui.TextInput();
			this.text.x = 100;
			this.text.width = 100;
			this.addChild(this.text);

			this.text.enabled = attributeViewInfo.isEditable();

			this.updateView();
		}

		public get space(): Object {
			return this._space;
		}

		public set space(value: Object) {
			this._space = value;
			this.updateView();
		}

		public get attributeName(): string {
			return this._attributeName;
		}

		public get attributeValue(): Object {
			return this._space[this._attributeName];
		}

		public set attributeValue(value: Object) {
			if (this._space[this._attributeName] != value) {
				this._space[this._attributeName] = value;
			}
			this.updateView();
		}

		/**
		 * 更新界面
		 */
		public updateView(): void {
			this.label.text = this._attributeName + ":";
			this.text.text = String(this.attributeValue);
		}
	}
}
