attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

varying vec2 vTextureCoord;

uniform sampler2D uWaterMap;

void main() {

	vTextureCoord = aTextureCoord;

	vec3 offset = aVertexNormal * 0.1 * texture2D(uWaterMap, vTextureCoord + vec2(timeFactor, timeFactor)).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	
}

