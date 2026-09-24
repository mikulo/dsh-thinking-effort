import { type LegacyCandidate } from '../compat/legacy-migration.js';
import type { HostSettings, SettingsPathOp } from './types.js';
/** One candidate as a path write into the plugin's own section. */
export declare function opsForCandidates(candidates: readonly LegacyCandidate[]): SettingsPathOp[];
export interface RollbackSnapshotInput {
    /** The section id the plugin owns on this host; its library keys are dropped. */
    readonly pluginNs: string;
    /** The live user layers, keyed by the section id each was read from. */
    readonly sections: Readonly<Record<string, Record<string, unknown>>>;
    readonly createdAt: string;
}
/**
 * A rollback copy of the settings a migration is about to extend.
 *
 * Built from the user layers alone — never from a resolved section — so
 * restoring it cannot pin the schema defaults a resolved read would have
 * carried. `sourceProfile` reads `migration`, which is how the copy is told
 * apart from one the import feature took.
 *
 * @param input - the plugin's section id, the live user layers and a timestamp.
 * @returns the snapshot object, ready to be written to `autoBackup`.
 */
export declare function rollbackSnapshot(input: RollbackSnapshotInput): Record<string, unknown>;
export interface ApplyLegacyMigrationInput {
    readonly settings: HostSettings;
    /** The plugin's own settings section id on the running host. */
    readonly ns: string;
    readonly candidates: readonly LegacyCandidate[];
    /** Builds the rollback snapshot; called once, before the batch is sent. */
    readonly snapshot: () => Record<string, unknown>;
    /** Clears the control object once the values have landed. */
    readonly clear: () => Promise<void>;
}
/**
 * Write the offered values into the plugin's own settings section, preceded by
 * a rollback snapshot of the settings they extend.
 *
 * Both halves ride ONE `mutate`: the snapshot is the batch's first op and the
 * values follow it. That ordering is what makes "a rollback copy exists" and
 * "the migration happened" the same fact — a batch the host refuses cannot
 * leave a snapshot of a migration that never ran, and it cannot half-apply.
 *
 * Every value op targets a path the plugin's schema declares and the user has
 * not set, so the batch never overwrites a value the user chose; the snapshot
 * is there because the migration does extend their document.
 *
 * Failures are reported as a `lastResult` string rather than thrown: a refused
 * write is a state the prompt has to show and offer to retry, not an error that
 * should escape into the settings event that triggered it.
 *
 * @param input - the service, section id, candidates, snapshot builder and clearer.
 * @returns `applied`, or `failed:<reason>`.
 */
export declare function applyLegacyMigration(input: ApplyLegacyMigrationInput): Promise<string>;
