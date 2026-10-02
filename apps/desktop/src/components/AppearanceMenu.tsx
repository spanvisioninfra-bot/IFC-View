import { For, Show, createSignal, onCleanup, onMount } from 'solid-js';
import {
  CANVAS_OPTIONS,
  SPANVISION_MONO_THEME,
  canvasColor,
  setCanvasColor,
} from '@/state/appearance-store';
import { t } from '@/state/locale-store';
import styles from '@/styles/components/AppearanceMenu.module.css';

export default function AppearanceMenu() {
  const [open, setOpen] = createSignal(false);
  let containerRef!: HTMLDivElement;

  const handleClickOutside = (event: MouseEvent) => {
    if (open() && !containerRef.contains(event.target as Node)) setOpen(false);
  };

  onMount(() => document.addEventListener('mousedown', handleClickOutside));
  onCleanup(() => document.removeEventListener('mousedown', handleClickOutside));

  return (
    <div ref={containerRef} class={styles.container}>
      <button
        class={`${styles.trigger} ${open() ? styles.triggerActive : ''}`}
        onClick={() => setOpen((value) => !value)}
        title={t('appearance.change')}
        aria-label={t('appearance.change')}
        aria-expanded={open()}
      >
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4" />
          <path d="M9 2.5a6.5 6.5 0 0 1 0 13Z" fill="currentColor" />
        </svg>
      </button>

      <Show when={open()}>
        <div class={styles.popover} role="dialog" aria-label={t('appearance.title')}>
          <div class={styles.eyebrow}>{t('appearance.title')}</div>
          <div class={styles.themeRow}>
            <span class={styles.themeMark}>SV</span>
            <span>
              <strong>Spanvision Mono</strong>
              <small>{SPANVISION_MONO_THEME}</small>
            </span>
            <svg class={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div class={styles.canvasLabel}>{t('appearance.canvas')}</div>
          <div class={styles.swatches}>
            <For each={CANVAS_OPTIONS}>
              {(option) => (
                <button
                  class={`${styles.swatch} ${canvasColor() === option.color ? styles.swatchActive : ''}`}
                  style={{ '--swatch-color': option.color }}
                  onClick={() => setCanvasColor(option.color)}
                  title={`${t(`appearance.canvas.${option.id}`)} · ${option.color}`}
                  aria-label={`${t(`appearance.canvas.${option.id}`)} ${option.color}`}
                  aria-pressed={canvasColor() === option.color}
                >
                  <span />
                </button>
              )}
            </For>
          </div>
          <p class={styles.savedNote}>{t('appearance.saved')}</p>
        </div>
      </Show>
    </div>
  );
}
