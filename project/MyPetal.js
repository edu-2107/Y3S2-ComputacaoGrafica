import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene 
 * @param rotationAngle
 * @param petalRadius
 */
export class MyPetal extends CGFobject {
	constructor(scene, rotationAngle, petalRadius) {
		super(scene);
		this.rotationAngle = rotationAngle;
		this.petalRadius = petalRadius;

		this.triangle = new MyTriangle(this.scene, this.petalRadius);

	}

	display() {
		// Display 1 triangle
        this.scene.pushMatrix();
		this.scene.rotate(this.rotationAngle, 1, 0,0);
        this.triangle.display();
        this.scene.popMatrix();

		//Display 2 triangle
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.triangle.display();
		this.scene.popMatrix();
	}
}

