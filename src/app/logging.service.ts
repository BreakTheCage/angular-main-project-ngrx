import { Injectable } from '@angular/core';

// @Injectable({providedIn: 'root'})
export class LoggingService {
    lastLog: string;
    
    printLog(message: string) {
        console.log('print Last Log: ', this.lastLog);
        console.log('print new Log: ', message);
        this.lastLog = message;
    }
}