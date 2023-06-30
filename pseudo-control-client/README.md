# pseudo-control-client

## Initialize (example)
1. Build pseudo-control-client.
  ```sh
  yarn install
  yarn build
  ```
2. Embed bundled script file, then run `ready` command when window loaded.
  ```html
  <script src="~~~/dist/pseudo-control-client.js"></script>
  <script>
    window.addEventListener('load', () => {
      const remoteControlKey = window.pseudoControl('ready', {
        host: 'localhost', // example
        controlPort: 26610,
        sessionPort: 26611
      })
      // show remoteControlKey like this (example)
      /*
      const indicator = document.createElement('small')
      indicator.textContent = 'identification key for technical support: ' + remoteControlKey
      document.body.appendChild(indicator)
      */
    })
  </script>
  ```
3. Present the returned key string in a place where the user can easily find it.
4. All done! You can control through the key in pseudo-control-manager application. Try it!

## Command list
### ready
```ts
window.pseudoControl('ready', {
  host: 'localhost', // example
  controlPort: 26610,
  sessionPort: 26611
}): string
```
- Standby for receive remote control request and return string key to identify user.
- This command can create a element used for modal displaying.

### disconnect
```ts
window.pseudoControl('disconnect'): void
```
- Disconnect all communication and rollback like before ready status.

### log
```ts
window.pseudoControl('log', message: string): void
```
- Log message for event tracking. The message is forwarded to the technical supporter.
- It only works while remote control.
