module feng3d {
	/**
	 * 默认对象属性块界面
	 * @author feng 2016-3-22
	 */
	export class DefaultObjectBlockView extends eui.Group implements IObjectBlockView {
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
			var hLayout: eui.VerticalLayout = new eui.VerticalLayout();
			hLayout.gap = 10;
			hLayout.paddingTop = 30;
			hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
			this.layout = hLayout;

			this._space = blockViewInfo.owner;
			this._blockName = blockViewInfo.name;
			this.itemList = blockViewInfo.itemList;

			this.$updateView();
		}

		private initView(): void {
			var h = 0;
			if (this._blockName != null && this._blockName.length > 0) {
				var blockTitle = new eui.Label();
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
				var displayObject = objectAttributeInfos[i].getView();
				displayObject.y = h;
				this.addChild(displayObject);
				h += displayObject.height + 2;
				this.attributeViews.push(<any>displayObject);
			}

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

		public get blockName(): string {
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
