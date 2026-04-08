/**
 * Condition evaluator for page-builder conditionalAction.
 * Handles both shorthand (variable/operator/value) and multi-condition arrays.
 * Exported for use by use-page-builder-action-runner and any future evaluators.
 */
import type { JsonPrimitive, JsonValue } from "./page-builder-types/json-value";

export type ConditionOperator =
  | "equals"
  | "notEquals"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "contains"
  | "startsWith";

export interface VariableCondition {
  variable: string;
  operator: ConditionOperator;
  value: JsonPrimitive;
}

/** Used for both the primary condition block and elseIf branches. */
export interface VisibleWhenConfig {
  /** Shorthand: single condition via variable/operator/value */
  variable?: string;
  operator?: ConditionOperator;
  value?: JsonPrimitive;
  /** Multi-condition alternative to shorthand */
  conditions?: VariableCondition[];
  /** "and" = all must pass (default); "or" = at least one must pass */
  logic?: "and" | "or";
}

function evaluateSingleCondition(
  variableValue: JsonValue | undefined,
  operator: ConditionOperator,
  compareValue: JsonValue | undefined
): boolean {
  switch (operator) {
    case "equals":
      return Object.is(variableValue, compareValue);
    case "notEquals":
      return !Object.is(variableValue, compareValue);
    case "gt":
      return Number(variableValue) > Number(compareValue);
    case "gte":
      return Number(variableValue) >= Number(compareValue);
    case "lt":
      return Number(variableValue) < Number(compareValue);
    case "lte":
      return Number(variableValue) <= Number(compareValue);
    case "contains":
      return String(variableValue).includes(String(compareValue));
    case "startsWith":
      return String(variableValue).startsWith(String(compareValue));
    default:
      return false;
  }
}

/**
 * Evaluates a condition block against the current variable store snapshot.
 *
 * Supports:
 * - Shorthand: `{ variable, operator, value }` — single condition
 * - Multi-condition: `{ conditions: [...], logic: "and" | "or" }`
 *
 * If neither form is provided, returns `true` (no-op / always pass).
 *
 * @param config  The condition configuration from the action payload.
 * @param variables  A snapshot of the variable store (`useVariableStore.getState().variables`).
 */
export function evaluateConditions(
  config: VisibleWhenConfig,
  variables: Record<string, JsonValue>
): boolean {
  const logic = config.logic ?? "and";

  // Multi-condition array form
  if (config.conditions && config.conditions.length > 0) {
    const results = config.conditions.map((cond) =>
      evaluateSingleCondition(variables[cond.variable], cond.operator, cond.value)
    );
    return logic === "or" ? results.some(Boolean) : results.every(Boolean);
  }

  // Shorthand form
  if (config.variable !== undefined && config.operator !== undefined) {
    return evaluateSingleCondition(variables[config.variable], config.operator, config.value);
  }

  // No condition specified — treat as always-true
  return true;
}
