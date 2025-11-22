import * as cheerio from 'cheerio';

export type MatchItem = {
    id?: string;
    journee?: string;
    date?: string;
    home?: string;
    away?: string;
    scoreHome?: number | null;
    scoreAway?: number | null;
    status?: "finished" | "scheduled" | "unknown";
}

export type ClassementItem = {
    rank?: number;
    team: string;
    played?: number;
    won?: number;
    lost?: number;
    pointsFor?: number;
    pointsAgainst?: number;
    pointDifference?: number;
    points?: number;
}

function parseIntOrNull(s?: string) {
    if (!s) return null;
    const n = parseInt(s.replace(/\D/g, ''), 10);
    return Number.isNaN(n) ? null : n;
}