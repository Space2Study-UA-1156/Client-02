import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const offerRequestService = {
  getOffers: async (params) => {
    return await axiosClient.get(URLs.offers.get, { params })
  },
  getOfferById: (offerId) => {
    return axiosClient.get(createUrlPath(URLs.offers.get, offerId))
  },
  createOffer: (data) => {
    return axiosClient.post(URLs.offers.create, data)
  },
  updateOffer: (offerId, data) => {
    return axiosClient.patch(createUrlPath(URLs.offers.update, offerId), data)
  },
  deleteOffer: (offerId) => {
    return axiosClient.delete(createUrlPath(URLs.offers.get, offerId))
  },
  deleteOffers: (offerIds) => {
    return axiosClient.post(URLs.offers.delete, offerIds)
  }
}
