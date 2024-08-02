import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const path = 'https://api.thecatapi.com';
const key =
  'live_qdLlUC0DIEZP6VPEarNCdjPnceI65vk3ONbX74t1ZkMKBPfVU0YuKmObWudfllAb';

export const getData = createAsyncThunk(
  'images/getData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/v1/images/search?order=RANDOM&page=0&limit=10`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postFavourites = createAsyncThunk(
  'images/postFavourites',
  async ({ imageId, subId }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/v1/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
        },
        body: JSON.stringify({
          image_id: imageId,
          sub_id: subId,
        }),
      });
      if (response.ok) {
        const favouritesData = await response.json();
        return favouritesData;
      } else {
        throw new Error('Failed to post data about favourite image');
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFavourites = createAsyncThunk(
  'images/getFavourites',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${path}/v1/favourites`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
        },
      });
      if (response.ok) {
        const favouritesData = await response.json();
        return favouritesData;
      } else {
        throw new Error('Failed to get data about favourite images');
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFavourites = createAsyncThunk(
  'images/deleteFavourites',
  async (favouriteId, thunkAPI) => {
    try {
      const response = await fetch(`${path}/v1/favourites/${favouriteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
        },
      });
      if (response.ok) {
        return favouriteId;
      } else {
        throw new Error('Failed to delete data about favourite image');
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    data: [],
    isLoading: false,
    favourites: [],
  },
  reducers: {
    deleteImageById(state, action) {
      const idToDelete = action.payload;
      state.data = state.data.filter((image) => image.id !== idToDelete);
      state.favourites = state.favourites.filter(
        (image) => image.image_id !== idToDelete
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Fetch error');
    });

    builder.addCase(postFavourites.fulfilled, (state, action) => {
      state.favourites.push(action.payload);
    });
    builder.addCase(postFavourites.rejected, (state, action) => {
      console.log('Fail to post favourite image:', action.payload);
    });

    builder.addCase(getFavourites.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFavourites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favourites = action.payload;
    });
    builder.addCase(getFavourites.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Fail to get favourites');
    });

    builder.addCase(deleteFavourites.fulfilled, (state, action) => {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.id !== action.payload
      );
    });
    builder.addCase(deleteFavourites.rejected, (state, action) => {
      console.log('Fail to delete favourites');
    });
  },
});

export const { deleteImageById } = imagesSlice.actions;

export default imagesSlice.reducer;
