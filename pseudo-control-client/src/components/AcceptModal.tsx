import React from 'react'
import interaction from '~/services/interaction'
import literal from '~/services/literal'
import styles from './modal.module.scss'

function AcceptModal() {
  return (
    <React.StrictMode>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.title}>
            { literal.text('accept_modal.title') }
          </div>
          <div className={styles.description}>
            { literal.text('accept_modal.description') }
          </div>
          <div className={styles.buttons}>
            <button onClick={() => interaction.run('accept')}>
              { literal.text('accept_modal.accept') }
            </button>
            <button onClick={() => interaction.run('close')}>
              { literal.text('accept_modal.decline') }
            </button>
          </div>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default AcceptModal
