import { initializeApp, App as FirebaseApp, cert } from "firebase-admin/app";
import { AppInitParams } from "./App.types";

/**
 * Description placeholder
 *
 * @export
 * @class App
 * @typedef {App}
 */
export class App {
  /**
   * Description placeholder
   *
   * @private
   * @static
   * @type {FirebaseApp}
   */
  private static _app: FirebaseApp;

  /** Description placeholder */
  public static init = ({ serviceAccount }: AppInitParams) => {
    if (!this._app) {
      this._app = initializeApp({
        credential: cert(serviceAccount),
      });
    }
  };

  /**
   * Description placeholder
   *
   * @public
   * @readonly
   * @type {*}
   */
  public static get app() {
    return this._app;
  }
}
