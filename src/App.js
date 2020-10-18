import '~/assets/styles/index.sass';

import React from 'react';
import { Provider } from 'react-redux'
import store from './storage/store'
import Editor from './pages/editor';
import { Bar, LayersList } from '~/components/parts';
import Preview from "~/pages/preview";
import { UploadingNotification } from "~/components/popups";

function App() {
  return (
      <Provider store={store}>
          <UploadingNotification/>
          <Preview/>
          <Bar/>
          <LayersList/>
          <Editor/>
      </Provider>
  );
}

export default App;
