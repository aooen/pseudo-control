import React from 'react'
import interaction from '~/services/interaction'
import literal from '~/services/literal'
import styles from './modal.module.scss'

function AcceptModal() {
  return (
    <React.StrictMode>
      <div className={styles.modal}>
        <h1>{ literal.text('accept_modal.title') }</h1>
        <div>
          { literal.text('accept_modal.description') }
        </div>
        <div>
          <button onClick={() => interaction.run('accept')}>
            { literal.text('accept_modal.accept') }
          </button>
          <button onClick={() => interaction.run('close')}>
            { literal.text('accept_modal.decline') }
          </button>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default AcceptModal
