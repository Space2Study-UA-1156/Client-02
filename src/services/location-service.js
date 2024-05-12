import { URLs } from '~/constants/request'
import { axiosClientWithCache } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const LocationService = {
  getCountries: () => {
    return axiosClientWithCache.get(URLs.location.getCountries)
  },
  getCities: (country) => {
    return axiosClientWithCache.get(
      createUrlPath(URLs.location.getCities, country)
    )
  }
}
