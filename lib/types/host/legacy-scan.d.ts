import type { LegacyCandidate } from '../compat/legacy-migration.js';
/** Where one candidate came from, as the prompt reports it. */
export declare const LEGACY_MIGRATION_SOURCES: {
    readonly live: "llm-pi-ai";
    readonly document: "settings.yaml";
    readonly imported: "settings.yaml.imported";
};
/** One scan's result: what to offer, and an identity for that offer. */
export interface LegacyScan {
    readonly candidates: readonly LegacyCandidate[];
    readonly signature: string;
}
export interface LegacyScanInput {
    /** The DSH home the legacy documents live under. */
    readonly home: string;
    /** Reads one document; rejects when it does not exist or cannot be read. */
    readonly read: (path: string) => Promise<string>;
    /** The plugin's own settings section user layer, as published. */
    readonly ownUser: unknown;
    /** The live `llm-pi-ai` user layer, as published. */
    readonly llmPiAiUser: unknown;
}
/**
 * Every legacy leaf worth offering for migration.
 *
 * Sources are consulted in priority order and the first statement of a path
 * wins, so a document that is still live (`settings.yaml`) outranks the renamed
 * one, and the live `llm-pi-ai` layer outranks both. A path the plugin's own
 * section already declares is dropped: the migration only ever fills in values
 * the user has not set, so it cannot overwrite anything.
 *
 * @param input - the home, a document reader and both live user layers.
 * @returns the candidates and their signature; never throws.
 */
export declare function scanLegacyData(input: LegacyScanInput): Promise<LegacyScan>;
/**
 * A stable identity for one offer. Sorted by path, so document key order and
 * source order cannot change it; used to tell "the user already declined this
 * exact offer" from "the legacy data changed since they declined".
 */
export declare function signatureOf(candidates: readonly LegacyCandidate[]): string;
