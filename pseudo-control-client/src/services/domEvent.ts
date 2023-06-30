export class DomEventService {
  private mouseentered: Element | null = null
  private mouseovered: Element | null = null

  click(xRate: number, yRate: number) {
    const target = document.elementFromPoint(xRate * window.innerWidth, yRate * window.innerHeight)
    if (!target) { return }

    target.dispatchEvent(new Event('mousedown'))
    target.dispatchEvent(new Event('click'))
    target.dispatchEvent(new Event('mouseup'))
  }

  mousemove(xRate: number, yRate: number) {
    const targets = document.elementsFromPoint(xRate * window.innerWidth, yRate * window.innerHeight)

    if (this.mouseentered !== targets[0]) {
      this.mouseentered?.dispatchEvent(new Event('mouseleave'))
      targets[0].dispatchEvent(new Event('mouseenter'))
      this.mouseentered = targets[0]
    }

    if (this.mouseovered !== targets[0]) {
      this.mouseovered?.dispatchEvent(new Event('mouseout', { bubbles: true }))
      targets[0].dispatchEvent(new Event('mouseover', { bubbles: true }))
      this.mouseovered = targets[0]
    }

    targets[0].dispatchEvent(new Event('mousemove'))
  }
}

export default new DomEventService()
