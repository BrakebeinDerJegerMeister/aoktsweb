import { ascii, u8, u16, u32, f32, s8, s16, s32, str, arrayOf, arrayData, section, subSection } from "./types";



export function ScenarioStructs(ext: string, version: number) {


    let currentVersion: number = 0;
    let showMe = { "showMe": true }
    //let showMeMore = function (n) { return { "showMeMore": true, "varName": n } }



    class ScenarioHeader {
        nextUnitID: typeof u32;
        version: typeof f32;
        playerNames: typeof arrayOf;
        strTablePlayerNames: typeof arrayOf;
        playerData1: typeof arrayOf;
        conquestMode: typeof u8;
        missionItemsCounter: typeof u16;
        missionAvailable: typeof u16;
        missionTimeline: typeof f32;
        missionItem: typeof arrayOf;
        originalFilename: typeof str;
        constructor() {
            let afterRead1 = { "afterRead": () => currentVersion = this.version.value }
            let use1 = { "use": () => currentVersion >= 1.18 }

            this.nextUnitID = u32();
            this.version = f32(afterRead1, showMe);
            this.playerNames = arrayOf(ascii(256), 16, showMe);
            this.strTablePlayerNames = arrayOf(u32(), 16);
            this.playerData1 = arrayOf(subSection(PlayerData1), 16, use1);
            this.conquestMode = u8();
            this.missionItemsCounter = u16();
            this.missionAvailable = u16();
            this.missionTimeline = f32();
            this.missionItem = arrayOf(arrayData(30), () => this.missionItemsCounter.value);
            this.originalFilename = str(u16(), showMe);
        }
    }

    class PlayerData1 {
        isActive: u32;
        isHuman: u32;
        civilization: u32;
        ctyMode: u32;
        constructor() {
            this.isActive = u32();
            this.isHuman = u32();
            this.civilization = u32();
            this.ctyMode = u32();
        }
    }

    class Messages {
        instructionsStrTable: s32;
        hintsStrTable: s32;
        victoryStrTable: s32;
        lossStrTable: s32;
        historyStrTable: s32;
        scoutsStrTable: s32;
        instructions: str;
        hints: str;
        victory: str;
        loss: str;
        history: str;
        scouts: str;
        constructor() {
            let use1 = { "use": () => currentVersion >= 1.18 }
            let use2 = { "use": () => currentVersion >= 1.22 }

            this.instructionsStrTable = s32(use1);
            this.hintsStrTable = s32(use1);
            this.victoryStrTable = s32(use1);
            this.lossStrTable = s32(use1);
            this.historyStrTable = s32(use1);
            this.scoutsStrTable = s32(use2);
            this.instructions = str(u16());
            this.hints = str(u16());
            this.victory = str(u16());
            this.loss = str(u16());
            this.history = str(u16());
            this.scouts = str(u16(), use2);
        }
    }

    function Cinematics() {
        this.pregameCinematicFilename = str(u16());
        this.victoryCinematicFilename = str(u16());
        this.lossCinematicFilename = str(u16());
    }

    function Bitmap() {
        this.backgroundFilename = str(u16());
        this.bitampIncluded = u32(showMe);
        this.bitmapWidth = u32();
        this.bitmapHeight = s32();
        this.orientation = s16();

        let dimOK = _ => this.bitmapWidth.value >= 0 && this.bitmapHeight.value >= 0;
        let includedOK = _ => this.bitampIncluded.value == -1 || this.bitampIncluded.value == 2;
        let readMe = { "use": _ => dimOK() && includedOK() }

        this.bitmapinfoHeader = subSection(BitmapInfoHeader, readMe);
        this.image = arrayData(_ => this.bitmapWidth.value * this.bitmapHeight.value, readMe);
    }
    function BitmapInfoHeader() {
        this.biSize = u32(showMe);
        this.biWidth = s32(showMe);
        this.biHeight = s32(showMe);
        this.biPlanes = u16();
        this.biBitCount = u16();
        this.biCompression = u32();
        this.biSizeImage = u32();
        this.biXPelsPerMeter = s32();
        this.biYPelsPerMeter = s32();
        this.biClrUsedCount = u32(showMe);
        this.biClrImportant = u32(showMe);
        this.corrector1 = u32();
        this.corrector2 = u32();
        //this.biColorsUsed = arrayOf(u32(), _=> this.biClrUsedCount.value);
        //this.image = arrayOf(u32(), _=> this.biSizeImage.value);
    }

    function PlayerData2() {
        //this.strings = arrayOf(str(u16()), 32);
        this.vcNames = arrayOf(str(u16()), 16);
        this.ctyNames = arrayOf(str(u16()), 16);
        this.perNames = arrayOf(str(u16()), 16);
        this.aiFiles = arrayOf(subSection(AIFile), 8);
        this.aiType = arrayOf(u8(), 16);
        this.separator = s32();
        this.resources = arrayOf(subSection(Resources), 16);
    }

    function AIFile() {
        this.vcPerFileLength = u32();
        this.ctyPerFileLength = u32();
        this.perPerFileLength = u32();
        this.vcPerFileData = str(u16());
        this.ctyPerFileData = str(u16());
        this.perPerFileData = str(u16());
    }

    function Resources() {
        let use1 = { "use": _ => ext == "aoe2scenario" }

        this.gold = u32();
        this.wood = u32();
        this.food = u32();
        this.stone = u32();
        this.oreX = u32();
        this.padding = u32();
        this.playerColor = u32(use1);
    }

    function GlobalVictory() {
        this.separator = s32();
        this.conquestRequired = u32();
        this.ruins = u32();
        this.artifactsRequired = u32();
        this.discovery = u32();
        this.exploredRequired = u32();
        this.goldRequired = u32();
        this.allCustomConditions = u32();
        this.mode = u32();
        this.scoreVictory = u32();
        this.time = u32();
    }

    function Diplomacy() {
        let use1 = { "use": _ => ext == "aoe2scenario" }

        this.perPlayerDiplomacy = arrayOf(subSection(PerPlayerDiplomacy), 16);
        this.unused = arrayData(11520);
        this.separator = s32(showMe);
        this.alliedVictories = arrayOf(u32(), 16);
        this.unknown = u32(use1);
    }

    function PerPlayerDiplomacy() {
        this.stanceWithEachPlayer = arrayOf(u32(), 16);
    }

    function Disables() {
        let use1 = { "use": _ => currentVersion >= 1.30 }
        let num = _ => ext == "aoe2scenario" ? 30 : 20

        this.disabledTechsCount = arrayOf(u32(), 16);
        this.disabledTechs = arrayOf(arrayOf(u32(), 30), 16);
        this.extraDisabledTechs = arrayOf(arrayOf(u32(), 30), 16, use1);
        this.disabledUnitsCount = arrayOf(u32(), 16);
        this.disabledUnits = arrayOf(arrayOf(u32(), 30), 16);
        this.extraDisabledUnits = arrayOf(arrayOf(u32(), 30), 16, use1);
        this.disabledBuildingsCount = arrayOf(u32(), 16);
        this.disabledBuildings = arrayOf(arrayOf(u32(), num), 16);
        this.extraDisabledBuildings = arrayOf(arrayOf(u32(), 40), 16, use1);
        this.unused1 = u32();
        this.unused2 = u32();
        this.allTechs = u32();
        this.startingAge = arrayOf(u32(), 16);
    }

    function GameMap() {
        let use1 = { "use": _ => currentVersion >= 1.21 }
        let use2 = { "use": _ => ext == "aoe2scenario" }

        this.separator = s32(showMe);
        this.Player1cameraY = s32();
        this.Player1cameraX = s32();
        this.aiType = s32(use1);
        this.unknown = arrayData(16, use2);
        this.mapWidth = u32(showMe);
        this.mapHeight = u32(showMe);
        this.terrain = arrayOf(subSection(Terrain), _ => this.mapWidth.value * this.mapHeight.value);
    }

    function Terrain() {
        this.terrainId = u8();
        this.elevation = u8();
        this.unused = u8();
    }

    function UnitsSection() {
        this.unitSectionCount = u32(showMe);
        this.playerData4 = arrayOf(subSection(PlayerData4), 8);
        this.playerUnits = arrayOf(subSection(PlayerUnits), _ => this.unitSectionCount.value);
    }

    function PlayerData4() {
        let use1 = { "use": _ => currentVersion >= 1.21 }

        this.food = f32();
        this.wood = f32();
        this.gold = f32();
        this.stone = f32();
        this.oreX = f32();
        this.padding = f32();
        this.popLimit = f32(use1);
    }

    function PlayerUnits() {
        this.unitCount = u32();
        this.units = arrayOf(subSection(Unit), _ => this.unitCount.value);
    }

    function Unit() {
        this.xPosition = f32();
        this.yPosition = f32();
        this.unknown1 = f32();
        this.unitID = u32()
        this.unitConstant = u16();
        this.unknown2 = u8();
        this.rotation = f32();
        this.initialAnimationFrame = u16();
        this.garrisonnedInID = u32();
    }

    function PlayerData3() {
        this.playerCount = u32();
        this.subPlayerData3 = arrayOf(subSection(SubPlayerData3), 8);
        this.unknown1 = u32();
        this.unknown2 = u32();
    }

    function SubPlayerData3() {
        this.constantName = str(u16());
        this.initialCameraX = f32();
        this.initialCameraY = f32();
        this.unknown1X = s16();
        this.unknown2Y = s16();
        this.alliedVictory = u8();
        this.diplomacyCount = u16();
        this.diplomacy1 = arrayOf(u8(), _ => this.diplomacyCount.value);
        this.diplomacy2 = arrayOf(u32(), _ => this.diplomacyCount.value);
        this.color = u32();
        this.victoryVersion = f32();
        this.count = u16();
        this.unknown3 = arrayOf(u8(), _ => this.victoryVersion.value == 2.0 ? 8 : 0);
        this.unknown4 = arrayOf(arrayData(44), _ => this.count.value);
        this.unknown5 = arrayOf(u8(), 7);
        this.unknown6 = s32();
    }

    function Triggers() {
        this.triggersInstructionsStart = u8();
        //this.triggerCount = s32(">>>>>>>>");
        this.triggerCount = s32();
        this.triggerData = arrayOf(subSection(Trigger), _ => this.triggerCount.value);
        this.triggerDisplayOrder = arrayOf(u32(), _ => this.triggerCount.value);
        //this.array = arrayData(Infinity);
        //this.variableCount = u32();
    }

    function Trigger() {
        //this.enabled = u32("=======> TRIGGER ========>>>>>");
        this.enabled = u32();
        this.looping = s8();
        this.stringTableID = s32();
        this.objective = u8();
        this.descriptionOrder = u32();
        this.triggerStartingTime = u32();
        this.triggerDescription = str(u32());
        this.triggerName = str(u32());
        this.effectCount = s32();
        this.effects = arrayOf(subSection(Effect), _ => this.effectCount.value);
        this.effectDisplayOrder = arrayOf(s32(), _ => this.effectCount.value);
        this.conditionCount = s32();
        this.conditions = arrayOf(subSection(Condition), _ => this.conditionCount.value);
        this.conditionDisplayOrder = arrayOf(s32(), _ => this.conditionCount.value);
    }

    const Effects = [
        [""],
        ["Change Diplomacy"],
        ["Research"],
        ["Chat"],
        ["Sound"],
        ["Tribute"],
        ["Unlock Gate"],
        ["Lock Gate"],
        ["Activate"],
        ["Deactivate"],
        ["AI Script Goal"],
        ["Create"],
        ["Task"],
        ["Declare Victory"],
        ["Kill"],
        ["Remove"],
        ["Change View"],
        ["Unload"],
        ["Change Ownership"],
        ["Patrol / Reseed"],
        ["Instructions"],
        ["Clear Instructions"],
        ["Freeze (No Attack)"],
        ["Use Advanced Buttons"],
        ["Damage"],
        ["Place Foundation"],
        ["Rename"],
        ["HP"],
        ["Attack"],
        ["Stop Unit"],
        ["Attack-Move"],
        ["Armor"],
        ["Range"],
        ["Speed"],
        ["Heal"],
        ["Teleport One"],
        ["Change Stance"]
    ];
    let test = new Map();

    function Effect() {
        //this.effectType = s32({debug:"<<---- effectType -------------------------->>"});
        let afterRead = {
            "afterRead": _ => {
                let effectName = Effects[this.effectType.value][0];
                if (!test.has(effectName)) {
                    test.set(effectName, new Set());
                }
                /**
                 * @type {Set}
                 */
                let eff = test.get(effectName);
                eff.add(this.usedVariables.value);
            }
        }
        //this.effectType = s32(showMeMore("effectType"));
        this.effectType = s32();
        //this.effectLength = s32({debug:"Length"});
        this.usedVariables = s32(afterRead);
        this.aiScriptGoal = s32();
        this.amount = s32();
        this.resourceType = s32();
        this.diplomacy = s32();
        //this.numSelected = s32(showMeMore("numSelected"));
        this.numSelected = s32();
        this.data = arrayData(_ => this.usedVariables.value * 4 - 20);
        // this.unitID = s32("unitID");
        // this.unitName = s32("unitName");
        // this.playerSource = s32("playerSource");
        // this.playerTarget = s32("playerTarget");
        // this.technology = s32("technology");
        // this.stringID = s32("stringID");
        // this.soundResourceID = s32("soundResourceID");
        // this.displayTime = s32("displayTime");
        // this.triggerID = s32("triggerID");
        // this.locationX = s32("locationX");
        // this.locationY = s32("locationY");
        // this.areaX1 = s32("areaX1");
        // this.areaY1 = s32("areaY1");
        // this.areaX2 = s32("areaX2");
        // this.areaY2 = s32("areaY2");
        // this.unitGroup = s32("unitGroup");
        // this.unitType = s32("unitType");
        // this.instructionPanel = s32("instructionPanel");
        // this.unknown2 = u32("unknown2");
        // this.unknown3 = u32("unknown3");
        // this.unknown4 = u32("unknown4");
        // this.unknown5 = u32("unknown5");
        // this.unknown6 = u32("unknown6");
        // this.unknown7 = u32("unknown7");
        // this.unknown8 = u32("unknown8");
        // this.unknown9 = u32("unknown9");
        // this.unknown10 = u32("unknown10");
        // this.unknown11 = u32("unknown11");
        // this.unknown12 = u32("unknown12");
        // this.unknown13 = u32("unknown13");
        // this.unknown14 = u32("unknown14");
        // this.unknown15 = u32("unknown15");
        // this.unknown19 = u32("unknown19");
        // this.unknown20 = u32("unknown20");
        // this.unknown21 = u32("unknown21");
        // this.unknown22 = u16("unknown22");
        this.instructionText = str(u32());
        this.soundFilename = str(u32());
        //this.soundFilename2 = str(u32(), "soundFilename2");
        // this.unknown23 = u32("unknown23");
        // this.unknown24 = u32("unknown24");
        // this.unknown25 = u32("unknown25");
        // this.unknown26 = u32("unknown26");
        // this.unknown27 = u32("unknown27");
        // this.unknown28 = u32("unknown28");
        // this.unknown29 = u32("unknown29");
        // this.unknown30 = u32("unknown30");
        // this.unknown31 = u32("unknown31");
        // this.unknown32 = u32("unknown32");
        // this.unknown33 = u32("unknown33");
        // this.unknown34 = u32("unknown34");
        // this.unknown35 = u32("unknown35");
        // this.unknown36 = u32("unknown36");
        // this.unknown37 = u32("unknown37");
        // this.unknown38 = u32("unknown38");
        // this.unknown39 = u32("unknown39");
        if (ext == "aoe2scenario") {
            null;
        }
        this.selectedUnitsIds = arrayOf(s32(), _ => this.numSelected.value);
    }

    function Condition() {
        this.conditionType = s32();
        this.conditionLength = s32();
        this.data = arrayData(_ => this.conditionLength.value * 4);
        // this.amount = s32();
        // this.resource = s32();
        // this.unitObject = s32();
        // this.unitID = s32();
        // this.unitName = s32();
        // this.player = s32();
        // this.technology = s32();
        // this.timer = s32();
        // this.unknown1 = s32();
        // this.areaX1 = s32();
        // this.areaY1 = s32();
        // this.areaX2 = s32();
        // this.areaY2 = s32();
        // this.unitGroup = s32();
        // this.unitType = s32();
        // this.aiSignal = s32();
    }

    function IncludedFiles() {
        let afterRead = {
            "afterRead": _ => {
                console.log(test);
            }
        }
        this.filesIncluded = u32(afterRead);
        this.perFileErrorDataIncluded = u32();
    }

    function Unknown() {
        this.unknown = arrayData(Infinity);
    }



    class CompressedSection {
        scenarioHeader = section(ScenarioHeader);
        messages = section(Messages);
        cinematics = section(Cinematics);
        bitmap = section(Bitmap);
        playerData2 = section(PlayerData2);
        globalVictory = section(GlobalVictory);
        diplomacy = section(Diplomacy);
        disables = section(Disables);
        gameMap = section(GameMap);
        unitsSection = section(UnitsSection);
        playerData3 = section(PlayerData3);
        triggers = section(Triggers);
        includedFiles = section(IncludedFiles);
        unknown = section(Unknown);
    }

    this.uncompressedHeader = section(UncompressedHeader);
    this.compressedSection = section(CompressedSection);


}

