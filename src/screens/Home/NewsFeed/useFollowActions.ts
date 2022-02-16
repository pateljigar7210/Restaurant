import {config} from '../../../config';
import useUserInfo from '../../../hooks/useUserInfo';
import client from '../../../utils/ApiClient';
import {showSnackbar} from '../../../utils/SnackBar';
import {IResponseData} from '../../Profile/Queries/useFollowers';

export type FromApprove = 'profile' | 'list';

const useFollowActions = () => {
  const userInfo = useUserInfo();
  const followUser = async (userId: string) => {
    try {
      const url = `${config.RELATIONSHIP_API_URL}relationships`;
      const response: IResponseData = await client.post(url, {follow: userId});
      if (response.status === 200) {
        showSnackbar({message: response.message, type: 'success'});
      }
      if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
      return Promise.resolve(response);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
      return Promise.reject(error);
    }
  };

  const cancelRequest = async (userId: string) => {
    try {
      const url = `${config.RELATIONSHIP_API_URL}relationships/${userInfo.documentId}/cancel/${userId}`;
      const response: IResponseData = await client.delete(url);
      if (response.status === 200) {
        showSnackbar({message: response.message, type: 'success'});
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
      return Promise.resolve(response);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
      return Promise.reject(error);
    }
  };

  const unfollow = async (userId: string) => {
    try {
      const url = `${config.RELATIONSHIP_API_URL}relationships/${userInfo.documentId}/unfollow/${userId}`;
      const response: IResponseData = await client.delete(url);
      if (response.status === 200) {
        showSnackbar({message: response.message, type: 'success'});
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
      return Promise.resolve(response);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
      return Promise.reject(error);
    }
  };

  const rejectRequest = async (userId: string) => {
    try {
      const url = `${config.RELATIONSHIP_API_URL}relationships/${userInfo.documentId}/reject/${userId}`;
      const response: IResponseData = await client.delete(url);
      if (response.status === 200) {
        showSnackbar({message: response.message, type: 'success'});
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
      return Promise.resolve(response);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
      return Promise.reject(error);
    }
  };

  const approveRequest = async (userId: string, from: FromApprove) => {
    try {
      let url = '';
      switch (from) {
        case 'profile':
          url = `${config.RELATIONSHIP_API_URL}relationships/${userId}/approve/${userInfo.documentId}`;
          break;
        case 'list':
          url = `${config.RELATIONSHIP_API_URL}relationships/${userId}`;
          break;
        default:
          break;
      }

      const response: IResponseData = await client.post(url);
      if (response.status === 200) {
        showSnackbar({message: response.message, type: 'success'});
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
      return Promise.resolve(response);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
      return Promise.reject(error);
    }
  };

  const followBackUser = async (userId: string) => {
    try {
      const url = `${config.RELATIONSHIP_API_URL}relationships`;
      const response: IResponseData = await client.post(url, {follow: userId});
      if (response.status === 200) {
        showSnackbar({message: response.message, type: 'success'});
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
      return Promise.resolve(response);
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
      return Promise.reject(error);
    }
  };

  return {
    followUser,
    cancelRequest,
    unfollow,
    rejectRequest,
    approveRequest,
    followBackUser,
  };
};

export {useFollowActions};
