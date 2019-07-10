let blackValue = 1.0;
let whiteValue = (-1.0);

let black = 1;
let white = 0;

let colorToScore = color => color == black ? blackValue : whiteValue;

let getOppColor = color => color == white ? black : white;

let dummyId = "________DUMMY________";

let isDummyId = playerId => playerId == dummyId;

let matches2ScoreData = matchList => {
  open Data.Match;
  let scoreDict = Js.Dict.empty();
  // This is awkward.
  let makeScoreData =
      (~playerId, ~origRating, ~newRating, ~result, ~oppId, ~color) => {
    // Get existing score data to update, or create it fresh
    let oldData = {
      switch (scoreDict->Js.Dict.get(playerId)) {
      | None => Scoring.createBlankScoreData(playerId)
      | Some(data) => data
      };
    };
    // The ratings will always begin with the `origRating` of the
    // first match they were in.
    let newRatings = {
      switch (oldData.ratings |> Js.Array.length) {
      | 0 => [|origRating, newRating|]
      | _ => [|newRating|]
      };
    };
    let newResultsNoByes = {
      isDummyId(oppId) ? [||] : [|result|];
    };
    let newOpponentResults = oldData.opponentResults;
    let oppResult = {
      switch (newOpponentResults->Js.Dict.get(oppId)) {
      | None => result
      | Some(x) => x +. result
      };
    };
    newOpponentResults->Js.Dict.set(oppId, oppResult);
    Js.Array.(
      Scoring.{
        results: oldData.results |> concat([|result|]),
        resultsNoByes: oldData.resultsNoByes |> concat(newResultsNoByes),
        colors: oldData.colors |> concat([|color|]),
        colorScores: oldData.colorScores |> concat([|colorToScore(color)|]),
        opponentResults: newOpponentResults,
        ratings: oldData.ratings |> concat(newRatings),
        isDummy: isDummyId(playerId),
        id: playerId,
      }
    );
  };
  matchList
  |> Js.Array.forEach(match => {
       let playerIds = match->playerIdsGet;
       let result = match->resultGet;
       let newRating = match->newRatingGet;
       let origRating = match->origRatingGet;
       let newDataWhite =
         makeScoreData(
           ~playerId=playerIds->whiteIdGet,
           ~origRating=origRating->whiteRatingGet,
           ~newRating=newRating->whiteRatingGet,
           ~result=result->whiteScoreGet,
           ~oppId=playerIds->blackIdGet,
           ~color=white,
         );
       scoreDict->Js.Dict.set(playerIds->whiteIdGet, newDataWhite);
       let newDataBlack =
         makeScoreData(
           ~playerId=playerIds->blackIdGet,
           ~origRating=origRating->blackRatingGet,
           ~newRating=newRating->blackRatingGet,
           ~result=result->blackScoreGet,
           ~oppId=playerIds->whiteIdGet,
           ~color=black,
         );
       scoreDict->Js.Dict.set(playerIds->blackIdGet, newDataBlack);
     });
  scoreDict;
};

// Flatten the `[[id1, id2], [id1, id3]]` structure into an easy-to-read
// `{id1: [id2, id3], id2: [id1], id3: [id1]}` structure.
let avoidPairReducer = (acc, pair) => {
  let (id1, id2) = pair;
  let currentArr1 = acc->Js.Dict.get(id1);
  let newArr1 = {
    switch (currentArr1) {
    | None => [|id2|]
    | Some(currentArr1) => currentArr1 |> Js.Array.concat([|id2|])
    };
  };
  acc->Js.Dict.set(id1, newArr1);
  let currentArr2 = acc->Js.Dict.get(id2);
  let newArr2 = {
    switch (currentArr2) {
    | None => [|id1|]
    | Some(currentArr2) => currentArr2 |> Js.Array.concat([|id1|])
    };
  };
  acc->Js.Dict.set(id2, newArr2);
  acc;
};

let createPairingData = (playerData, avoidPairs, scoreDict) => {
  open Data.Player;
  let avoidDict =
    avoidPairs |> Js.Array.reduce(avoidPairReducer, Js.Dict.empty());
  let pairData = Js.Dict.empty();
  Js.Dict.values(playerData)
  |> Js.Array.forEach(data => {
       let playerStats = {
         switch (scoreDict->Js.Dict.get(data->idGet)) {
         | None => Scoring.createBlankScoreData(data->idGet)
         | Some(x) => x
         };
       };
       let newAvoidIds = {
         switch (avoidDict->Js.Dict.get(data->idGet)) {
         | None => [||]
         | Some(x) => x
         };
       };
       // `isUpperHalf` and `halfPos` will have to be set by another
       // function later.
       let newData: Pairing.pairingData = {
         avoidIds: newAvoidIds,
         colorScores: playerStats.colorScores,
         colors: playerStats.colors,
         halfPos: 0,
         id: data->idGet,
         isUpperHalf: false,
         opponents: playerStats.opponentResults->Js.Dict.keys,
         rating: data->ratingGet,
         score: playerStats.results->Utils.arraySumFloat,
       };
       pairData->Js.Dict.set(data->idGet, newData);
     });
  pairData;
};