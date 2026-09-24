/**
 * Which paths of a legacy settings document are fields this plugin owns.
 *
 * The traversal is driven by a declared shape, not by the document: dynamic keys
 * (`providers`, `models`) are declared as dicts so their live keys are read,
 * while every fixed key must be listed. A key the shape does not declare is
 * dropped at any depth, so arbitrary content a user hand-wrote into their
 * settings document can never become a write into the plugin's own section.
 */
/** One declared node of a legacy section. A scalar declares its own type. */
export type LegacyShape = {
    readonly kind: 'scalar';
    readonly type: 'string' | 'boolean';
} | {
    readonly kind: 'dict';
    readonly of: LegacyShape;
} | {
    readonly kind: 'object';
    readonly fields: Readonly<Record<string, LegacyShape>>;
};
/** One declared leaf found in a document. */
export interface LegacyLeaf {
    readonly path: readonly string[];
    readonly value: string | boolean;
}
/**
 * The legacy `dsh-thinking-effort` namespace. `profiles` and `autoBackup` are
 * deliberately absent: they hold the user's saved backup library, which the
 * migration does not move. `legacyMigration` is absent for a different reason —
 * it is this feature's own control object, not a user setting, so a document
 * stating one has nothing worth migrating. All three omissions are deliberate;
 * do not "fix" them by adding the keys.
 */
export declare const LEGACY_OWN_SHAPE: LegacyShape;
/**
 * The legacy `llm-pi-ai` namespace, of which this plugin ever wrote exactly one
 * key before 0.1.7. `providers` is absent for the same reason.
 */
export declare const LEGACY_LLM_SHAPE: LegacyShape;
/**
 * Every declared leaf one document section states.
 * @param shape - the declared shape for that section.
 * @param section - the section as parsed from the document.
 * @returns leaf paths and their scalar values; empty for a non-object section.
 */
export declare function leavesOf(shape: LegacyShape, section: unknown): LegacyLeaf[];
