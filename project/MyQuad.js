import {CGFobject} from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene
 */
export class MyQuad extends CGFobject {
	constructor(scene, width, height, depth) {
		super(scene);
		this.width = width;
        this.height = height;
        this.depth = depth;
        
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-this.width / 2, -this.height / 2, -this.depth / 2,  // V0
            -this.width / 2, -this.height / 2, this.depth / 2,   // V1
            -this.width / 2, this.height / 2, -this.depth / 2,   // V2
            -this.width / 2, this.height / 2, this.depth / 2,    // V3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
            0, 3, 2
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

}

