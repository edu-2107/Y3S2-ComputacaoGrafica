import { CGFobject } from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        // Add vertexes for top and bottom
        for (let i = 0; i < this.slices; i++) {
            let angle = (i * 2 * Math.PI) / this.slices;
            let x = Math.cos(angle);
            let y = Math.sin(angle);
    
            // Bottom vertexes
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 0); 
    
            // Top vertexes
            this.vertices.push(x, y, 1);
            this.normals.push(0, 0, 0); 
        }
    
        // Add vertexes and normals
        for (let i = 0; i <= this.slices; i++) {
            let angle = (i * 2 * Math.PI) / this.slices;
            let x = Math.cos(angle);
            let y = Math.sin(angle);
    
            for (let j = 0; j <= this.stacks; j++) {
                let z = j / this.stacks;
    
                this.vertices.push(x, y, z);
    
                // Normals calculated with the same direction as the vector that connects the center of the cylinder and the vertex
                let normalLength = Math.sqrt(x * x + y * y);
                this.normals.push(x / normalLength, y / normalLength, 0);
            }
        }
    
        // Add indexes
        for (let i = 0; i < this.slices; i++) {
            let firstIndex = i * (this.stacks + 1) + this.slices * 2;
    
            for (let j = 0; j < this.stacks; j++) {
                let index1 = firstIndex + j;
                let index2 = firstIndex + j + 1;
                let index3 = firstIndex + j + this.stacks + 1;
                let index4 = firstIndex + j + this.stacks + 2;
    
                
                this.indices.push(index1, index3, index2);
                this.indices.push(index2, index3, index4);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

    updateBuffers(complexity){
    }
}