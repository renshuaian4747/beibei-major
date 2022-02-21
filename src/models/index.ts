export interface LoginRes {
  accountId: number;
  avatarUrl: string;
  doubleCount: number;
  integral: number;
  isDouble: boolean;
  nickName: string;
  rank: number;
  token: string;
  winRate: string;
  leagueId: number;
  leagueList: { id: number; name: string }[];
}

export interface RankListItem {
  userId: number;
  nickName: string;
  integral: number;
  winRate: number;
  mvpCount: number;
  kda: number;
  curMaxCount: number;
  isWin: boolean;
  lastPlayTime: string;
  averageKills: number;
  averageDeaths: number;
  averageAssists: number;
  goldPerMin: number;
  xpPerMin: number;
  rank: number;
  totalMatchesNum: number;
  doubleIntegralTimes: number;
  money: number;
}

export interface DataListItem {
  warRate: string;
  winRate: string;
  deathPerGame: string;
  killsPerGame: string;
  assistsPerGame: string;
  kad: string;
  heroWinRate: string;
  heroRate: string;
  heroCount: string;
}

export interface RecordListItem {
  heroName: string;
  heroId: number;
  heroIcon: string;
  result: string;
  playDate: string;
  isDouble: string;
  kda: string;
  integral: string;
  lastHits: string;
  denies: string;
  goldPerMin: string;
  xpPerMin: string;
}
