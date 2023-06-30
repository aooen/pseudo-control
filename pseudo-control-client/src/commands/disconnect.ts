import { wrapperId } from '~/constants/dom'

export function disconnect() {
  document.getElementById(wrapperId)?.remove()
}
