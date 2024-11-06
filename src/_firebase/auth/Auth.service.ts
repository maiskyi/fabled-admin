import { getAuth } from "firebase-admin/auth";

/**
 * Description placeholder
 *
 * @export
 * @class Auth
 * @typedef {Auth}
 */
export class Auth {
  /**
   * Description placeholder
   *
   * @async
   * @param {string} [bearer=""]
   * @return {unknown}
   */
  public static verifyIdToken = async (bearer = "") => {
    const [, idToken] = bearer.split("Bearer");

    const { uid } = await getAuth().verifyIdToken(idToken.trim());

    return { uid };
  };
}
