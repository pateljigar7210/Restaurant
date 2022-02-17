/**
 * @format
 */
import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";

import client from "../../utils/ApiClient";
import { config } from "../../config";
import { QueryKeys } from "../../utils/QueryKeys";
import { IFeedData } from "./types/FeedInterface";

export interface IFeedResponseData {
  status: number;
  data: IFeedData[];
}

async function fetchFeeds(): Promise<IFeedData[] | undefined> {
  try {
    const url = `${config.LIST_API_URL}`;
    const response: IFeedResponseData = await client.get(url);

    // console.log("data", JSON.stringify(response));
    if (response.data.length > 0) {
      return response.data as IFeedData[];
    }
    return [];
  } catch (error) {
    return [];
  }
}

const useNewsFeed = () => {
  const listQuery = useInfiniteQuery(QueryKeys.homeFeed, () => fetchFeeds());

  const { data } = listQuery;

  const feedList: IFeedData[] = [];

  if (data) {
    data.pages[0]?.forEach((page) => {
      console.log("page.data---->", page);
      if (page) {
        feedList.push(page);
      }
    });
  }

  return {
    ...listQuery,
    feedList,
  };
};

export { useNewsFeed };
