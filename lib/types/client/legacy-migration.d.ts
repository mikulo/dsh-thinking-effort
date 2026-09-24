import { type LegacyDecision } from '../compat/legacy-migration.js';
import type { SettingsApi, SettingsOp } from './types.js';
/** The plugin section and the control object it publishes, when either exists. */
export interface LegacyMigrationRead {
    readonly ns: string;
    readonly revision: number;
    readonly user: Record<string, unknown>;
}
/**
 * Read the migration control object from whichever section the running host
 * published. The Client cannot tell the settings model apart (its bridge only
 * answers `describe`/`mutate`), so it resolves the section id the way every
 * other plugin setting does, through `pluginSection`.
 *
 * A describe that reports an error, or a host that publishes no such section,
 * both read as "nothing to ask about" — the caller has nothing to render either
 * way, and the next poll retries.
 */
export declare function readLegacyMigration(settings: SettingsApi): Promise<LegacyMigrationRead | undefined>;
/** Whether the host is asking, from one already-read control object. */
export declare function pendingMigrationOf(user: unknown): boolean;
/** The decision the host already recorded, if any. */
export declare function recordedDecisionOf(user: unknown): LegacyDecision | undefined;
/** The `lastResult` of one already-read control object. */
export declare function lastResultOf(user: unknown): string;
/** One decision write into the plugin's own section. */
export declare function decisionOps(decision: LegacyDecision): SettingsOp[];
/**
 * Write one decision.
 *
 * The host returns a `ClientResult`, so a refusal arrives as `ok: false` rather
 * than a rejection; it is rethrown as an `Error` so the component has one
 * failure path to render.
 */
export declare function writeLegacyDecision(settings: SettingsApi, target: LegacyMigrationRead, decision: LegacyDecision): Promise<void>;
