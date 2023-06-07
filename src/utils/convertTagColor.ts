import { tags } from 'constants/index'

export const convertTagColor = (tag: string): string => {
  switch (tag) {
    case tags.CONST_TAG_NEW:
      return '#068E52'
    case tags.CONST_TAG_BEST:
      return '#FFC602'
    case tags.CONST_TAG_LIVING:
      return '#2596be'
    case tags.CONST_TAG_KITCHEN:
      return '#F39570'
    case tags.CONST_TAG_STATIONERY:
      return '#D094f7'
    case tags.CONST_TAG_BABYKIDS:
      return '#2872FB'
    default:
      return '#F77291'
  }
}
