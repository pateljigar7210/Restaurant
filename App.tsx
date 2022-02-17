/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from "react";
import { StatusBar, LogBox, Text, TextInput, Platform } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Provider as StoreProvider } from "react-redux";
import {QueryClient, QueryClientProvider} from 'react-query';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import KeyboardManager from "react-native-keyboard-manager";
import NavContainer from "./src/navigation";
import { theme } from "./src/theme";
import { ConfirmModalProvider } from "./src/components/CofirmationModel";
import { persistor, store } from "./src/redux/store";

// NOTE: hiding warnings about color contrasts
LogBox.ignoreLogs(["NativeBase: The contrast ratio of"]);
const queryClient = new QueryClient();
interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

function App(): JSX.Element {
  useEffect(() => {
    disableScaling();
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableAutoToolbar(false);
    }
  }, []);

  const disableScaling = () => {
    (Text as unknown as TextWithDefaultProps).defaultProps =
      (Text as unknown as TextWithDefaultProps).defaultProps || {};
    (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
      false;
    (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
      (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
    (
      TextInput as unknown as TextInputWithDefaultProps
    ).defaultProps!.allowFontScaling = false;
  };

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaProvider>
          <NativeBaseProvider theme={theme}>
            <ConfirmModalProvider>
              <StatusBar
                translucent
                backgroundColor={theme.colors.primary[50]}
              />
              <NavContainer />
            </ConfirmModalProvider>
          </NativeBaseProvider>
        </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
