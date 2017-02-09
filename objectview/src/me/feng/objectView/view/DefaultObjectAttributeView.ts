module feng3d {

	/**
	 * 默认对象属性界面
	 * @author feng 2016-3-10
	 */
	export class DefaultObjectAttributeView extends Sprite implements IObjectAttributeView {
		private label: TextField;
		private text: TextField;
		private textTemp: string;
		private _space: Object;
		private _attributeName: string;
		private _attributeType: string;

		constructor(attributeViewInfo: AttributeViewInfo) {
			super();
			this._space = attributeViewInfo.owner;
			this._attributeName = attributeViewInfo.name;
			this._attributeType = attributeViewInfo.type;

			this.label = new TextField();
			//			label.height = 50;
			this.label.width = 100;
			this.label.height = 20;
			this.addChild(this.label);

			this.text = new TextField();
			this.text.border = true;
			this.text.x = 100;
			this.text.height = 20;
			this.text.width = 100;
			this.text.type = TextFieldType.INPUT;
			this.text.addEventListener(FocusEvent.FOCUS_IN, onFocusIn);
			this.text.addEventListener(FocusEvent.FOCUS_OUT, onFocusOut);
			this.addChild(this.text);
			this.graphics.beginFill(0x999999);
			this.graphics.drawRect(0, 0, 200, 24);

			if (!attributeViewInfo.isEditable()) {
				this.text.type = TextFieldType.DYNAMIC;
			}

			this.updateView();
		}

		public get space(): Object {
			return this._space;
		}

		public set space(value: Object) {
			this._space = value;
			this.updateView();
		}

		public get attributeName(): String {
			return this._attributeName;
		}

		public get attributeValue(): Object {
			return this._space[this._attributeName];
		}

		public set attributeValue(value: Object) {
			if (this._space[this._attributeName] != value) {
				this._space[this._attributeName] = value;

				//派发属性值修改事件
				var objectViewEvent: ObjectViewEvent = new ObjectViewEvent(ObjectViewEvent.VALUE_CHANGE, true);
				objectViewEvent.space = this._space;
				objectViewEvent.attributeName = this._attributeName;
				objectViewEvent.attributeValue = this.attributeValue;
				dispatchEvent(objectViewEvent);

			}
			this.updateView();
		}

		protected onFocusOut(event: FocusEvent): void {
			if (this.textTemp != this.text.text) {
				var cls = getDefinitionByName(this._attributeType);
				this.attributeValue = cls(text.text);
				if (cls == Boolean && (this.text.text == "0" || this.text.text == "false")) {
					this.attributeValue = false;
				}
			}

			this.textTemp = null;
		}

		protected onFocusIn(event: FocusEvent): void {
			this.textTemp = this.text.text;
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
