export type PlayResult = {
    id: string
    playerName: string
    correctWords: number
    incorrectGuessesPerWord: number[]
    startDatetime: Date
    endDatetime: Date
}