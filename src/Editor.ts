module feng3d.editor {

    /**
     * 编辑器
     * @author feng 2016-10-29
     */
    export class Editor {

        constructor() {

            //初始化界面
            Laya.init(600, 400);
            Laya.loader.load([{ url: "res/atlas/comp.json", type: laya.net.Loader.ATLAS }], laya.utils.Handler.create(null, onLoaded));

            function onLoaded(): void {
                //实例UI界面
                // var testUI = new MainUI();
                // Laya.stage.addChild(testUI);

                // var view = ObjectView.getObjectView({ a: 1, b: { c: "c", d: true } })
                var view = ObjectView.getObjectView(new Sprite());
                view.x = 20;
                view.y = 20;
                Laya.stage.addChild(view);



                // var s = new laya.display.Sprite();
                // s.graphics.clear();
                // s.graphics.drawRect(0, 0, 200, 100, "#666666");
                // Laya.stage.addChild(s);

            }
        }
    }

    //启动编辑器
    var editor = new Editor();
}