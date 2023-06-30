/* eslint-disable @typescript-eslint/no-explicit-any */
import type ReactType from 'react'
import type ReactDOMType from 'react-dom/client'
import { wrapperId } from '~/constants/dom'

export class InteractionService {
  private React: typeof ReactType | null = null
  private root: ReactDOMType.Root | null = null
  private callback: Record<string, (data?: any) => void> = {}

  private async init() {
    this.React = await import('react')
    const ReactDOM = await import('react-dom/client')
    this.root = ReactDOM.createRoot(document.getElementById(wrapperId) as HTMLElement)
  }

  private async openModal(modalComponent: ReactType.ComponentType) {
    await this.init()
    if (!this.React || !this.root) { return }

    this.root.render(this.React.createElement(modalComponent))
  }

  private async closeModal() {
    this.root?.unmount()
  }

  async showAcceptModal(onAccept: () => void) {
    this.openModal((await import(`~/components/AcceptModal`)).default)
    this.callback = {
      accept: () => {
        onAccept()
        this.closeModal()
      },
      close: this.closeModal,
    }
  }

  run(callbackName: string, data?: any) {
    this.callback[callbackName](data)
  }
}

export default new InteractionService()
