import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyLeaf
 * @constructor
 * @param scene
 */
export class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);

		this.cylinder = new MyCylinder(this.scene, 1, 0.20, 50, 1);
        this.triangle = new MyTriangle(this.scene, 2);

        this.rotationAngle = 0;
	}

    setRotation(angle) {
        this.rotationAngle = angle;
    }

	display() {
        // Display receptacle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        // Display 1 triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0);
        this.scene.translate(2.5, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

		//Display 2 triangle
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0);
        this.scene.translate(2.5, 0, 0);
		this.triangle.display();
		this.scene.popMatrix();
    }

    enableNormalViz() {
        this.cylinder.enableNormalViz();
        this.triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.cylinder.disableNormalViz();
        this.triangle.disableNormalViz();
    }
}
