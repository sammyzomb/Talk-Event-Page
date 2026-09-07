import { LECTURE } from '../data/company.js'

export function buildRegisterUrl(lectureFlowId) {
  if (!lectureFlowId) return LECTURE.listUrl
  return `${LECTURE.registerBase}?id=${lectureFlowId}`
}
