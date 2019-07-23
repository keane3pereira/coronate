// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE

import * as Jest from "@glennsl/bs-jest/src/jest.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as JestDom from "bs-jest-dom/src/JestDom.bs.js";
import * as PageRound$Coronate from "../PageTournament/PageRound.bs.js";
import * as ReactTestingLibrary from "bs-react-testing-library/src/ReactTestingLibrary.bs.js";
import * as React$1 from "@testing-library/react";
import * as TournamentData$Coronate from "../PageTournament/TournamentData.bs.js";

afterEach((function () {
        React$1.cleanup();
        return /* () */0;
      }));

function Match_test$BattleForGothamCity(Props) {
  var children = Props.children;
  return React.createElement(TournamentData$Coronate.make, {
              children: children,
              tourneyId: "tvAdS4YbSOznrBgrg0ITA"
            });
}

var BattleForGothamCity = /* module */[/* make */Match_test$BattleForGothamCity];

Jest.Skip[/* test */0]("Ratings are updated correctly after a match.", (function (param) {
        var page = ReactTestingLibrary.render(undefined, undefined, React.createElement(Match_test$BattleForGothamCity, {
                  children: (function (t) {
                      return React.createElement(PageRound$Coronate.make, {
                                  roundId: 1,
                                  tournament: t
                                });
                    })
                }));
        var partial_arg_001 = (/add bruce wayne/i);
        var partial_arg = /* `RegExp */[
          889580489,
          partial_arg_001
        ];
        var eta = (function (eta) {
              var param = undefined;
              var param$1 = eta;
              return ReactTestingLibrary.getByText(partial_arg, param, param$1);
            })(page);
        Curry._2(ReactTestingLibrary.FireEvent[/* click */8], undefined, eta);
        var partial_arg_001$1 = (/add dick grayson/i);
        var partial_arg$1 = /* `RegExp */[
          889580489,
          partial_arg_001$1
        ];
        var eta$1 = (function (eta) {
              var param = undefined;
              var param$1 = eta;
              return ReactTestingLibrary.getByText(partial_arg$1, param, param$1);
            })(page);
        Curry._2(ReactTestingLibrary.FireEvent[/* click */8], undefined, eta$1);
        var partial_arg_001$2 = (/match selected/i);
        var partial_arg$2 = /* `RegExp */[
          889580489,
          partial_arg_001$2
        ];
        var eta$2 = (function (eta) {
              var param = undefined;
              var param$1 = eta;
              return ReactTestingLibrary.getByText(partial_arg$2, param, param$1);
            })(page);
        Curry._2(ReactTestingLibrary.FireEvent[/* click */8], undefined, eta$2);
        Curry._2(ReactTestingLibrary.FireEvent[/* change */7], {
              target: {
                value: /* White */-588596599
              }
            }, ReactTestingLibrary.getByDisplayValue("Select winner", page));
        var partial_arg_001$3 = (/view information for match: bruce wayne versus dick grayson/i);
        var partial_arg$3 = /* `RegExp */[
          889580489,
          partial_arg_001$3
        ];
        var eta$3 = (function (eta) {
              var param = undefined;
              var param$1 = eta;
              return ReactTestingLibrary.getByText(partial_arg$3, param, param$1);
            })(page);
        Curry._2(ReactTestingLibrary.FireEvent[/* click */8], undefined, eta$3);
        var partial_arg_001$4 = (/rating for Bruce Wayne/i);
        var partial_arg$4 = /* `RegExp */[
          889580489,
          partial_arg_001$4
        ];
        return (function (eta) {
                    return JestDom.toHaveTextContent("1998 (+33)", undefined, eta);
                  })(Jest.Expect[/* expect */0]((function (eta) {
                            var param = undefined;
                            var param$1 = eta;
                            return ReactTestingLibrary.getByLabelText(partial_arg$4, param, param$1);
                          })(page)));
      }));

export {
  BattleForGothamCity ,
  
}
/*  Not a pure module */