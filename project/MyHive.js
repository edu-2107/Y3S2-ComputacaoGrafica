import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyHive
 * @constructor
 * @param scene 
 * @param width
 * @param height
 * @param depth
 */
export class MyHive extends CGFobject {
    constructor(scene, width, height, depth) {
        super(scene);

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.quad = new MyQuad(this.scene, this.width, this.height, this.depth);
        
        this.initMaterials();
    }

    initMaterials(){
        this.textureH = new CGFappearance(this.scene);
        this.hiveTexture = new CGFtexture(this.scene, "textures/hivetexture.jpg");
        this.textureH.setAmbient(1, 1, 1, 1.0);
        this.textureH.setShininess(10.0);
        this.textureH.setTexture(this.hiveTexture);
    }

    display() {
        // Front
        this.scene.pushMatrix();
        this.scene.translate(this.depth / 2, 0, 0);
        this.textureH.apply();
        this.quad.display();
        this.scene.popMatrix();
    
        // Back
        this.scene.pushMatrix();
        
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-this.depth / 2, 0, 0);
        this.textureH.apply();
        this.quad.display();
        this.scene.popMatrix();
    
        // Left
        this.scene.pushMatrix();
        this.scene.translate(this.width / 2, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.textureH.apply();
        this.quad.display();
        this.scene.popMatrix();
    
        // Right
        this.scene.pushMatrix();
        this.scene.translate(this.width / 2, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.textureH.apply();
        this.quad.display();
        this.scene.popMatrix();
    
        // Top
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, this.height / 2, 0);
        
        this.textureH.apply();
        this.quad.display();
        this.scene.popMatrix();
    
        // Bottom
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, -this.height / 2, 0);
        this.textureH.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}
