/* eslint-disable no-unused-vars */
import ArrayBufferReader from "../../utils/ArrayBufferReader";

import allRefs from "../../data/fileHeader/allrefs.json";
import defaultRefs from "../../data/fileHeader/default.json";
import files from "../../data/fileHeader/files.json";
import games from "../../data/fileHeader/games.json";
import sets from "../../data/fileHeader/sets.json";
import versions from "../../data/fileHeader/versions.json";

const structs = {
  "allRefs.json": allRefs, "default.json": defaultRefs, "files.json": files, "games.json": games, "sets.json": sets, "versions.json": versions
}

function deepMerge(target, source) {
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge({ ...targetValue }, sourceValue);
    }
    else {
      target[key] = sourceValue;
    }
  });
  return target;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

class FileHeaderParser {
  myArrBuffRdr;
  myStruct;

  #fields = new Map();
  usedFields = [];
  #ext;

  #initVal(valName) {
    let structVal = this.myStruct.uncompressedHeader[valName];
    if (structVal) {

      if (structVal.lenFrom) {
        let refs = structVal.lenFrom.split(".");
        let myLen = this.myStruct;
        for (const ref of refs) {
          myLen = myLen[ref];
        }
        structVal.len = myLen.value;
        console.log("myLen :", myLen.value)
      }
      this.myArrBuffRdr.read(structVal);

      if (structVal.gteMergeStruct) {
        Object.entries(structVal.gteMergeStruct).forEach((entry) => {
          if (structVal.value >= Number(entry[0])) {
            let elts = entry[1].split(":")
            let myStruct = structs[elts[0]];
            for (const ref of elts[1].split(".")) {
              myStruct = myStruct[ref];
            }
            deepMerge(this.myStruct, JSON.parse(JSON.stringify(myStruct)))
          }
        });
      }

      if (structVal.eqMergeStruct) {
        Object.entries(structVal.eqMergeStruct).forEach((entry) => {
          if (structVal.value == Number(entry[0])) {
            let elts = entry[1].split(":")
            let myStruct = structs[elts[0]];
            for (const ref of elts[1].split(".")) {
              myStruct = myStruct[ref];
            }
            deepMerge(this.myStruct, JSON.parse(JSON.stringify(myStruct)))
          }
        });
      }

      this.#fields.set(valName, structVal);
    }
  }

  constructor (arrayBuffer, filename) {
    this.myArrBuffRdr = new ArrayBufferReader(arrayBuffer);
    this.#ext = filename.split(".").slice(-1)[0];
    this.myStruct = JSON.parse(JSON.stringify(allRefs));
    this.myStruct = deepMerge(this.myStruct, JSON.parse(JSON.stringify(defaultRefs)))

    switch (this.#ext.toLowerCase()) {
      case "scx":
        this.myStruct = deepMerge(this.myStruct, JSON.parse(JSON.stringify(files.scx)))
        break;
      case "aoe2scenario":
        this.myStruct = deepMerge(this.myStruct, JSON.parse(JSON.stringify(files.aoe2scenario)))
        break;
    }

    Object.keys(this.myStruct.uncompressedHeader).forEach((k) => {
      this.usedFields.push(k);
      this.#initVal(k);
    });

  }
  getValueOf(valName) {
    return this.#fields.get(valName) || null;
  }

  toData() { }
}

export default FileHeaderParser;
