import { axiosClientWithCache } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'

export const categoryService = {
  getCategories: (params) => {
    return axiosClientWithCache.get(URLs.categories.get, { params })
  },
  getCategoriesNames: () => {
    return axiosClientWithCache.get(URLs.categories.getNames)
  }
}
