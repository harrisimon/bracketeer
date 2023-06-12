import { MatchUpType, displayStateProps } from '../../../types';

export default function processMatchups(
  matchUpResponse: MatchUpType[],
  displayState: displayStateProps
) {
  matchUpResponse.sort((a, b) => a.matchNumber - b.matchNumber);

  const matchUpData: MatchUpType[][] = [];
  const { unidirectional, numberOfColumns } = displayState;
  if (unidirectional) {
    for (let i = 1; i <= numberOfColumns; i++) {
      const matchUpsFromRound = matchUpResponse.filter((el) => el.round === i);
      matchUpData.push(matchUpsFromRound);
    }
  } else {
    console.log(numberOfColumns);
    for (let i = (numberOfColumns + 1) / 2; i > 0; i--) {
      const matchUpsFromRound = matchUpResponse.filter((el) => el.round === i);
      const mid = matchUpsFromRound.length / 2;
      if (mid === 0.5) {
        matchUpData.push(matchUpsFromRound);
      } else {
        matchUpData.push(matchUpsFromRound.slice(0, mid));
        matchUpData.unshift(matchUpsFromRound.slice(mid));
      }
      console.log(i, matchUpData);
    }
  }
  return matchUpData;
}
