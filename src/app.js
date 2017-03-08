var HelloWorldLayer = cc.Layer.extend({
    space: null,
    ctor: function() {
        this._super();
        this.initSpace();
        this.createPhysicsSprite();
        this.createFloor();
    },
    initSpace: function() { 
        //物理演算する空間を作る
        this.space = new cp.Space();
 
        //重力加速度
        //this.space.gravity = cp.v(0, -980);

        // shapeを可視化する（デバッグ用）
        this.addChild(new cc.PhysicsDebugNode(this.space));
 
        this.scheduleUpdate();
    },
    createPhysicsSprite: function() {
        this.addBullet(200,300);
        this.addTank(320,500);
        this.addTank(220,600);
        this.addTank(420,500);
        this.addTank(420,600);
    },

    addTank:function(posX,posY){
        // 物理スプライト
        this.tankSprite = new cc.PhysicsSprite("res/tank.png");  
        // 質量、慣性モーメントを設定
        this.weight = 9999;
        this.tankBody = new cp.Body(this.weight, cp.momentForBox(this.weight, this.tankSprite.getContentSize().width, this.tankSprite.getContentSize().height));
        this.space.addBody(this.tankBody);
        // 形状、摩擦係数、反発係数を設定
        this.tankShape = new cp.BoxShape(this.tankBody, this.tankSprite.getContentSize().width, this.tankSprite.getContentSize().height);
        this.tankShape.setFriction(1);　//摩擦係数
        this.tankShape.setElasticity(0.5); //弾性係数を設定
        this.space.addShape(this.tankShape);
        this.tankSprite.setBody(this.tankBody);
        this.tankSprite.setPosition(posX, posY);
        this.addChild(this.tankSprite);
    },

    addBullet:function(posX,posY){
        // 物理スプライト
        this.tankSprite = new cc.PhysicsSprite("res/bullet.png");  
        // 質量、慣性モーメントを設定
        this.weight = 100;
        this.bulletBody = new cp.Body(this.weight, cp.momentForBox(this.weight, this.tankSprite.getContentSize().width, this.tankSprite.getContentSize().height));
        this.space.addBody(this.bulletBody);
        // 形状、摩擦係数、反発係数を設定
        this.bulletShape = new cp.BoxShape(this.bulletBody, this.tankSprite.getContentSize().width, this.tankSprite.getContentSize().height);
        this.bulletShape.setFriction(1);　//摩擦係数
        this.bulletShape.setElasticity(0.7); //弾性係数を設定
        this.space.addShape(this.bulletShape);
        this.tankSprite.setBody(this.bulletBody);
        this.tankSprite.setPosition(posX, posY);
        //this.bulletBody.applyImpulse(cp.v(this.weight * 1500, this.weight * 1500), cp.v(0, 0)); // 垂直上向きの力を加える
        this.bulletBody.applyImpulse(cp.v(this.weight * 150, 0), cp.v(0, 0)); // 右向き
        this.bulletBody.applyImpulse(cp.v(0, this.weight * 1500), cp.v(0, 0)); // 上向き

        this.addChild(this.tankSprite);
    },
    createFloor: function() {
        // 床を静的剛体として作る
        var floorThickness = 10;

        var bottomBar = new cp.SegmentShape(this.space.staticBody, cp.v(0, 50), cp.v(640,50), floorThickness);
        bottomBar.setFriction(1); //摩擦係数
        bottomBar.setElasticity(0.3); //弾性
        this.space.addShape(bottomBar);

        var topBar = new cp.SegmentShape(this.space.staticBody, cp.v(0,1100), cp.v(640,1100), floorThickness);
        topBar.setFriction(1);
        topBar.setElasticity(0.3);
        this.space.addShape(topBar);

        var leftBar = new cp.SegmentShape(this.space.staticBody, cp.v(0,1100), cp.v(0,50), floorThickness);
        leftBar.setFriction(1);
        leftBar.setElasticity(0.3);
        this.space.addShape(leftBar);

        var rightBar = new cp.SegmentShape(this.space.staticBody, cp.v(640,1100), cp.v(640,50), floorThickness);
        rightBar.setFriction(1);
        rightBar.setElasticity(0.3);
        this.space.addShape(rightBar);
    },
    update: function(dt) {
        // 物理エンジンの更新
        this.space.step(dt);
    },
});
var HelloWorldScene = cc.Scene.extend({
    onEnter: function() {
 
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});