import {createVuetify} from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export const vuetifyInstance = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "light",
        themes: {
            light: {
                dark: false,
            },
            dark: {
                dark: true,
            }
        }
    }
});
