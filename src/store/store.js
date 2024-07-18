import { configureStore } from '@reduxjs/toolkit';
import mainCategorySlice from './mainCategorySlice';
import subCategorySlice from './subCategorySlice';

export const store = configureStore({
  reducer: {
    mainCategories: mainCategorySlice,
    subCategories: subCategorySlice
  },
})