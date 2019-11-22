import { FindParams, ApiResponse, client } from "../../api";
import { Article } from "./testSlice";

export const findArticles = async ({
  limit, page, query
}: FindParams): Promise<ApiResponse<Article[]>> => client
  .get('articles', { params: {
    limit,
    page,
    query: query ? `%${query}%` : undefined
  }})
  .then(({ data }) => data);