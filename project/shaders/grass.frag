#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

uniform sampler2D uSampler;

void main() {
    vec4 color = texture(uSampler, vTextureCoord);
    fragColor = color;
}
