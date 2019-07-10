// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Nanoid from "nanoid";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Data$Coronate from "../Data.bs.js";
import * as Hooks$Coronate from "../Hooks.bs.js";
import * as Window$Coronate from "../Window.bs.js";

function getAllPlayerIdsFromMatches(matchList) {
  return matchList.reduce((function (acc, match_) {
                return acc.concat(/* array */[
                            match_.playerIds.whiteId,
                            match_.playerIds.blackId
                          ]);
              }), /* array */[]);
}

function calcNumOfRounds(playerCount) {
  var roundCount = Math.ceil(Math.log2(playerCount));
  var match = Number.isFinite(roundCount);
  if (match) {
    return roundCount | 0;
  } else {
    return 0;
  }
}

function tempReducer(param, action) {
  return action[0];
}

function tempReducer2(param, action) {
  return action;
}

var emptyTourney = {
  byeQueue: /* array */[],
  date: new Date(0.0),
  id: Nanoid.default(),
  name: "",
  playerIds: /* array */[],
  roundList: /* array */[],
  tieBreaks: /* array */[1]
};

function TournamentData(Props) {
  var children = Props.children;
  var tourneyId = Props.tourneyId;
  var match = React.useReducer(tempReducer, emptyTourney);
  var tourneyDispatch = match[1];
  var tourney = match[0];
  var name = tourney.name;
  var playerIds = tourney.playerIds;
  var roundList = tourney.roundList;
  var match$1 = React.useReducer(tempReducer2, { });
  var playersDispatch = match$1[1];
  var players = match$1[0];
  var match$2 = React.useState((function () {
          return false;
        }));
  var setIsTourneyLoaded = match$2[1];
  var isTourneyLoaded = match$2[0];
  var match$3 = React.useState((function () {
          return false;
        }));
  var setIsPlayersLoaded = match$3[1];
  var isPlayersLoaded = match$3[0];
  var match$4 = React.useState((function () {
          return false;
        }));
  var setIsDbError = match$4[1];
  Hooks$Coronate.useLoadingCursor(isPlayersLoaded && isTourneyLoaded);
  var match$5 = Window$Coronate.useWindowContext(/* () */0);
  var windowDispatch = match$5[1];
  React.useEffect((function () {
          Curry._1(windowDispatch, /* SetTitle */Block.__(5, [name]));
          return (function (param) {
                    return Curry._1(windowDispatch, /* SetTitle */Block.__(5, [""]));
                  });
        }), /* tuple */[
        name,
        windowDispatch
      ]);
  React.useEffect((function (param) {
          var didCancel = /* record */[/* contents */false];
          Hooks$Coronate.Db[/* tourneyStore */3].getItem(tourneyId).then((function (value) {
                  if (!didCancel[0]) {
                    if (value == null) {
                      Curry._1(setIsDbError, (function (param) {
                              return true;
                            }));
                    } else {
                      Curry._1(tourneyDispatch, /* SetState */[value]);
                      Curry._1(setIsTourneyLoaded, (function (param) {
                              return true;
                            }));
                    }
                  }
                  return Promise.resolve(value);
                }));
          return (function (param) {
                    didCancel[0] = true;
                    return /* () */0;
                  });
        }), /* tuple */[
        tourneyId,
        tourneyDispatch,
        setIsTourneyLoaded,
        setIsDbError
      ]);
  React.useEffect((function (param) {
          var didCancel = /* record */[/* contents */false];
          if (isTourneyLoaded) {
            var allTheIds = getAllPlayerIdsFromMatches(Data$Coronate.rounds2Matches(roundList, undefined, /* () */0)).concat(playerIds);
            var match = allTheIds.length;
            if (match !== 0) {
              Hooks$Coronate.Db[/* playerStore */2].getItems(allTheIds).then((function (values) {
                      var newIds = Object.keys(values);
                      var oldIds = Object.keys(players);
                      var changedPlayers = newIds.filter((function (x) {
                                return !oldIds.includes(x);
                              })).concat(oldIds.filter((function (x) {
                                  return !newIds.includes(x);
                                })));
                      console.log("changed players:");
                      console.log(changedPlayers.length);
                      if (changedPlayers.length !== 0 && !didCancel[0]) {
                        Curry._1(playersDispatch, values);
                        Curry._1(setIsPlayersLoaded, (function (param) {
                                return true;
                              }));
                      }
                      return Promise.resolve(values);
                    }));
            } else {
              if (Object.keys(players).length !== 0) {
                Curry._1(playersDispatch, players);
              }
              Curry._1(setIsPlayersLoaded, (function (param) {
                      return true;
                    }));
            }
          }
          return (function (param) {
                    didCancel[0] = false;
                    return /* () */0;
                  });
        }), /* tuple */[
        roundList,
        players,
        playerIds,
        isTourneyLoaded
      ]);
  React.useEffect((function (param) {
          if (isTourneyLoaded && tourneyId === tourney.id) {
            Hooks$Coronate.Db[/* tourneyStore */3].setItem(tourneyId, tourney);
          }
          return undefined;
        }), /* tuple */[
        isTourneyLoaded,
        tourneyId,
        tourney
      ]);
  React.useEffect((function () {
          if (isPlayersLoaded) {
            Hooks$Coronate.Db[/* playerStore */2].setItems(players);
          }
          return undefined;
        }), /* tuple */[
        isPlayersLoaded,
        players
      ]);
  var partial_arg = Data$Coronate.Player[/* getPlayerMaybe */3];
  var getPlayer = function (param) {
    return partial_arg(players, param);
  };
  var activePlayers = { };
  Js_dict.values(players).forEach((function (player) {
          if (tourney.playerIds.includes(player.id)) {
            activePlayers[player.id] = player;
            return /* () */0;
          } else {
            return 0;
          }
        }));
  var roundCount = calcNumOfRounds(Object.keys(activePlayers).length);
  var isItOver = roundList.length >= roundCount;
  var match$6 = roundList.length === 0;
  var isNewRoundReady = match$6 ? true : Data$Coronate.isRoundComplete(roundList, activePlayers, roundList.length);
  if (match$4[0]) {
    return React.createElement("div", undefined, "Error: tournament not found.");
  } else if (!isTourneyLoaded || !isPlayersLoaded) {
    return React.createElement("div", undefined, "Loading...");
  } else {
    return Curry._1(children, /* record */[
                /* activePlayers */activePlayers,
                /* getPlayer */getPlayer,
                /* isItOver */isItOver,
                /* isNewRoundReady */isNewRoundReady,
                /* players */players,
                /* playersDispatch */playersDispatch,
                /* roundCount */roundCount,
                /* tourney */tourney,
                /* tourneyDispatch */tourneyDispatch
              ]);
  }
}

var make = TournamentData;

export {
  getAllPlayerIdsFromMatches ,
  calcNumOfRounds ,
  tempReducer ,
  tempReducer2 ,
  emptyTourney ,
  make ,
  
}
/* emptyTourney Not a pure module */
