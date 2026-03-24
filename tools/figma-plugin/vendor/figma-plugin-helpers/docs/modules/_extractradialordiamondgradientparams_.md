# Module: "extractRadialOrDiamondGradientParams"

## Index

### Functions

- [extractRadialOrDiamondGradientParams](_extractradialordiamondgradientparams_.md#extractradialordiamondgradientparams)

## Functions

### extractRadialOrDiamondGradientParams

▸ **extractRadialOrDiamondGradientParams**(`shapeWidth`: number, `shapeHeight`: number, `t`: number[][]): _object_

_Defined in [extractRadialOrDiamondGradientParams.ts:11](https://github.com/figma-plugin-helper-functions/figma-plugin-helpers/blob/5f3a767/src/helpers/extractRadialOrDiamondGradientParams.ts#L11)_

This method can extract the rotation (in degrees), center point and radius for a radial or diamond gradient

**Parameters:**

| Name          | Type       | Description |
| ------------- | ---------- | ----------- |
| `shapeWidth`  | number     | -           |
| `shapeHeight` | number     | -           |
| `t`           | number[][] |             |

**Returns:** _object_

- **center**: _number[]_ = [centerPoint[0] _ shapeWidth, centerPoint[1] _ shapeHeight]

- **radius**: _number[]_ = [rx * shapeWidth, ry * shapeHeight]

- **rotation**: _number_ = angle
