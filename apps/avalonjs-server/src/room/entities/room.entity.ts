import { randomUUID } from 'crypto'
import { Player } from './player.entity'

export class Room {
  private readonly _minPlayer = 5
  private readonly _maxPlayer = 5

  private readonly _id: string
  private _players: Player[]

  public isPlaying: boolean = false

  constructor(players: Player[]) {
    this._id = randomUUID()
    this._players = players
  }

  get id(): string {
    return this._id
  }

  get players(): Player[] {
    return this._players
  }

  addPlayer(player: Player) {
    if (this.players.length >= this._maxPlayer) {
      throw Error('Room full.')
    }

    this.players.push(player)
  }

  removePlayer(playerUID: string) {
    this._players = this._players.filter((x) => x.id !== playerUID)
  }

  startGame() {
    if (this.isPlaying) {
      throw Error('Game has started')
    }

    if (this.players.length < this._minPlayer) {
      throw Error('Not enough player to start the game')
    }

    this.isPlaying = true
  }
}
