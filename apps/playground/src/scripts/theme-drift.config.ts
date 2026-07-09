export type VariableDriftSetting = {
  variable: string;
  enabled: boolean;
  range?: number;
};

export type DriftConfig = {
  sensitivity: number;
  defaultRange: number;
  targets: VariableDriftSetting[];
};

export const driftConfig: DriftConfig = {
  // Global sensitivity: how intensely the mouse position scales the drift (0 = static, 1 = maximum)
  sensitivity: 0.5,

  // Default hue swing radius (in degrees) for variables without a specific range override
  defaultRange: 20,

  // Toggle or tune any OKLCH hue variable from your theme below.
  // Grouped by role so it's obvious at a glance what moves and what stays put:
  // FOREGROUND (text) drifts, HIGHLIGHTS (accents) drift, BACKGROUND stays anchored.
  targets: [
    // --- Foreground (text) — drifting ---
    { variable: '--foreground-h', enabled: true, range: 15 },
    { variable: '--foreground-muted-h', enabled: true, range: 15 },
    { variable: '--foreground-dim-h', enabled: true, range: 15 },

    // --- Highlights (semantic accent tokens) — drifting ---
    { variable: '--primary-h', enabled: true, range: 40 },
    { variable: '--secondary-h', enabled: true, range: 30 },
    { variable: '--accent-h', enabled: true, range: 45 },
    { variable: '--glow-color-h', enabled: true, range: 60 },
    // left static: warning/destructive hues are learned danger cues, drifting them would undercut that signal
    { variable: '--warning-h', enabled: false, range: 20 },
    { variable: '--destructive-h', enabled: false, range: 15 },

    // --- Highlights (base hue palette feeding tags & accents) — drifting ---
    { variable: '--red-h', enabled: true, range: 25 },
    { variable: '--green-h', enabled: true, range: 25 },
    { variable: '--yellow-h', enabled: true, range: 25 },
    { variable: '--blue-h', enabled: true, range: 100 },
    { variable: '--purple-h', enabled: true, range: 25 },
    { variable: '--aqua-h', enabled: true, range: 25 },
    { variable: '--orange-h', enabled: true, range: 25 },

    // --- Background — intentionally OFF, keeps the page anchored ---
    { variable: '--background-h', enabled: true, range: 10 },
    { variable: '--surface-h', enabled: true, range: 10 },
    { variable: '--surface-raised-h', enabled: true, range: 10 },
    { variable: '--border-h', enabled: true, range: 10 },

    // --- On-highlight label text — OFF, these alias straight to --background-h,
    //     so drifting them would just be background drift wearing a disguise ---
    { variable: '--primary-foreground-h', enabled: true },
    { variable: '--secondary-foreground-h', enabled: true },
    { variable: '--accent-foreground-h', enabled: true },
    { variable: '--warning-foreground-h', enabled: true },
    { variable: '--destructive-foreground-h', enabled: true }
  ] as VariableDriftSetting[]
};
