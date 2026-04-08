/**
 * Generates a specular-highlight ImageData for a rounded-rectangle glass element.
 * The specular ring simulates ambient light catching the inner rim of the bevel.
 *
 * Browser-compatible: uses the native `ImageData` constructor.
 * Ported from kube.io/liquid-glass-css-svg.
 */
export function calculateRefractionSpecular(
  objectWidth: number,
  objectHeight: number,
  radius: number,
  bezelWidth: number,
  specularAngle = Math.PI / 3,
  dpr?: number
): ImageData {
  const devicePixelRatio =
    dpr ?? (typeof window !== "undefined" ? (window.devicePixelRatio ?? 1) : 1);

  const bufferWidth = Math.round(objectWidth * devicePixelRatio);
  const bufferHeight = Math.round(objectHeight * devicePixelRatio);
  const imageData = new ImageData(bufferWidth, bufferHeight);

  const radius_ = radius * devicePixelRatio;
  const bezel_ = bezelWidth * devicePixelRatio;

  const specular_vector: [number, number] = [Math.cos(specularAngle), Math.sin(specularAngle)];

  // Fill fully transparent
  new Uint32Array(imageData.data.buffer).fill(0x00000000);

  const radiusSquared = radius_ ** 2;
  const radiusPlusOneSquared = (radius_ + devicePixelRatio) ** 2;
  const radiusMinusBezelSquared = (radius_ - bezel_) ** 2;

  const widthBetweenRadiuses = bufferWidth - radius_ * 2;
  const heightBetweenRadiuses = bufferHeight - radius_ * 2;

  for (let y1 = 0; y1 < bufferHeight; y1++) {
    for (let x1 = 0; x1 < bufferWidth; x1++) {
      const idx = (y1 * bufferWidth + x1) * 4;

      const isOnLeftSide = x1 < radius_;
      const isOnRightSide = x1 >= bufferWidth - radius_;
      const isOnTopSide = y1 < radius_;
      const isOnBottomSide = y1 >= bufferHeight - radius_;

      const x = isOnLeftSide
        ? x1 - radius_
        : isOnRightSide
          ? x1 - radius_ - widthBetweenRadiuses
          : 0;

      const y = isOnTopSide
        ? y1 - radius_
        : isOnBottomSide
          ? y1 - radius_ - heightBetweenRadiuses
          : 0;

      const distanceToCenterSquared = x * x + y * y;

      const isInBezel =
        distanceToCenterSquared <= radiusPlusOneSquared &&
        distanceToCenterSquared >= radiusMinusBezelSquared;

      if (isInBezel) {
        const distanceFromCenter = Math.sqrt(distanceToCenterSquared);
        const distanceFromSide = radius_ - distanceFromCenter;

        const opacity =
          distanceToCenterSquared < radiusSquared
            ? 1
            : 1 -
              (distanceFromCenter - Math.sqrt(radiusSquared)) /
                (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));

        const cos = x / distanceFromCenter;
        const sin = -y / distanceFromCenter;

        const dotProduct = Math.abs(cos * specular_vector[0] + sin * specular_vector[1]);

        const coefficient =
          dotProduct * Math.sqrt(1 - (1 - distanceFromSide / (1 * devicePixelRatio)) ** 2);

        const color = 255 * coefficient;
        const finalOpacity = color * coefficient * opacity;

        imageData.data[idx] = color;
        imageData.data[idx + 1] = color;
        imageData.data[idx + 2] = color;
        imageData.data[idx + 3] = finalOpacity;
      }
    }
  }

  return imageData;
}
