import type { HostContext } from './types.js';
/** The document reader and home a scan uses; injectable for tests. */
export interface LegacyMigrationFiles {
    readonly home: string;
    readonly read: (path: string) => Promise<string>;
}
/**
 * The documents a scan reads and the home they sit under.
 *
 * The home is resolved the way the harness resolves it — `profileContext.home`
 * (which the launcher derives from `resolveDshHome()`), then a non-empty
 * `$DSH_HOME`, then `~/.dsh` — so the scanner reads the SAME directory the
 * user's settings actually live in. `process.cwd()` is deliberately not a
 * candidate: the harness never runs from the home, so a scan that fell back to
 * it found nothing and the whole feature did nothing, silently.
 *
 * @param ctx - the plugin context, read for the launcher's profile home.
 * @returns the resolved home and the document reader.
 */
export declare function defaultFiles(ctx: unknown): LegacyMigrationFiles;
/**
 * The legacy-data migration: scan the documents DSH's 0.1.7 rename stranded,
 * ask the user through the plugin's own settings section, and write back what
 * they accept.
 *
 * Only an `entry-config` host runs this. Under the namespace model the plugin's
 * own section IS the legacy `dsh-thinking-effort` namespace, so nothing is
 * stranded and a prompt would be noise.
 *
 * @param ctx - the plugin context.
 * @param files - overrides for the documents; tests inject a fake reader.
 */
export declare function installLegacyMigration(ctx: HostContext, files?: LegacyMigrationFiles): void;
