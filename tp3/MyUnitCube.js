import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0.5,	//0
			-0.5, -0.5, 0.5, //1
            0.5, -0.5, 0.5, //2
            0.5, 0.5, 0.5, //3
            -0.5, 0.5, -0.5, //4	
			-0.5, -0.5, -0.5, //5
            0.5, -0.5, -0.5, //6
            0.5, 0.5, -0.5, //7


			-0.5, 0.5, 0.5,	//0
			-0.5, -0.5, 0.5, //1
            0.5, -0.5, 0.5, //2
            0.5, 0.5, 0.5, //3
            -0.5, 0.5, -0.5, //4	
			-0.5, -0.5, -0.5, //5
            0.5, -0.5, -0.5, //6
            0.5, 0.5, -0.5, //7


			-0.5, 0.5, 0.5,	//0
			-0.5, -0.5, 0.5, //1
            0.5, -0.5, 0.5, //2
            0.5, 0.5, 0.5, //3
            -0.5, 0.5, -0.5, //4	
			-0.5, -0.5, -0.5, //5
            0.5, -0.5, -0.5, //6
            0.5, 0.5, -0.5, //7
			
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 3, 0, // plano Z
			1, 2, 3, // plano Z
            
            5, 7, 4, // plano Z
            5, 6, 7, // plano Z

            4, 3, 0, // plano Y
            4, 7, 3, // plano Y

            5, 2, 1, // plano Y
            5, 6, 2, // plano Y

            6, 3, 2, // plano X
            6, 7, 3, // plano X

            5, 0, 1, // plano X
            5, 4, 0, // plano X

			0, 3, 1, // plano Z (opposite face)
			3, 2, 1, // plano Z (opposite face)
			4, 7, 5, // plano Z (opposite face)
			7, 6, 5, // plano Z (opposite face)
			0, 3, 4, // plano Y (opposite face)
			3, 7, 4, // plano Y (opposite face)
			1, 2, 5, // plano Y (opposite face)
			2, 6, 5, // plano Y (opposite face)
			2, 3, 6, // plano X (opposite face)
			3, 7, 6, // plano X (opposite face)
			1, 0, 5, // plano X (opposite face)
			0, 4, 5  // plano X (opposite face)
		];

		this.normals = [
			0, 0, 1,    
			0, 0, 1,    
			0, 0, 1,    
			0, 0, 1,    

			0, 0, -1,   
        	0, 0, -1,   
        	0, 0, -1,   
        	0, 0, -1,   

			0, 1, 0,    
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,

			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,

			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
		];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

