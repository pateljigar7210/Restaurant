/**
 * @format
 */
import {useEffect} from 'react';
import {EmitterSubscription, Linking, Platform} from 'react-native';

import DeepLinking from 'react-native-deep-linking';
import Config from 'react-native-config';

import {navigate, push} from '../navigation/navigationRef';

const urlPrefix: string[] = [Config.DEEP_LINK_URL, 'bravvox'];

interface IRouteInfo {
  id: string;
  path: string;
  scheme: string;
}

const useDeepLinkManager = (isLoggedIn: boolean) => {
  useEffect(() => {
    const eventListener = ({url}: {url: string}) => {
      handleUrl({url});
    };
    let listener: EmitterSubscription;
    // eslint-disable-next-line prefer-const
    listener = Linking.addEventListener('url', eventListener);
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
        .then(ev => {
          if (ev && ev !== '') {
            handleUrl({url: ev});
          }
        })
        .catch(err => console.log('An error occurred', err));
    }
    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [isLoggedIn]);

  function handleUrl({url}: {url: string | null}) {
    const deepLinkURL = url;
    if (deepLinkURL) {
      Linking.canOpenURL(deepLinkURL).then(supported => {
        if (supported) {
          DeepLinking.evaluateUrl(deepLinkURL);
        }
      });
    }
  }

  function addGroupsRoute() {
    if (isLoggedIn) {
      DeepLinking.addRoute('/groups/:id', (response: IRouteInfo) => {
        if (response) {
          const {id} = response;
          if (id) {
            const tm = setTimeout(() => {
              const params = {groupId: id};
              push('GroupProfile', params);
              clearTimeout(tm);
            }, 1000);
          }
        }
      });
    }
  }

  function addUnlockAccountRoute() {
    DeepLinking.addRoute('/services/auth/v1/unlock-account?:id', (response: IRouteInfo) => {
      if (response.id) {
        navigate('Login');
      }
    });
  }

  function addSchemas() {
    DeepLinking.resetSchemes();
    urlPrefix.map(u => DeepLinking.addScheme(u));
  }

  function addRoutes() {
    DeepLinking.resetRoutes();
    addGroupsRoute();
    addUnlockAccountRoute();
  }

  function stopListening() {
    DeepLinking.resetRoutes();
    DeepLinking.resetSchemes();
  }

  function startListening() {
    addSchemas();
    addRoutes();
  }

  return {
    startListening,
    stopListening,
  };
};

export {useDeepLinkManager};
