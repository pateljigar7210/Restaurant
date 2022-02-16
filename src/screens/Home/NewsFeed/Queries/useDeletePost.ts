/**
 * @format
 */
import {useMutation, useQueryClient} from 'react-query';
import client from '../../../../utils/ApiClient';
import {config} from '../../../../config';
import {QueryKeys} from '../../../../utils/QueryKeys';
import {showSnackbar} from '../../../../utils/SnackBar';
import {deletePostParams} from '../../../../navigation';

export interface IResponseData {
  error: boolean;
  message: string;
  status: number;
}

export const useDeletePost = (params: deletePostParams) => {
  const queryClient = useQueryClient();
  const contentDataDelete = async () => {
    try {
      let url = '';
      switch (params.from) {
        case 'home':
        case 'profile':
          url = `${config.CONTENT_API_URL}${params.id}`;
          break;
        case 'group':
          url = `${config.CONTENT_API_URL}${params.id}`;
          break;
        case 'business':
          url = `${config.CONTENT_API_URL}${params.id}`;
          break;
        default:
          break;
      }
      const response: IResponseData = await client.delete(url);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deletePostMutation = useMutation(contentDataDelete, {
    onSuccess: () => {
      switch (params.from) {
        case 'home':
        case 'profile':
          queryClient.invalidateQueries(QueryKeys.homeFeed);
          queryClient.invalidateQueries([QueryKeys.userFeed]);
          break;
        case 'groups':
          queryClient.invalidateQueries([QueryKeys.groupProfileDetails, params.id]);
          queryClient.invalidateQueries([QueryKeys.groupFeed, params.id]);
          break;
        case 'business':
          queryClient.invalidateQueries([QueryKeys.businessProfileDetails, params.id]);
          queryClient.invalidateQueries([QueryKeys.businessFeed, params.id]);
          break;
        default:
          break;
      }
    },
    onError: (error: any) => {
      const message = error.message ?? 'Something went wrong';
      showSnackbar({message, type: 'danger'});
    },
  });

  const deleteData = () => deletePostMutation.mutate();

  return {...deletePostMutation, deleteData};
};
