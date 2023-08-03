/** Authentication type */
export type Auth = {
    /** Session token */
    session: string | false;
    /** Permission level of the current session */
    authLevel: "admin" | "user" | false;
    /** Id of current user. */
    userId: number | false;
}

/** Login information */
export type Login = {
    email: string;
    password: string;
}