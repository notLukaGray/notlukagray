export type { FontSlotName } from "@pb/core/internal/element-font-slot";
export {
  resolveEntranceMotion,
  resolveEntranceMotionsForElement,
} from "@pb/core/internal/page-builder-resolve-entrance-motions";
export {
  evaluateConditions,
  type ConditionOperator,
  type VariableCondition,
  type VisibleWhenConfig,
} from "@pb/contracts/page-builder/core/page-builder-condition-evaluator";
export {
  useVariableStore,
  useVariable,
  useActionLogStore,
  getVariable,
  setVariable,
  hasVariable,
  clearVariables,
} from "./page-builder/runtime/page-builder-variable-store";
