import { render, screen } from '@testing-library/react'
import VideoBox from '~/components/video-box/VideoBox'

describe('VideoBox test', () => {
  it('should render VideoBox with a particular src attribute', () => {
    const video = 'bublyk/test.img'

    render(<VideoBox video={video} />)
    const videoElement = screen.getByAltText('Video')

    expect(videoElement).toBeInTheDocument()
    expect(videoElement).toHaveAttribute('src', video)
  })
})
