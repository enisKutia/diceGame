export interface IAuthResponse {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  access_token: string;
  expires_in: string;
}

export interface IDiceFace {
  id: string;
  diceId: string;
  color: string;
  value: string;
  winning: string;
}

interface IAllDiceResultsCore {
  id: string;
  faces: string;
  shape: string;
}

export interface IAllDiceResults extends IAllDiceResultsCore {
  diceFaces: IDiceFace[];
}

export type IGetAllDiceResponse = [IAllDiceResults[], number];

interface gameRes {
  id: string;
  diceId: string;
  color: string;
  value: string;
  winning: string;
}
export interface IHistoryResponse extends IDiceFace {
  result?: string;
  matchId?: string | null;
  userId?: string;
  dice?: IAllDiceResultsCore;
  gameRes?: gameRes;
}
