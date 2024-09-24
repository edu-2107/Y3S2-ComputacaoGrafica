import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyGrass } from "./MyGrass.js";

/**
 * getStringFromUrl(url)
 * Function to load a text file from a URL (used to display shader sources)
 */

function getStringFromUrl(url) {
	var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
    return xmlHttpReq.responseText;
}

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Enable alpha blending
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.panoramaTexture = new CGFtexture(this, "images/panorama.png");
    this.earthTexture = new CGFtexture(this, "images/earth.png");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 30, 30, this.earthTexture);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.garden = new MyGarden(this, 5, 5);
    this.rockset = new MyRockSet(this, 29, 2, 2.3);
    this.bee = new MyBee(this);
    this.grass = new MyGrass(this, 10, 50, 50);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayGarden = true;
    this.displayRockSet = true;
    this.displayBee = true;
    this.displayGrass = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/grass.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");
    this.grassShader.setUniformsValues({ normScale: 6 });
    this.setUpdatePeriod(50);

  }

  // Show/hide shader code
	onShaderCodeVizChanged(v) {
		if (v)
			this.shadersDiv.style.display = "block";
		else
			this.shadersDiv.style.display = "none";
	}

	// Called when selected shader changes
	onSelectedShaderChanged(v) {
		// update shader code
		this.vShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[v].vertexURL) + "</xmp>";
		this.fShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[v].fragmentURL) + "</xmp>";

		// update scale factor
		this.onScaleFactorChanged(this.scaleFactor);
	}

  update(t) {
			// Dividing the time by 100 "slows down" the variation (i.e. in 100 ms timeFactor increases 1 unit).
			// Doing the modulus (%) by 100 makes the timeFactor loop between 0 and 99
			// ( so the loop period of timeFactor is 100 times 100 ms = 10s ; the actual animation loop depends on how timeFactor is used in the shader )
			this.beeshader.setUniformsValues({ timeFactor: t / 1000 % 1 });
      this.beeshader.setUniformsValues({ wingFlapFactor: t / 100 % 100 });
	}

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(0.5, 0.5, 0.5, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(5, 5, 5),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    let text = "Keys pressed: ";
    let keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
    }

    if (keysPressed) {
      console.log(text);
    }
  }

  update(t) {
    this.checkKeys();
    if (this.displayBee) {
      this.bee.update(t);
    }

    this.grassShader.setUniformsValues({timeFactor: t / 100 % 100});
    super.update(t);
  }


  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.appearance.apply();
    this.pushMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
    if (this.displaySphere) this.sphere.display();
    if (this.displayPanorama) this.panorama.display();
    if (this.displayGarden) this.garden.display();
    if (this.displayRockSet) this.rockset.display();
    if (this.displayBee) this.bee.display();
    if (this.displayGrass){
      this.setActiveShader(this.grassShader);
      this.grass.display();
      this.setActiveShader(this.defaultShader);
    }

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
