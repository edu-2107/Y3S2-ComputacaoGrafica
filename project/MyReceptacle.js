import { CGFobject } from '../lib/CGF.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene 
 * @param slices
 * @param stacks
 * @param radius
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = (stack * Math.PI) / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);
    
            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = (slice * 2 * Math.PI) / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);
    
                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;
    
                x *= this.radius;
                y *= this.radius;
                z *= this.radius;
    
                let u = -slice / this.slices;
                let v = stack / this.stacks;
    
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                    this.indices.push(first);
                    this.indices.push(first + 1);
                    this.indices.push(second);

                    this.indices.push(second);
                    this.indices.push(first + 1);
                    this.indices.push(second + 1);
            
                    this.indices.push(first);
                    this.indices.push(second);
                    this.indices.push(first + 1);

                    this.indices.push(second);
                    this.indices.push(second + 1);
                    this.indices.push(first + 1);
            }
        }

        this.texCoords = [];
        for (let latNumber = 0; latNumber <= this.stacks; latNumber++) {
            for (let longNumber = 0; longNumber <= this.slices; longNumber++) {
                let u = longNumber / this.slices;
                let v = latNumber / this.stacks;
                this.texCoords.push(u, v);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    

}
