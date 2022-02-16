import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RNBootSplash from 'react-native-bootsplash';
import SignUp from '../screens/Auth/SignUp';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Login from '../screens/Auth/Login';
import CheckEmail from '../screens/Auth/CheckEmail';
import Profile from '../screens/Profile/index';
import {navTheme} from '../theme';
import HomeTabs from './HomeTabs';
import DrawerMenu from './DrawerMenu';
import PostCreation from '../screens/PostCreation';
import Notifications from '../screens/Notifications';
import GroupProfile from '../screens/GroupProfile';
import Comments from '../screens/Comments';
import EditProfile from '../screens/EditProfile';
import useUserInfo from '../hooks/useUserInfo';
import {navigationRef} from './navigationRef';
import {useDeepLinkManager} from '../deeplink/useDeeplinkManager';
import {FromType} from '../screens/Home/NewsFeed/Interactions';
import AddGroup from '../screens/Groups/AddGroup';
import EditGroup from '../screens/Groups/EditGroup';
import ManageRoles from '../screens/GroupProfile/ManageRoles/ManageRoles';
import {IGroupFormType} from '../screens/Groups/AddGroup/useGroupForm';
import AccountDetails from '../screens/Settings/AccountDetails';
import Security from '../screens/Security';
import BusinessProfile from '../screens/BusinessProfile';
import BusinessCreate from '../screens/BusinessCreate';
import {ACTIONFROM} from '../screens/GroupProfile/Queries/useGroupMember';
import InviteFriends from '../screens/InviteFriends';
import NotificationSettings from '../screens/NotificationSettings';
import {IBusinessData} from '../screens/BusinessProfile/types/BusinessInterfaces';
import Events from '../screens/Events';
import EditPost from '../screens/EditPost';
import {INewsFeedData} from '../screens/Home/types/NewsFeedInterface';
import SinglePost from '../screens/SinglePost';
import EventProfile from '../screens/EventProfile';

export type PostCreationTypeFrom = 'profile' | 'home' | 'business' | 'groups' | 'group';
export type NewPostParams = {from: PostCreationTypeFrom; id?: string; title: string};
export type EditPostParams = {
  from: PostCreationTypeFrom;
  id?: string;
  title: string;
  newsFeed: INewsFeedData;
};
export type deletePostParams = {
  from: PostCreationTypeFrom;
  id?: string;
};

export type RootStackParamList = {
  HomeTabs: undefined;
  Login: undefined;
  SignUp: undefined;
  CheckEmail: {email: string};
  ForgotPassword: undefined;
  NewPost: NewPostParams;
  Profile: {userName: string; userId: string};
  Notifications: undefined;
  GroupProfile: {groupId: string};
  AddGroup: undefined;
  EditGroup: {groupId: string; groupInfo: IGroupFormType};
  ManageRoles: {id: string; from: ACTIONFROM};
  Comments: {documentId: string; from: FromType; id: string; isMember?: boolean};
  DrawerMenu: undefined;
  EditProfile: undefined;
  AccountDetails: undefined;
  Security: undefined;
  BusinessProfile: {businessId: string; title: string};
  InviteFriends: undefined;
  NotificationSettings: undefined;
  BusinessCreate: {businessData: IBusinessData};
  EventsStack: undefined;
  Events: undefined;
  EditPost: EditPostParams;
  EventProfile: {EventId: string; title: string};
  SinglePost: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavContainer() {
  const {isLoggedIn} = useUserInfo();

  const {startListening} = useDeepLinkManager(isLoggedIn);

  React.useEffect(() => {
    startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideSplasScreen = () => {
    RNBootSplash.hide({fade: true});
  };

  return (
    <NavigationContainer theme={navTheme} independent ref={navigationRef} onReady={hideSplasScreen}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="CheckEmail" component={CheckEmail} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="NewPost" component={PostCreation} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="GroupProfile" component={GroupProfile} />
            <Stack.Screen name="AddGroup" component={AddGroup} />
            <Stack.Screen name="EditGroup" component={EditGroup} />
            <Stack.Screen name="ManageRoles" component={ManageRoles} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
            <Stack.Screen name="InviteFriends" component={InviteFriends} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
            <Stack.Screen name="BusinessCreate" component={BusinessCreate} />
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="EditPost" component={EditPost} />
            <Stack.Screen name="SinglePost" component={SinglePost} />
            <Stack.Screen name="EventProfile" component={EventProfile} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
