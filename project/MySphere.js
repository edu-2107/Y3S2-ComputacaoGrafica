import { CGFobject, CGFappearance } from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene 
 * @param slices
 * @param stacks
 * @param texture
 */
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, texture) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.initBuffers();
        this.initMaterials();
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
    
                let scaleFactor = 200;
                x *= scaleFactor;
                y *= scaleFactor;
                z *= scaleFactor;
    
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

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initMaterials(){
        this.textureM = new CGFappearance(this.scene);
        this.textureM.setAmbient(1, 1, 1, 1.0);
        this.textureM.setShininess(10.0);
        this.textureM.setTexture(this.texture);
    }

    display(){
        this.textureM.apply();
        super.display();
    }
}
