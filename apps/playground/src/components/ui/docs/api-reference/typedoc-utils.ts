import type { JSONOutput } from 'typedoc';

/**
 * TypeDoc sometimes groups exports under Modules (kind 2) or Namespaces (kind 4) — typically when a
 * package has multiple entry points. We never want to render those containers as "symbols"
 * themselves: we descend into them to collect the actual members (classes, functions, types...).
 */
const CONTAINER_KINDS = new Set([2, 4]);

export function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
}

/**
 * DOM id for a symbol. Used both to place the anchor (ApiReference) and to build the href pointing
 * to it (ApiReferenceNav). Centralizing this function here guarantees both components stay in sync
 * — this mismatch was the root cause of the broken links.
 */
export function symbolId(name: string): string {
    return `symbol-${slugify(name)}`;
}

/**
 * Recursively flattens the TypeDoc tree to keep only the symbols actually rendered by ApiReference
 * (Modules/Namespaces are traversed instead of being listed as standalone entries).
 */
export function extractAllSymbols(
    node: JSONOutput.ProjectReflection | JSONOutput.DeclarationReflection
): JSONOutput.DeclarationReflection[] {
    const symbols: JSONOutput.DeclarationReflection[] = [];

    function traverse(item: JSONOutput.DeclarationReflection | JSONOutput.ProjectReflection) {
        if (!item.children) return;

        for (const child of item.children) {
            if (CONTAINER_KINDS.has(child.kind)) {
                traverse(child);
            } else {
                symbols.push(child);
            }
        }
    }

    traverse(node);
    return symbols;
}

export function commentOf(reflection?: {
    comment?: JSONOutput.Comment;
}): JSONOutput.Comment | undefined {
    return reflection?.comment;
}

export function getText(parts?: JSONOutput.CommentDisplayPart[]): string {
    return parts?.map((p) => p.text).join('') ?? '';
}

/**
 * Pluralizes a simple English label ("Class" -> "Classes", "Property" -> "Properties"). A naive `+
 * 's'` breaks on "Class" (-> "Classs") and "Property" (-> "Propertys"), hence this small dedicated
 * helper.
 */
export function pluralize(label: string): string {
    if (label.endsWith('y')) return `${label.slice(0, -1)}ies`;
    if (label.endsWith('s') || label.endsWith('x')) return `${label}es`;
    return `${label}s`;
}

/**
 * Formats a TypeDoc type into a short, readable string. Replaces raw JSON.stringify, which produced
 * very long strings with no spaces (the source of the horizontal overflow) and was unreadable for
 * complex types.
 */
export function formatType(type?: JSONOutput.SomeType, depth = 0): string {
    if (!type) return 'unknown';
    if (depth > 4) return '…';

    switch (type.type) {
        case 'intrinsic':
            return type.name;
        case 'literal':
            return typeof type.value === 'string' ? `"${type.value}"` : JSON.stringify(type.value);
        case 'reference': {
            const args = type.typeArguments?.length
                ? `<${type.typeArguments.map((t) => formatType(t, depth + 1)).join(', ')}>`
                : '';
            return `${type.name}${args}`;
        }
        case 'array':
            return `${formatType(type.elementType, depth + 1)}[]`;
        case 'union':
            return type.types.map((t) => formatType(t, depth + 1)).join(' | ');
        case 'intersection':
            return type.types.map((t) => formatType(t, depth + 1)).join(' & ');
        case 'tuple':
            return `[${(type.elements ?? []).map((t) => formatType(t, depth + 1)).join(', ')}]`;
        case 'reflection':
            return 'object';
        default:
            // Less common type kinds (conditional, mapped, query...): fall
            // back to the name if there is one instead of stringifying it.
            return (type as { name?: string }).name ?? 'unknown';
    }
}
