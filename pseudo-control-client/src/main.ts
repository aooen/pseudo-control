/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import * as commands from './commands'

if ('pseudoControl' in window) {
  console.error('window.pseudoControl is already declared. You need to make sure you haven\'t imported pseudo-control-client twice.\nIf this error do not disappear, check that it is not a malicious attack such as XSS.')
}

window.pseudoControl = function (commandName: string, data?: any) {
  if (!(commandName in commands)) {
    console.error(`window.pseudoControl('${commandName}') is invalid.`)
    return
  }
  const command = commands[commandName as keyof typeof commands]
  // @ts-ignore
  return command(data)
}