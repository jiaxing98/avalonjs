import { randomUUID } from 'crypto'

export const roles = [
  'Merlin',
  'Percival',
  'Servants of Arthur',
  'Assassin',
  'Morgana',
  'Mordred',
  'Oberon',
  'Minions of Mordred',
] as const

export type Role = (typeof roles)[number]

export class Player {
  private readonly _id: string
  private readonly _name: string
  private _isHost: boolean

  public role: Role | undefined

  constructor(name: string, isHost = false) {
    this._id = randomUUID()
    this._name = name
    this._isHost = isHost
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get isHost(): boolean {
    return this._isHost
  }

  assignRole(role: Role) {
    this.role = role
  }
}
