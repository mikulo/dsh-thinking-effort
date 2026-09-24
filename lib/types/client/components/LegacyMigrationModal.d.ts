import { type Palette } from '../theme.js';
import type { SettingsApi, Translation } from '../types.js';
interface Props {
    readonly settings: SettingsApi;
    readonly t: Translation;
    readonly palette?: Palette;
}
/**
 * The prompt for legacy data DSH's 0.1.7 settings rename stranded.
 *
 * It renders into the shell's overlay slot rather than into the plugin's
 * settings page, because the point is to ask before the user has any reason to
 * open Settings. It reads the control object the Host wrote into the plugin's
 * own section and writes back exactly one decision; the Host performs the
 * migration, so no file access happens here.
 *
 * The Client has no push channel for settings changes — its bridge answers
 * `describe`/`mutate` only — so the two waiting phases poll, bounded by
 * {@link POLL_ATTEMPTS}. `later` stops polling for this page load, which is what
 * keeps the dialog from reappearing the moment the user postpones it.
 */
export declare function LegacyMigrationModal({ settings, t, palette }: Props): import("react").JSX.Element | null;
export {};
