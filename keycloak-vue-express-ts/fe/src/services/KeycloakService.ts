import Keycloak from "keycloak-js";
const keycloakInstance = new Keycloak('/keycloak.json');
interface CallbackOneParam<T1 = void, T2 = void> {
  (param1: T1): T2;
}
/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const Login = (onAuthenticatedCallback: CallbackOneParam): void => {
  keycloakInstance
    .init({ onLoad: "login-required" })
    .then(function (authenticated) {
      authenticated ? onAuthenticatedCallback() : alert("non authenticated");
    })
    .catch((e) => {
      console.dir(e);
      console.log(`keycloak init exception: ${e}`);
    });
};

const UserName = (): string | undefined =>
  keycloakInstance?.tokenParsed?.preferred_username;

const Token = (): string | undefined => keycloakInstance?.token;
const IdToken = (): string | undefined => keycloakInstance?.idToken;

const LogOut = () => keycloakInstance.logout();

/*
const UserRoles = (): string[] | undefined => {
  if (keycloakInstance.resourceAccess === undefined) return undefined;
  if (keycloakInstance.resourceAccess["express-client"] === undefined) return undefined;

  return keycloakInstance.resourceAccess["express-client"].roles;
};
*/
const UserRoles = ():string[] =>{
  return DecodeToken()?.role
}


const updateToken = (successCallback: any) =>
  keycloakInstance.updateToken(5).then(successCallback).catch(doLogin);

const doLogin = keycloakInstance.login;

const isLoggedIn = () => !!keycloakInstance.token;

const DecodeToken = ()=>{return keycloakInstance.tokenParsed}
const DecodeIdToken = ()=>{return keycloakInstance.idTokenParsed}

const KeycloakService = {
  CallLogin: Login,
  GetUserName: UserName,
  GetAccesToken: Token,
  GetIdToken: IdToken,
  CallLogOut: LogOut,
  GetUserRoles: UserRoles,
  UpdateToken: updateToken,
  IsLoggedIn: isLoggedIn,
  GetDecodeToken:DecodeToken,
  GetDecodeIdToken:DecodeIdToken
};

export default KeycloakService;


