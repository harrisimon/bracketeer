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
        // if round length is 1, there's just one element to push
        matchUpData.push(matchUpsFromRound);
      } else {
        // otherwise, halve the array of matchups that represents each round
        // push and unshift so that the earliest rounds are outermost
        matchUpData.push(matchUpsFromRound.slice(0, mid));
        matchUpData.unshift(matchUpsFromRound.slice(mid));
      }
    }
  }
  return matchUpData;
}
