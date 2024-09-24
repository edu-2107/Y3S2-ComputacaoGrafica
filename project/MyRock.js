import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene 
 * @param slices
 * @param stacks
 * @param scale
 */
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, scale) {
        super(scene);
        
        this.slices = slices;
        this.stacks = stacks;
        this.scale = scale;
        
        this.initBuffers();
        this.initMaterials();
    }

    getHeight(){
        let minY = Infinity;
        let maxY = -Infinity;

        for (let i = 1; i < this.vertices.length; i += 3) {
            let y = this.vertices[i];
            if (y < minY) {
                minY = y;
            }
            if (y > maxY) {
                maxY = y;
            }
        }

        return maxY - minY;
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

                let scaleFactor = this.scale;
                x *= scaleFactor;
                y *= scaleFactor;
                z *= scaleFactor;

                let vertexScaleFactor = 1;
                
                if (slice > 0 && slice < this.slices) {
                    vertexScaleFactor += Math.random() * 0.3; 
                }
                
                x *= vertexScaleFactor;
                y *= vertexScaleFactor;
                z *= vertexScaleFactor;

                let u = slice / this.slices;
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
        this.textureR = new CGFappearance(this.scene);
        this.rockTexture = new CGFtexture(this.scene, "textures/rocktexture.jpg");
        this.textureR.setAmbient(1, 1, 1, 1.0);
        this.textureR.setShininess(10.0);
        this.textureR.setTexture(this.rockTexture);
    }

    display(){
        this.scene.pushMatrix();
        this.textureR.apply();
        super.display();
        this.scene.popMatrix();
    }
}
