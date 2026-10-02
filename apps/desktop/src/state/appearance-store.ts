import { createSignal } from 'solid-js';

export const SPANVISION_MONO_THEME = 'spanvision-mono';
export const DEFAULT_CANVAS_COLOR = '#1B1B1B';

export const CANVAS_OPTIONS = [
  { id: 'graphite', color: '#121212' },
  { id: 'workspace', color: '#1B1B1B' },
  { id: 'soft', color: '#202020' },
] as const;

const THEME_KEY = 'ifc-view.theme';
const CANVAS_KEY = 'ifc-view.canvas-color';
const supportedCanvasColors = new Set(CANVAS_OPTIONS.map((option) => option.color));

function getStoredCanvasColor(): string {
  try {
    const stored = localStorage.getItem(CANVAS_KEY)?.toUpperCase();
    if (stored && supportedCanvasColors.has(stored as (typeof CANVAS_OPTIONS)[number]['color'])) {
      return stored;
    }
  } catch {}
  return DEFAULT_CANVAS_COLOR;
}

export const [canvasColor, setCanvasColorSignal] = createSignal(getStoredCanvasColor());

function applyAppearance(color: string): void {
  document.documentElement.dataset.theme = SPANVISION_MONO_THEME;
  document.documentElement.style.setProperty('--canvas-bg', color);
}

export function initializeAppearance(): void {
  const color = canvasColor();
  applyAppearance(color);
  try {
    localStorage.setItem(THEME_KEY, SPANVISION_MONO_THEME);
    localStorage.setItem(CANVAS_KEY, color);
  } catch {}
}

export function setCanvasColor(color: string): void {
  const normalized = color.toUpperCase();
  if (!supportedCanvasColors.has(normalized as (typeof CANVAS_OPTIONS)[number]['color'])) return;
  setCanvasColorSignal(normalized);
  applyAppearance(normalized);
  try {
    localStorage.setItem(CANVAS_KEY, normalized);
  } catch {}
}
