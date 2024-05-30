import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const userRequestService = {
  createUserRequest: (params) => {
    return axiosClient.post(createUrlPath(URLs.userRequest.create), params)
  }
}
