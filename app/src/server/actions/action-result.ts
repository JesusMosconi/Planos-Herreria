export type ActionErrorCode = "validation" | "not_found" | "unsupported_schema" | "conflict" | "storage_failure";
export type ActionResult<T> = { readonly ok: true; readonly data: T } | { readonly ok: false; readonly code: ActionErrorCode; readonly message: string; readonly fieldErrors?: Readonly<Record<string, readonly string[]>> };
