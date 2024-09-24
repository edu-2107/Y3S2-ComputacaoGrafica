#version 300 es
precision highp float;

in vec3 aVertexPosition;
in vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;
uniform float normScale;

out vec2 vTextureCoord;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    
    // Oscillate the y-coordinate based on the vertex position and time
    offset.x = normScale * 0.1 * sin(aVertexPosition.y * 10.0 + timeFactor);

    // Apply the transformation
    vec3 displacedPosition = aVertexPosition + offset;
    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);

    vTextureCoord = aTextureCoord;
}
