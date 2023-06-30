/// <reference types="vite/client" />

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pseudoControl?: (commandName: string, data?: any) => any
}