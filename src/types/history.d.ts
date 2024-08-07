export interface HistoryRecord {
    time: string;
    duration: number;
}

export enum TimerState {
    RUNNING = 'running',
    PAUSED = 'paused',
    ENDED = 'ended',
}
