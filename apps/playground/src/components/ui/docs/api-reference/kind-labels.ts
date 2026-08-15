const KIND_LABELS: Record<number, string> = {
    1: 'Project',
    2: 'Module',
    4: 'Namespace',
    8: 'Enum',
    16: 'Enum Member',
    32: 'Variable',
    64: 'Function',
    128: 'Class',
    256: 'Interface',
    512: 'Constructor',
    1024: 'Property',
    2048: 'Method',
    4096: 'Call Signature',
    8192: 'Index Signature',
    16384: 'Constructor Signature',
    32768: 'Parameter',
    65536: 'Type Literal',
    131072: 'Type Parameter',
    262144: 'Accessor',
    524288: 'Get Signature',
    1048576: 'Set Signature',
    2097152: 'Type Alias',
    4194304: 'Reference',
    8388608: 'Document'
};

export function kindLabel(kind: number): string {
    return KIND_LABELS[kind] || 'Member';
}
