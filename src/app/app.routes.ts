import { Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { InstructionComponent } from './instruction/instruction.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

export const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent,
        title: 'Hangman - Main Menu'
    },
    {
        path: 'play',
        component: PlayComponent,
        title: 'Hangman - Play'
    },
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
        title: 'Hangman - Leaderboard'
    },
    {
        path: 'instruction',
        component: InstructionComponent,
        title: 'Hangman - Instruction'
    }
];
