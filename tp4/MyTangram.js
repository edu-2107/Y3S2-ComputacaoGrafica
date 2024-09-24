import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.trianglesmallPurple = new MyTriangleSmall(this.scene, [0.0, 0.0, 0.0, 0.5, 0.25, 0.25, 0.0, 0.0, 0.0, 0.5, 0.25, 0.25]);
        this.trianglesmallRed = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.75, 0.75, 0.5, 0.5, 0.25, 0.75, 0.75, 0.75, 0.5, 0.5]);
        this.trianglebigOrange = new MyTriangleBig(this.scene, [1.0, 1.0, 1.0, 0.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.0, 0.5, 0.5]);
        this.trianglebigBlue = new MyTriangleBig(this.scene, [1.0, 0.0, 0.0, 0.0, 0.5, 0.5, 1.0, 0.0, 0.0, 0.0, 0.5, 0.5]);
        this.initMaterials();
	}
	
    initMaterials(){

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.5, 0.8, 0.1, 1.0);
        this.texture.setDiffuse(0, 0, 0, 0);
        this.texture.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.texture.setShininess(10.0);

        this.textureM = new CGFtexture(this.scene, 'images/tangram.png');
        this.texture.setTexture(this.textureM);


        //diamond
        this.diamondM= new CGFappearance(this.scene);
        this.diamondM.setAmbient(0.5, 0.8, 0.1, 1.0);
        this.diamondM.setDiffuse(0, 0, 0, 0);
        this.diamondM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.diamondM.setShininess(10.0);

        //triangle
        this.triangleM= new CGFappearance(this.scene);
        this.triangleM.setAmbient(1, 0.71, 0.76, 1.0);
        this.triangleM.setDiffuse(0, 0, 0, 0);
        this.triangleM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleM.setShininess(10.0);

        //parallelogram
        this.parallellogramM= new CGFappearance(this.scene);
        this.parallellogramM.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.parallellogramM.setDiffuse(0, 0, 0, 0);
        this.parallellogramM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.parallellogramM.setShininess(10.0);

        //triangle small red
        this.triangleSmallRedM= new CGFappearance(this.scene);
        this.triangleSmallRedM.setAmbient(1.0, 0, 0, 1.0);
        this.triangleSmallRedM.setDiffuse(0, 0, 0, 0);
        this.triangleSmallRedM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleSmallRedM.setShininess(10.0);

        //triangle small purple
        this.triangleSmallPurpleM= new CGFappearance(this.scene);
        this.triangleSmallPurpleM.setAmbient(0.5, 0, 0.5, 1.0);
        this.triangleSmallPurpleM.setDiffuse(0, 0, 0, 0);
        this.triangleSmallPurpleM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleSmallPurpleM.setShininess(10.0);

        //triangle big blue
        this.triangleBigBlueM= new CGFappearance(this.scene);
        this.triangleBigBlueM.setAmbient(0, 0, 1.0, 1.0);
        this.triangleBigBlueM.setDiffuse(0, 0, 0, 0);
        this.triangleBigBlueM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBigBlueM.setShininess(10.0);

        //triangle big orange
        this.triangleBigOrangeM= new CGFappearance(this.scene);
        this.triangleBigOrangeM.setAmbient(1.0, 0.5, 0, 1.0);
        this.triangleBigOrangeM.setDiffuse(0, 0, 0, 0);
        this.triangleBigOrangeM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBigOrangeM.setShininess(10.0);


        //diamond texture
        this.diamondM2= new CGFappearance(this.scene);
        this.diamondTexture = new CGFtexture(this.scene, './images/tangram.png');
        this.diamondM2.setTexture(this.diamondTexture);
    }

	display() {

        //diamond
        this.scene.pushMatrix();
        let translationMatrix = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            1,3,0,1
        ]
        this.scene.multMatrix(translationMatrix);
        this.texture.apply();
        //this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // Triangle orange
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.translate(-1.1,-2,0);
        //this.triangleBigOrangeM.apply();
        this.texture.apply();
        this.trianglebigOrange.display();
        this.scene.popMatrix();

        // Triangle blue
        this.scene.pushMatrix();
        this.scene.translate(0,-0.9,0);
        //this.triangleBigBlueM.apply();
        this.texture.apply();
        this.trianglebigBlue.display();
        this.scene.popMatrix();

        // Parallelogram yellow
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(-3,-1.9,0);
        //this.parallellogramM.apply();
        this.texture.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        
        // Triangle purple
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0,0,1);
        this.scene.translate(-3.5,1.9,0);
        //this.triangleSmallPurpleM.apply();
        this.texture.apply();
        this.trianglesmallPurple.display();
        this.scene.popMatrix();

        // Triangle pink
        this.scene.pushMatrix();
        this.scene.translate(-1.5,-0.9,0)
        this.scene.rotate(Math.PI/4, 0,0,1);
        //this.triangleM.apply();
        this.texture.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Triangle red
        this.scene.pushMatrix();
        this.scene.translate(-3.4,-0.9,0);
        //this.triangleSmallRedM.apply();
        this.texture.apply();
        this.trianglesmallRed.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.trianglebig.enableNormalViz();
        this.trianglesmall.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.trianglebig.disableNormalViz();
        this.trianglesmall.disableNormalViz();
    }
}
