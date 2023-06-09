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
    case tags.CONST_TAG_TABLE:
      return '#1d7898'
    case tags.CONST_TAG_ROOM:
      return '#165a72'
    case tags.CONST_TAG_LIGHT:
      return '#0e3c4c'
    case tags.CONST_TAG_BED:
      return '#071e26'
    case tags.CONST_TAG_CUP:
      return '#da8664'
    case tags.CONST_TAG_DISHES:
      return '#f39570'
    case tags.CONST_TAG_PLATE:
      return '#f18458'
    case tags.CONST_TAG_GOODS:
      return '#ef7241'
    case tags.CONST_TAG_CUTTING_BOARD:
      return '#ed6129'
    default:
      return '#F77291'
  }
}
