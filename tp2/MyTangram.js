import {CGFobject} from '../lib/CGF.js';
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
        this.trianglesmall = new MyTriangleSmall(this.scene);
        this.trianglebig = new MyTriangleBig(this.scene);
	}
	
	display() {

        this.scene.pushMatrix();
        let translationMatrix = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            1,3,0,1
        ]
        this.scene.multMatrix(translationMatrix);

        //diamond
        this.scene.setDiffuse(0, 1, 0);
        this.diamond.display();
        this.scene.popMatrix();

        //orange Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.translate(-1.1,-2,0);
        this.scene.setDiffuse(1, 0.5, 0);
        this.trianglebig.display();
        this.scene.popMatrix();

        //blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,-0.9,0);
        this.scene.setDiffuse(0, 0, 1);
        this.trianglebig.display();
        this.scene.popMatrix();

        //parallelogram
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(-3,-1.9,0);
        this.scene.setDiffuse(1, 1, 0);
        this.parallelogram.display();
        this.scene.popMatrix();
        
        //purple Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0,0,1);
        this.scene.translate(-3.5,1.9,0);
        this.scene.setDiffuse(1, 0, 1);
        this.trianglesmall.display();
        this.scene.popMatrix();

        //pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1.5,-0.9,0)
        this.scene.rotate(Math.PI/4, 0,0,1);
        this.scene.setDiffuse(1, 0.5, 1);
        this.triangle.display();
        this.scene.popMatrix();

        //red Triangle
        this.scene.pushMatrix();
        this.scene.translate(-3.4,-0.9,0);
        this.scene.setDiffuse(1, 0, 0);
        this.trianglesmall.display();
        this.scene.popMatrix();

    }
}
