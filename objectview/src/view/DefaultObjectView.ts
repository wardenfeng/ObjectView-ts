module feng3d {
	/**
	 * 默认使用块的对象界面
	 * @author feng 2016-3-22
	 */
	export class DefaultObjectView extends Sprite implements IObjectView {
		private _space: Object;
		private _objectViewInfo: ObjectViewInfo;
		private blockViews: IObjectBlockView[];

		/**
		 * 对象界面数据
		 */
		constructor(objectViewInfo: ObjectViewInfo) {
			super();
			this._objectViewInfo = objectViewInfo;
			this._space = objectViewInfo.owner;

			this.blockViews = [];
			var h: Number = 0;
			var objectBlockInfos: BlockViewInfo[] = this._objectViewInfo.getObjectBlockInfos();
			for (var i = 0; i < objectBlockInfos.length; i++) {
				var displayObject: DisplayObject = objectBlockInfos[i].getView();
				displayObject.y = h;
				this.addChild(displayObject);
				h += displayObject.height + 2;
				this.blockViews.push(displayObject as IObjectBlockView);
			}
			this.graphics.clear();
			this.graphics.beginFill(0x666666);
			this.graphics.drawRect(0, 0, 200, h);
			this.graphics.endFill();

			this.$updateView();
		}

		public get space(): Object {
			return this._space;
		}

		public set space(value: Object) {
			this._space = value;
			for (var i = 0; i < this.blockViews.length; i++) {
				this.blockViews[i].space = this._space;
			}

			this.$updateView();
		}

		/**
		 * 更新界面
		 */
		public updateView(): void {
			this.$updateView();

			for (var i = 0; i < this.blockViews.length; i++) {
				this.blockViews[i].updateView();
			}
		}

		/**
		 * 更新自身界面
		 */
		private $updateView(): void {

		}

		public getblockView(blockName: String): IObjectBlockView {
			for (var i = 0; i < this.blockViews.length; i++) {
				if (this.blockViews[i].blockName == blockName) {
					return this.blockViews[i];
				}
			}
			return null;
		}

		public getAttributeView(attributeName: String): IObjectAttributeView {
			for (var i = 0; i < this.blockViews.length; i++) {
				var attributeView: IObjectAttributeView = this.blockViews[i].getAttributeView(attributeName);
				if (attributeView != null) {
					return attributeView;
				}
			}
			return null;
		}
	}
}
