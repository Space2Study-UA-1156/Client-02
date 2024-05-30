const basePhotoAvatarSize = {
  width: 40,
  height: 40
}

export const styles = {
  userPhoto: {
    ...basePhotoAvatarSize
  },
  userInitialsPlaceholder: {
    ...basePhotoAvatarSize,
    background:
      'linear-gradient(45deg, rgba(29,63,92,0.6853335084033614) 3%, rgba(221,226,230,0.7735688025210083) 44%, rgba(221,226,230,0.6559217436974789) 56%, rgba(121,178,96,0.702140231092437) 97%)',
    fontSize: 18,
    fontWeight: 'medium',
    color: '#455A64'
  }
}
