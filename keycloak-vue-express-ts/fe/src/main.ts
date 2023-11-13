import { createApp } from "vue";
import App from "./App.vue";
import KeyCloakService from "./services/KeycloakService";
import HttpService from "./services/HttpService";
const renderApp = () => {
  createApp(App).mount("#app");
};
KeyCloakService.CallLogin(renderApp);
HttpService.configureAxiosKeycloak();