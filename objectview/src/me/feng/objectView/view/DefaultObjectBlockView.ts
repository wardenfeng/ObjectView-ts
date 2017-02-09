module feng3d {
	/**
	 * 默认对象属性块界面
	 * @author feng 2016-3-22
	 */
	export class DefaultObjectBlockView extends Sprite implements IObjectBlockView {
		private _space: Object;
		private _blockName: string;

		private attributeViews: IObjectAttributeView[];
		private itemList: AttributeViewInfo[];
		private isInitView: boolean;

		/**
		 * @inheritDoc
		 */
		constructor(blockViewInfo: BlockViewInfo) {
			super();
			this._space = blockViewInfo.owner;
			this._blockName = blockViewInfo.name;
			this.itemList = blockViewInfo.itemList;

			this.$updateView();
		}

		private initView(): void {
			var h: Number = 0;
			if (this._blockName != null && this._blockName.length > 0) {
				var blockTitle: TextField = new TextField();
				//			label.height = 50;
				blockTitle.width = 100;
				blockTitle.height = 20;
				blockTitle.textColor = 0xff0000;
				blockTitle.text = this._blockName;
				this.addChild(blockTitle);
				h = blockTitle.x + blockTitle.height + 2;
			}

			this.attributeViews = [];
			var objectAttributeInfos = this.itemList;
			for (var i = 0; i < objectAttributeInfos.length; i++) {
				if (!objectAttributeInfos[i].canRead())
					continue;
				var displayObject: DisplayObject = objectAttributeInfos[i].getView();
				displayObject.y = h;
				this.addChild(displayObject);
				h += displayObject.height + 2;
				this.attributeViews.push(displayObject as IObjectAttributeView);
			}
			this.graphics.clear();
			this.graphics.beginFill(0x666666);
			this.graphics.lineStyle(null, 0x00ff00);
			this.graphics.moveTo(0, 0);
			this.graphics.lineTo(200, 0);
			this.graphics.lineTo(200, h);
			this.graphics.lineTo(0, h);
			this.graphics.lineTo(0, 0);
			this.graphics.endFill();

			this.isInitView = true;
		}

		public get space(): Object {
			return this._space;
		}

		public set space(value: Object) {
			this._space = value;
			for (var i = 0; i < this.attributeViews.length; i++) {
				this.attributeViews[i].space = this._space;
			}

			this.$updateView();
		}

		public get blockName(): String {
			return this._blockName;
		}

		/**
		 * 更新自身界面
		 */
		private $updateView(): void {
			if (!this.isInitView) {
				this.initView();
			}
		}

		public updateView(): void {
			this.$updateView();
			for (var i = 0; i < this.attributeViews.length; i++) {
				this.attributeViews[i].updateView();
			}
		}

		public getAttributeView(attributeName: String): IObjectAttributeView {
			for (var i = 0; i < this.attributeViews.length; i++) {
				if (this.attributeViews[i].attributeName == attributeName) {
					return this.attributeViews[i];
				}
			}
			return null;
		}
	}
}
