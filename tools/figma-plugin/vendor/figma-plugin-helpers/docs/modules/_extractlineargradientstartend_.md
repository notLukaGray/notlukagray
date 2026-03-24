# Module: "extractLinearGradientStartEnd"

## Index

### Functions

- [extractLinearGradientParamsFromTransform](_extractlineargradientstartend_.md#extractlineargradientparamsfromtransform)

## Functions

### extractLinearGradientParamsFromTransform

▸ **extractLinearGradientParamsFromTransform**(`shapeWidth`: number, `shapeHeight`: number, `t`: Transform): _object_

_Defined in [extractLinearGradientStartEnd.ts:12](https://github.com/figma-plugin-helper-functions/figma-plugin-helpers/blob/5f3a767/src/helpers/extractLinearGradientStartEnd.ts#L12)_

This method can extract the x and y positions of the start and end of the linear gradient
(scale is not important here)

**Parameters:**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| `shapeWidth`  | number    | number      |
| `shapeHeight` | number    | number      |
| `t`           | Transform | Transform   |

**Returns:** _object_

- **end**: _number[]_ = [startEnd[1][0] _ shapeWidth, startEnd[1][1] _ shapeHeight]

- **start**: _number[]_ = [startEnd[0][0] _ shapeWidth, startEnd[0][1] _ shapeHeight]
