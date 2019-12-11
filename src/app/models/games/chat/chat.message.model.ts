import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface ChatMessage{
    id?: string;
    roomId: string;
    priority: number;
    body: string;
    timestamp: number;
}

export interface ChatRoom{
    id?: string;
    name: string;
    status: string;
}
