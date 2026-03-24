export function createIssue(category, message, severity = "warn", source) {
    return { severity, category, message, source };
}
export function createSuggestion(kind, label, extras = {}) {
    return { kind, label, ...extras };
}
export function createHeuristicSignature(kind, props = {}) {
    return { kind, ...props };
}
export function summarizeCategories(issues) {
    const totals = {
        naming: 0,
        structure: 0,
        annotations: 0,
        typography: 0,
        motion: 0,
        assets: 0,
        responsive: 0,
        content: 0,
        other: 0,
    };
    for (const issue of issues) {
        totals[issue.category] += 1;
    }
    return totals;
}
