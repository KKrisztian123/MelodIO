import React from "react";
import { MemoryRouter } from "react-router";

import {
  IonApp,

  setupIonicReact
} from '@ionic/react';


/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact({
  mode: 'ios',
});

export const decorators = [
  (Story) => (
    <IonApp>
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    </IonApp>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}