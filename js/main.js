$(function() {
  var State = {
    inputUnits: "inputUnits",
    spaceBattleStart: "spaceBattleStart",
    spaceBattleNextRound: "spaceBattleNextRound",
    rollSpaceBattle: "rollSpaceBattle",
    applyHits: "applyHits",
    pdsFire: "pdsFire",
    dreadnoughtFire: "dreadnoughtFire",
    destroyerBarrage: "destroyerBarrage"
  };

  var UnitTypes = {
    carrier: "carrier",
    cruiser: "cruiser",
    destroyer: "destroyer",
    dreadnought: "dreadnought",
    fighter: "fighter",
    flagship: "flagship",
    groundforce: "groundforce",
    pds: "pds",
    spacedock: "spacedock",
    warsun: "warsun"
  };

  var BaseToHit = {
    groundforce: 8,
    carrier: 9,
    fighter: 9,
    pds: 6,
    warsun: 3,
    destroyer: 9,
    cruiser: 7,
    dreadnought: 5
  };

  var Technology = {
    advancedFighters: "advancedFighters",
    assaultCannon: "assaultCannon",
    automatedDefenseTurrets: "automatedDefenseTurrets",
    cybernetics: "cybernetics",
    gravitonLaserSystem: "gravitonLaserSystem",
    hylarVAssaultLaser: "hylarVAssaultLaser",
    magenDefenseGrid: "magenDefenseGrid",
    maneuveringJets: "maneuveringJets"
  };

  var Technologies = new Map([
    [Technology.advancedFighters, {
      name: "Advanced Fighers"
    }],
    [Technology.assaultCannon, {
      name: "Assault Cannon"
    }],
    [Technology.automatedDefenseTurrets, {
      name: "Automated Defense Turrets"
    }],
    [Technology.cybernetics, {
      name: "Cybernetics"
    }],
    [Technology.gravitonLaserSystem, {
      name: "Graviton Laser System"
    }],
    [Technology.hylarVAssaultLaser, {
      name: "Hylar V Assault Laser"
    }],
    [Technology.magenDefenseGrid, {
      name: "Magen Defense Grid"
    }],
    [Technology.maneuveringJets, {
      name: "Maneuvering Jets"
    }]
  ]);

  var Race = {
    arborec: "arborec",
    creuss: "creuss",
    hacan: "hacan",
    jolnar: "jolnar",
    l1z1x: "l1z1x",
    lazax: "lazax",
    letnev: "letnev",
    mentak: "mentak",
    muaat: "muaat",
    naalu: "naalu",
    nekro: "nekro",
    saar: "saar",
    sardakkNorr: "sardakkNorr",
    sol: "sol",
    winnu: "winnu",
    xxcha: "xxcha",
    yin: "yin",
    yssaril: "yssaril"
  };

  var Races = new Map([
    [Race.arborec, {
      name: "The Arborec",
      flagshipToHit: 6,
      flagshipDice: 2,
      flagshipName: "Duha Menaimon"
    }],
    [Race.creuss, {
      name: "The Ghosts of Creuss",
      flagshipToHit: 5,
      flagshipDice: 1,
      flagshipName: "Hil Colish"
    }],
    [Race.hacan, {
      name: "The Emirates of Hacan",
      flagshipToHit: 7,
      flagshipDice: 3,
      flagshipName: "Wrath of Kenara"
    }],
    [Race.jolnar, {
      name: "The Universities of Jol-Nar",
      flagshipToHit: 2,
      flagshipDice: 2,
      flagshipName: "J.N.S. Hylarim"
    }],
    [Race.l1z1x, {
      name: "The L1Z1X Mindnet",
      flagshipToHit: 5,
      flagshipDice: 3,
      flagshipName: "0.0.1"
    }],
    [Race.letnev, {
      name: "The Barony of Letnev",
      flagshipToHit: 5,
      flagshipDice: 2,
      flagshipName: "Arc Secundus"
    }],
    [Race.mentak, {
      name: "The Mentak Coalition",
      flagshipToHit: 5,
      flagshipDice: 2,
      flagshipName: "Fourth Moon"
    }],
    [Race.muaat, {
      name: "The Embers of Muaat",
      flagshipToHit: 5,
      flagshipDice: 3,
      flagshipName: "The Inferno"
    }],
    [Race.naalu, {
      name: "The Naalu Collective",
      flagshipToHit: 8,
      flagshipDice: 2,
      flagshipName: "Matriarch"
    }],
    [Race.nekro, {
      name: "The Nekro Virus",
      flagshipToHit: 9,
      flagshipDice: 3,
      flagshipName: "The Alastor"
    }],
    [Race.saar, {
      name: "The Clan of Saar",
      flagshipToHit: 6,
      flagshipDice: 3,
      flagshipName: "Son of Ragh"
    }],
    [Race.sardakkNorr, {
      name: "Sardakk N'oor",
      flagshipToHit: 5,
      flagshipDice: 3,
      flagshipName: "C'Morran Norr"
    }],
    [Race.sol, {
      name: "Federation of Sol",
      flagshipToHit: 5,
      flagshipDice: 3,
      flagshipName: "Genesis I"
    }],
    [Race.winnu, {
      name: "The Winnu",
      flagshipToHit: 7,
      flagshipDice: null,
      flagshipName: "Salai Sai Corian"
    }],
    [Race.xxcha, {
      name: "The Xxcha Kingdom",
      flagshipToHit: 6,
      flagshipDice: 2,
      flagshipName: "Loncara Ssodu"
    }],
    [Race.yin, {
      name: "The Yin Brotherhood",
      flagshipToHit: 5,
      flagshipDice: 2,
      flagshipName: "Van Hauge"
    }],
    [Race.yssaril, {
      name: "The Yssaril Tribes",
      flagshipToHit: 7,
      flagshipDice: 2,
      flagshipName: "Y'sia Y'ssrila"
    }]
  ]);

  var DestroyUnitsOrder = [
    UnitTypes.groundforce,
    UnitTypes.fighter,
    UnitTypes.destroyer,
    UnitTypes.cruiser,
    UnitTypes.carrier,
    UnitTypes.dreadnought,
    UnitTypes.warsun,
    UnitTypes.flagship,
    UnitTypes.pds,
    UnitTypes.spacedock
  ];

  var Sides = {
    left: "left",
    right: "right"
  };

  var _storage = window.localStorage;
  var _state = State.inputUnits;
  var _previousState = State.inputUnits;
  var _players = [];
  var _selectedPlayers = {};
  var _units = {};
  var _hits = {};
  var _fighterHits = {};
  var _applyHitsOrder = {};
  _applyHitsOrder["left"] = DestroyUnitsOrder;
  _applyHitsOrder["right"] = DestroyUnitsOrder;

  for (var side in Sides) {
    _units[side] = {};
    for (var unitId in UnitTypes) {
      _units[side][unitId] = {count: 0, damaged: 0};
    }
  };

  function isSpaceship(unitId) {
    switch (unitId) {
      case UnitTypes.fighter:
      case UnitTypes.destroyer:
      case UnitTypes.cruiser:
      case UnitTypes.carrier:
      case UnitTypes.dreadnought:
      case UnitTypes.warsun:
      case UnitTypes.flagship:
        return true;
      default:
        return false;
    }
  }

  function setUp() {
    loadFromStorage();
    $("#p1Units").submit("left", setUnits);
    $("#p2Units").submit("right", setUnits);
    $("#battle").submit(battle);
    $('#logs').on('shown.bs.collapse', function () {
      scrollLogs();
    });
    $("#addPlayer1").submit("left", addPlayer);
    $("#addPlayer2").submit("right", addPlayer);

    $("#reset").submit(reset);
    $("#addModifiers form").submit(addModifiers);
    $(".clearModifiers").click(clearModifiers);
    update();
  }

  function loadFromStorage() {
    if (_storage.getItem("state") != null) {
      _state = JSON.parse(_storage.getItem("state"));
    }
    if (_storage.getItem("previousState") != null) {
      _previousState = JSON.parse(_storage.getItem("previousState"));
    }
    if (_storage.getItem("players") != null) {
      _players = JSON.parse(_storage.getItem("players"));
    }
    if (_storage.getItem("selectedPlayers") != null) {
      _selectedPlayers = JSON.parse(_storage.getItem("selectedPlayers"));
    }
    if (_storage.getItem("units") != null) {
      _units = JSON.parse(_storage.getItem("units"));
    }
    if (_storage.getItem("hits") != null) {
      _hits = JSON.parse(_storage.getItem("hits"));
    }
    if (_storage.getItem("fighterHits") != null) {
      _fighterHits = JSON.parse(_storage.getItem("fighterHits"));
    }
    if (_storage.getItem("applyHitsOrder") != null) {
      _applyHitsOrder = JSON.parse(_storage.getItem("applyHitsOrder"));
    }
  }

  function updateStorage() {
    _storage.setItem("state", JSON.stringify(_state));
    _storage.setItem("previousState", JSON.stringify(_previousState));
    _storage.setItem("players", JSON.stringify(_players));
    _storage.setItem("selectedPlayers", JSON.stringify(_selectedPlayers));
    _storage.setItem("units", JSON.stringify(_units));
    _storage.setItem("hits", JSON.stringify(_hits));
    _storage.setItem("fighterHits", JSON.stringify(_fighterHits));
    _storage.setItem("applyHitsOrder", JSON.stringify(_applyHitsOrder));
  }

  function addModifiers(event) {
    event.preventDefault();
    console.log("add modifiers");
    var side = $(this).attr("side");
    var unitId = $(this).find(".unitIdInput").val();

    if (unitId != "all" && UnitTypes[unitId] == null) {
      alert("Unrecognized unit type " + unitId);
      throw unitId;
    }

    var modifier = parseInt($(this).find(".modifierInput").val(), 10);
    var player = _players[_selectedPlayers[side]];
    player.modifiers[unitId] = modifier;
    logForSide(side, unitId + " modifier " + modifier);
    update();
  }

  function clearModifiers(event) {
    event.preventDefault();
    var form = $(this).parent().parent();
    var side = $(form).attr("side");
    var player = _players[_selectedPlayers[side]];
    player.modifiers = {};
    logForSide(side, "clear all modifiers");
    update();
  }

  function setUnits(event) {
    event.preventDefault();

    var side = event.data;
    var text = $(event.target).find("input").first().val();
    parseUnits(side, text);
    logForSide(side, "new units: " + text);
    advanceToState(getStateAfter(State.spaceBattleNextRound, _state));
    update();
  }

  function unitTypeFromString(unitString) {
    var string = unitString.toLowerCase().trim();
    if (string.startsWith("ca")) {
      return UnitTypes.carrier;
    } else if (string.startsWith("cr")) {
      return UnitTypes.cruiser;
    } else if (string.startsWith("de")) {
      return UnitTypes.destroyer;
    } else if (string.startsWith("dr")) {
      return UnitTypes.dreadnought;
    } else if (string.startsWith("fi")) {
      return UnitTypes.fighter;
    } else if (string.startsWith("fl")) {
      return UnitTypes.flagship;
    } else if (string.startsWith("g")) {
      return UnitTypes.groundforce;
    } else if (string.startsWith("p")) {
      return UnitTypes.pds;
    } else if (string.startsWith("s")) {
      return UnitTypes.spacedock;
    } else if (string.startsWith("w")) {
      return UnitTypes.warsun;
    } else {
      alert("Unrecognized unit type: " + unitString);
      return null;
    }
  }

  function parseUnits(side, string) {
    var arr = string.split(/(\d+)/);
    arr.shift(); // remove first segment

    // Reset unit counts
    for (var unitId in UnitTypes) {
      _units[side][unitId] = {count: 0, damaged: 0, adjacent: 0};
    }

    for (var i = 0; i < arr.length; i += 2) {
      var unitString = arr[i+1];
      var damaged = false;
      if (unitString.startsWith("~")) {
        unitString = unitString.substring(1);
        damaged = true;
      }

      var adjacent = false;
      if (unitString.startsWith("@")) {
        unitString = unitString.substring(1);
        adjacent = true;
      }

      var unitType = unitTypeFromString(unitString);
      if (unitType == null) return;
      _units[side][unitType].count += parseInt(arr[i], 10);
      if (damaged) {
        _units[side][unitType].damaged += parseInt(arr[i], 10);
      }
      if (adjacent) {
        _units[side][unitType].adjacent += parseInt(arr[i], 10);
      }
    }
  }

  function addPlayer(event) {
    event.preventDefault();
    var side = event.data;
    var text = $(event.target).find("input").first().val();
    var technology = {};
    for (var tech of Technologies.keys()) {
      technology[tech] = {owned: false};
    }
    _players.push({name: text, technology: technology, modifiers: {}});

    _selectedPlayers[side] = _players.length - 1;
    update();
    logForSide(side, "add & switch to player " + text);
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function rollD10() {
    return randomInt(1, 10);
  }

  function logForSide(sideId, html) {
    if (sideId == "left") {
      $("#p1Log").append(html).append("<br />");
    } else {
      $("#p2Log").append(html).append("<br />");
    }
    scrollLogs();
  }

  function rollForHit(sideId, unitId, toHit, bonus, text) {
    if (bonus.logExtra == null) {
      bonus.logExtra = "";
    }

    var roll = rollD10();
    var plusBonus = "";
    if (bonus.bonus > 0) {
      plusBonus = " + " + bonus.bonus;
    } else if (bonus.bonus < 0) {
      plusBonus = " - " + (-1 * bonus.bonus);
    }

    var additionalLog = "";
    if (text != null) {
      additionalLog = " " + text;
    }

    var modifier = 0;
    if (_selectedPlayers[sideId] != null) {
      var playerModifiers = _players[_selectedPlayers[sideId]].modifiers;
      if (playerModifiers[unitId] != null) {
        modifier = playerModifiers[unitId];
      }
      if (playerModifiers["all"] != null) {
        modifier += playerModifiers["all"];
      }
      if (modifier != 0) {
        plusBonus += (modifier > 0 ? " + " : " ") + modifier + " ";
      }
    }

    if (roll + bonus.bonus + modifier >= toHit) {
      logForSide(sideId, unitId + " HIT: " + roll + plusBonus + " >= " + toHit + " " + bonus.logExtra + additionalLog);
      return true;
    } else {
      logForSide(sideId, unitId + " MISS: " + roll + plusBonus + " < " + toHit + " " + bonus.logExtra + additionalLog);
      return false;
    }
  }

  function getHitBonus(side, unitId) {
    var bonus = 0;
    var logExtra = "";
    switch (unitId) {
      case UnitTypes.fighter:
        if (sideHasTech(side, Technology.cybernetics)) {
          bonus += 1;
          logExtra += "[cybernetics]";
        }
        if (sideHasTech(side, Technology.advancedFighters)) {
          bonus += 1;
          logExtra += "[advancedFighters]";
        }
        break;
      case UnitTypes.destroyer:
        if (sideHasTech(side, Technology.hylarVAssaultLaser)) {
          bonus += 1;
          logExtra += "[hylarVAssaultLaser]";
        }
        break;
      case UnitTypes.pds:
        if (sideHasTech(side, Technology.magenDefenseGrid)) {
          bonus += 1;
          logExtra += "[magenDefenseGrid]";
        }
        break;
      case UnitTypes.cruiser:
        if (sideHasTech(side, Technology.hylarVAssaultLaser)) {
          bonus += 1;
          logExtra += "[hylarVAssaultLaser]";
        }
        break;
    }
    return {bonus: bonus, logExtra:logExtra};
  }

  function rollHitsForUnits(side, unitId) {
    var numHits = 0;
    var unit = _units[side][unitId];
    var base = BaseToHit[unitId];
    var bonus = {bonus: 0};

    if (_selectedPlayers[side] != null) {
      bonus = getHitBonus(side, unitId);
    }

    for (var i = 0; i < unit.count; ++i) {
      if (!isSpaceship(unitId)) {
        continue;
      }

      if (rollForHit(side, unitId, base, bonus)) {
        numHits += 1;
      }

      if (unitId == UnitTypes.warsun) {
        // Warsun gets 3 shots
        if (rollForHit(side, unitId, base, bonus, "[second]")) {
          numHits += 1;
        }
        if (rollForHit(side, unitId, base, bonus, "[third]")) {
          numHits += 1;
        }
      }
    }
    return numHits;
  }

  function opponentId(side) {
    return side == "left" ? "right" : "left" ;
  }

  function calculateHits() {
    for (var side in Sides) {
      var numHits = 0;
      for (unitId in UnitTypes) {
        numHits += rollHitsForUnits(side, unitId);
      }
      _hits[side] = numHits;
    };
  }

  function applyFighterHits() {
    for (var side in Sides) {
      var opponent = opponentId(side);
      while (_units[opponent][UnitTypes.fighter].count > 0 && _fighterHits[side] > 0) {
        _units[opponent][UnitTypes.fighter].count -= 1;
        _fighterHits[side] -= 1;
        logForSide(side, "barrage destroying fighter");
      }
    }
  }

  function applyHits() {
    for (var side in Sides) {
      var opponent = opponentId(side);
      var hits = _hits[side];
      var dreadnoughts = _units[opponent][UnitTypes.dreadnought];
      while (dreadnoughts.damaged < dreadnoughts.count && hits > 0) {
        dreadnoughts.damaged += 1;
        hits -= 1;
        logForSide(side, "damaging dreadnought");
      }
      var warsuns = _units[opponent][UnitTypes.warsun];
      while (warsuns.damaged < warsuns.count && hits > 0) {
        warsuns.damaged += 1;
        hits -= 1;
        logForSide(side, "damaging warsun");
      }

      _applyHitsOrder[opponent].forEach(function(unitId) {
        if (isSpaceship(unitId)) {
          var unit = _units[opponent][unitId];
          while (unit.count > 0 && hits > 0) {
            unit.count -= 1;
            hits -= 1;

            if (unit.damaged > unit.count) {
              unit.damaged = unit.count;
            }

            logForSide(side, "destroying " + unitId);
          }
        }
      });
    };
  }

  function sideHasTech(side, tech) {
    if (side == null || tech == null) throw "null argument";
    return _selectedPlayers[side] != null && _players[_selectedPlayers[side]].technology[tech].owned;
  }

  function applyPdsFire() {
    // TODO opponents get -1 for PDS with maneuvering jets & -2 from adjacent systems
    for (var side in Sides) {
      var numHits = 0;
      var unitId = UnitTypes.pds;
      var unit = _units[side][unitId];
      var base = BaseToHit[unitId];
      var bonus = {bonus: 0};
      var player;

      if (_selectedPlayers[side] != null) {
        bonus = getHitBonus(side, unitId);
      }

      for (var i = 0; i < unit.count; ++i) {
        var logExtra = "";
        var opponent = opponentId(side);
        var modifiedBonus = _.clone(bonus);
        if (sideHasTech(opponent, Technology.maneuveringJets)) {
          // To-hit penalty if opponent has maneuvering jets
          modifiedBonus.logExtra += "[jets]";
          if (i < unit.adjacent) {
            modifiedBonus.bonus -= 2;
          } else  {
            modifiedBonus.bonus -= 1;
          }
        }

        if (rollForHit(side, unitId, base, modifiedBonus, logExtra)) {
          numHits += 1;
        } else if (sideHasTech(side, Technology.gravitonLaserSystem)) {
          // Graviton laser system reroll
          if (rollForHit(side, unitId, base, modifiedBonus, "[reroll]")) {
            numHits += 1;
          }
        }
      }
      _hits[side] = numHits;
    }
  }

  function applyDreadnoughtFire() {
    for (var side in Sides) {
      var numHits = 0;
      var unitId = UnitTypes.dreadnought;
      var unit = _units[side][unitId];
      var base = BaseToHit[unitId];
      var bonus = {bonus: 0};

      if (_selectedPlayers[side] != null) {
        bonus = getHitBonus(side, unitId);
      }

      for (var i = 0; i < unit.count; ++i) {
        if (rollForHit(side, unitId, base, bonus)) {
          numHits += 1;
        }
      }
      _hits[side] = numHits;
    }
  }

  function applyDestroyerBarrage() {
    for (var side in Sides) {
      var numFighterHits = 0;
      var unitId = UnitTypes.destroyer;
      var unit = _units[side][unitId];
      var base = BaseToHit[unitId];
      var bonus = {bonus: 0};

      if (_selectedPlayers[side] != null) {
        bonus = getHitBonus(side, unitId);
      }

      var modifiedBonus = _.clone(bonus);
      if (sideHasTech(Technology.automatedDefenseTurrets)) {
        modifiedBonus.bonus += 2;
        modifiedBonus.logExtra += "[automatedDefenseTurrets]";
      }

      for (var i = 0; i < unit.count; ++i) {
        // Roll twice for barrage
        if (rollForHit(side, unitId, base, bonus)) {
          numFighterHits += 1;
        }
        if (rollForHit(side, unitId, base, bonus, "[2nd roll]")) {
          numFighterHits += 1;
        }

        if (sideHasTech(Technology.automatedDefenseTurrets)) {
          // Automated defense turrets grant additional die
          if (rollForHit(side, unitId, base, bonus, "[3rd roll (turrets)]")) {
            numFighterHits += 1;
          }
        }
      }
      _fighterHits[side] = numFighterHits;
    }
  }

  function reset(event) {
    event.preventDefault();
    _previousState = State.spaceBattleStart;
    _state = State.spaceBattleStart;
    advanceToState(getStateAfter(_state, _previousState));
    update();
  }

  function battle(event) {
    // TODOs
    // PDS Fire
    // Pre-combat dreadnought fire from assault cannon
    // Destroyer A.F. barrage
    // Post-round repairs
    // Notify of fighter destruction after space battle

    event.preventDefault();
    switch (_state) {
      case State.pdsFire:
        applyPdsFire();
        break;
      case State.dreadnoughtFire:
        applyDreadnoughtFire();
        break;
      case State.destroyerBarrage:
        applyDestroyerBarrage();
        break;
      case State.rollSpaceBattle:
        calculateHits();
        break;
      case State.applyHits:
        if (_previousState == State.destroyerBarrage) {
          applyFighterHits();
        } else {
          applyHits();
        }
        break;
      default:
        throw "Unrecognized state: " + _state;
    }

    advanceToState(getStateAfter(_state, _previousState));
    update();
  }

  function sortStop(event, ui) {
    var sideId = $(event.target).attr("sideId");
    var order = [];
    $(event.target).children("li").each(function() {
      order.push($(this).attr("unitId"));
    });
    DestroyUnitsOrder.forEach(function(unitId) {
      if (!order.includes(unitId)) {
        order.push(unitId);
      }
    });
    _applyHitsOrder[sideId] = order;
    updateStorage();
  }

  function scrollLogs() {
    $("#p1Log").scrollTop($("#p1Log")[0].scrollHeight);
    $("#p2Log").scrollTop($("#p2Log")[0].scrollHeight);
  }

  function switchPlayer(event) {
    var side = event.data;
    var playerIndex = $(event.target).attr("index");
    _selectedPlayers[side] = parseInt(playerIndex, 10);
    update();
    logForSide(side, "switch to player " + _players[playerIndex].name);
  }

  function technologyChecked() {
    var techId = $(this).attr("techId");
    var side = $(this).attr("side");
    var checked = $(this).prop("checked");
    var playerId = _selectedPlayers[side];
    _players[playerId].technology[techId].owned = checked;
    logForSide(side, "has tech " + techId + " = " + checked);
    update();
  }

  function unitIsPresent(unitId) {
    return _units["left"][unitId].count > 0 || _units["right"][unitId].count > 0;
  }

  function unitIsPresentWithTechnology(unitId, techId) {
    return (_units["left"][unitId].count > 0 && sideHasTech("left", techId)) ||
        (_units["right"][unitId].count > 0 && sideHasTech("right", techId));
  }

  function totalUnitsOnSide(side) {
    var result = 0;
    for (var unitId in UnitTypes) {
      result += _units[side][unitId].count;
    }
    return result;
  }

  function buttonLabelForCurrentState() {
    switch (_state) {
      case State.inputUnits:
      case State.spaceBattleStart:
      case State.spaceBattleNextRound:
        return null;
      case State.pdsFire:
        return "PDS Fire";
      case State.dreadnoughtFire:
        return "Dreadnought Fire";
      case State.destroyerBarrage:
        return "Destroyer Anti-Fighter Barrage";
      case State.rollSpaceBattle:
        return "Roll Combat";
      case State.applyHits:
        return "Apply Hits";
    }
    throw "unknown state";
  }

  function advanceToState(state) {
    _previousState = _state;
    _state = state;
    logForSide("left", _previousState + "->" + _state);
    logForSide("right", _previousState + "->" + _state);
  }

  function getStateAfter(state, previousState) {
     if (totalUnitsOnSide("left") == 0 || totalUnitsOnSide("right") == 0) {
      return State.inputUnits;
    }

    switch (state) {
      case State.inputUnits:
      case State.spaceBattleStart:
        if (unitIsPresent(UnitTypes.pds)) {
          return State.pdsFire;
        }
        // Intentional fall-through
      case State.pdsFire:
        if (state == State.pdsFire && previousState != State.applyHits) {
          return State.applyHits;
        }
        if (unitIsPresentWithTechnology(UnitTypes.dreadnought, Technology.assaultCannon)) {
          return State.dreadnoughtFire;
        }
        // Intentional fall-through
      case State.dreadnoughtFire:
        if (state == State.dreadnoughtFire && previousState != State.applyHits) {
          return State.applyHits;
        }
        if (unitIsPresent(UnitTypes.destroyer)) {
          return State.destroyerBarrage;
        }
        // Intentional fall-through
      case State.destroyerBarrage:
          if (state == State.destroyerBarrage && previousState != State.applyHits) {
          return State.applyHits;
        }
      case State.spaceBattleNextRound:
        return State.rollSpaceBattle;
      case State.rollSpaceBattle:
        return State.applyHits;
      case State.applyHits:
        switch (previousState) {
          case State.pdsFire:
            return getStateAfter(State.pdsFire, State.applyHits);
          case State.dreadnoughtFire:
            return getStateAfter(State.dreadnoughtFire, State.applyHits);
          case State.destroyerBarrage:
            return getStateAfter(State.destroyerBarrage, State.applyHits);
          default:
            return getStateAfter(State.spaceBattleNextRound, State.applyHits);
        }
    }
    throw "No state";
  }

  var unitsTemplate = _.template(
    "<div class='col-lg-6'>" +
      "<ul class='sortable' sideId='<%=side%>'>" +
      "<% unitIds.forEach(function(unitId) { %>" +
        "<% var unit = units[unitId]; %>" +
        "<% if (unit.count > 0) { %>" +
          "<li class='unitDisplay' unitId='<%=unitId%>'>" +
            "<img src='img/<%=unitId%>.png' class='unitImage'/><br />" +
            "<b><%= unitId %></b> <%= unit.count %> " +
            "<% if (unit.damaged > 0) { %>" +
              "<span class='damaged'>(<%= unit.damaged %>)</span>" +
            "<% } %>" +
            "<% if (unit.adjacent > 0) { %>" +
              "<span class='adjacent'>(<%= unit.adjacent %> adjacent)</span>" +
            "<% } %>" +
          "</li>" +
        "<% } %>" +
      "<% }); %>" +
      "</ul>" +
    "</div>"
  );

  var hitCountTemplate = _.template(
    "<div class='col-lg-6'>" +
      "<h3>Rolled <%= hits %> hits</h3>" +
    "</div>"
  );

  var fighterHitCountTemplate = _.template(
    "<div class='col-lg-6'>" +
      "<h3>Rolled <%= hits %> fighter hits</h3>" +
    "</div>"
  );

  var battleButtonTemplate = _.template(
    "<button type='submit' class='btn btn-primary btn-large'><%= text %></button>"
  );

  var playerNameTemplate = _.template(
    "<li class='playerMenuItem' index='<%=index%>'>" +
    "<% if (selected) { %>" +
      "<span class='glyphicon glyphicon-ok okIcon'></span>" +
    "<% } %>" +
    "<%= playerName %></li>"
  );

  var raceNameTempalte = _.template(
    "<li class='raceMenuItem' index='<%=index%>'>" +
    "<% if (selected) { %>" +
      "<span class='glyphicon glyphicon-ok okIcon'></span>" +
    "<% } %>" +
    "<%= raceName %></li>"
  );

  var technologiesTemplate = _.template(
    "<div class='col-lg-3'>" +
      "<% for (var i = startIndex; i < endIndex; ++i) { %>" +
        "<% var tech = Array.from(technologies.keys())[i]; %>" +
        "<div class='checkbox'>" +
          "<label>" +
            "<input type='checkbox' techId='<%=tech%>' side='<%=side%>' " +
                "<%if (playerTechnology[tech].owned) { %>checked<% } %> " +
                "class='techCheckbox'> <%=technologies.get(tech).name%>" +
          "</label>" +
        "</div>" +
      "<% } %>" +
    "</div>"
  );

  var modifiersTemplate = _.template(
    "<div class='col-lg-6'>" +
    "<% for (var modifier in modifiers) { %>" +
      "<div class='modifierDescription'>" +
      "<b><%= modifier %></b> " +
      "<% if (modifiers[modifier] > 0) {%>+<% }%>" +
      "<%= modifiers[modifier] %>" +
      "</div>" +
    "<% } %>" +
    "</div>"
  );

  function update() {
    $("#units").empty();
    $("#battle").empty();
    $("#battleInfo").empty();
    $(".playerInput li").not(".addPlayerItem").remove();
    $("#leftHeading").empty();
    $("#rightHeading").empty();
    $("#technologies").empty();
    $("#modifiers").empty();

    var side;
    var label = buttonLabelForCurrentState();
    if (label != null) {
      $("#battle").append(battleButtonTemplate({text: label}));
    }

    _players.forEach(function(player, index) {
      $("#p1Input .addPlayerItem").before(playerNameTemplate({
        playerName: player.name,
        index: index,
        selected: _selectedPlayers["left"] == index
      }));
      $("#p2Input .addPlayerItem").before(playerNameTemplate({
        playerName: player.name,
        index: index,
        selected: _selectedPlayers["right"] == index
      }));
    });
    $("#p1Input li").not(".addPlayerItem").on("click", null, "left", switchPlayer);
    $("#p2Input li").not(".addPlayerItem").on("click", null, "right", switchPlayer);

    for (side in Sides) {
      if (_players[_selectedPlayers[side]] != null) {
        $("#modifiers").append(modifiersTemplate({
          modifiers: _players[_selectedPlayers[side]].modifiers
        }));
      }
    }

  if (_selectedPlayers["left"] != null && _selectedPlayers["right"] != null) {
    $("#addModifiers").show();
  } else {
    $("#addModifiers").hide();
    $("#selectRace").hide();
  }

    for (side in Sides) {
      if (_units[side] != null) {
        $("#units").append(unitsTemplate({
          unitIds: _applyHitsOrder[side],
          units: _units[side],
          side: side
        }));
      }

      if (_state == State.applyHits) {
        if (_previousState == State.destroyerBarrage) {
          $("#battleInfo").append(fighterHitCountTemplate({hits: _fighterHits[side]}));
        } else {
          $("#battleInfo").append(hitCountTemplate({hits: _hits[side]}));
        }
      }
    };

    for (side in Sides) {
      if (_players[_selectedPlayers[side]] != null) {
        $("#technologies").append(technologiesTemplate({
          playerTechnology: _players[_selectedPlayers[side]].technology,
          technologies: Technologies,
          startIndex: 0,
          endIndex: Math.floor(Technologies.size / 2),
          side: side
        }));
        $("#technologies").append(technologiesTemplate({
          playerTechnology: _players[_selectedPlayers[side]].technology,
          technologies: Technologies,
          startIndex: Math.floor(Technologies.size / 2),
          endIndex: Math.floor(Technologies.size),
          side: side
        }));
      }
    }
    $(".techCheckbox").click(technologyChecked);

    var leftName = _selectedPlayers["left"] == null ? "Player 1" : _players[_selectedPlayers["left"]].name;
    var rightName = _selectedPlayers["right"] == null ? "Player 2" : _players[_selectedPlayers["right"]].name;
    $("#leftHeading").append(leftName);
    $("#rightHeading").append(rightName);

    $(".sortable").sortable().bind('sortstop', sortStop);
    updateStorage();
  }

  setUp();
});
