import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { createStatusSlice } from '../../shared/slices/statusSlice';
import { createPaginationSlice } from '../../shared/slices/paginationSlice';
import { findArticles } from './api';
import { FindParams } from '../../api';
import { AppThunk } from '../../store';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';

export interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
}

interface State {
  articles: Article[];
}

const initialState: State = {
  articles: [],
};

const name = 'articles';

const status = createStatusSlice(name);
const pagination = createPaginationSlice(name);

const articlesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setArticles(state, { payload }: PayloadAction<Article[]>) {
      state.articles = payload;
    }
  }
});

export const fetchArticles = (params?: FindParams): AppThunk<Promise<Article[]>> => async dispatch => {
  const { requestError, requestStart, requestSuccess } = status.actions;
  const { updatePagination } = pagination.actions;
  
  dispatch(requestStart());
  try {
    const { data, ...pagination } = await findArticles(params || {});
    dispatch(articlesSlice.actions.setArticles(data));
    dispatch(updatePagination(pagination));
    dispatch(requestSuccess());
    return data;
  } catch (err) {
    dispatch(requestError(err));
    throw err;
  }
}

const reducer = combineReducers({
  data: articlesSlice.reducer,
  status: status.reducer,
  pagination: pagination.reducer
});

// const persistedReducer = persistReducer({
//   key: 'root',
//   storage: localforage
// }, reducer);

export const { setArticles } = articlesSlice.actions;
export default reducer;