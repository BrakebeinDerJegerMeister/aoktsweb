/* eslint-disable no-unused-vars */
import pako from "pako";
import { ScenarioStruct } from './scenario.js';

function decompressData(compressedData) {
    try {
        const decompressed = pako.inflate(compressedData, { "raw": true });
        return decompressed;
    } catch (err) {
        console.error('Error decompressing data', err);
        return null;
    }
}

class BufferIO {
    #dataView;
    #currentIndex;
    constructor (arrayBuffer, sectionMap) {
        this.#dataView = new DataView(arrayBuffer);
        this.#currentIndex = 0;
        //console.log(sectionMap)
        this.parseSection(sectionMap)
        console.log(sectionMap)
    }
    parseSection(section) {

        console.log("=======[ Parsing " + section.constructor.name + " ]=======\n\n");

        for (let [k, v] of Object.entries(section)) {
            let { type: FoundType } = v;

            if (v.isSubStruct) {
                console.log("@@( subStruct 1 )@@")
                //console.log(v)
                this.parseSection(new v.ofClass())
            } else if (v.isStruct) {
                this.parseSection(new FoundType())
            } else {
                let data = new FoundType(this, v);
                data.read();

                if (v.log) {
                    console.log(k, v.value);
                }
            }
        }
        // }
    }
    get currentIndex() {
        return this.#currentIndex;
    }
    get dataView() {
        return this.#dataView;
    }
    jump(n) {
        this.#currentIndex += n;
    }
}

class ScenarioIO {
    sections;

    constructor (arrayBuffer, ext, version) {

        let scenario = new ScenarioStruct(ext);
        console.log(scenario);


        /*let uncompressedScenarioInstance = new scenario.uncompressedHeader.type();

        let myHeaderIO = new BufferIO(arrayBuffer, uncompressedScenarioInstance);
        const decompressed = decompressData(uncompressedScenarioInstance.compressedData.value);

        function downloadData() {
            const blob = new Blob([decompressed.buffer], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.innerHTML = "decompressed Data";
            a.href = url;
            a.download = "monFichier.dat";
            document.body.appendChild(a);
            //a.click();
            //document.body.removeChild(a);
            //URL.revokeObjectURL(url);
        }

        downloadData();

        let compressedDataInstance = new scenario.compressedSection.type();
        let mySectionsIO = new BufferIO(decompressed.buffer, compressedDataInstance)

        //console.log(decompressed)*/
    }
}

class HeaderAnalysis {
    aa = class me2 {

    }
    fields = {};
    //scenario = null;
    constructor (file) {
        this.file = file;
    }
    async analyze() {
        return new Promise((resolve, reject) => {
            //console.clear();
            const reader = new FileReader();
            reader.onloadend = (event) => {
                if (event.target.readyState === FileReader.DONE) {
                    this.fileArrayBuffer = event.target.result;
                    this.fileExtension = this.file.name.split(".").slice(-1)[0];
                    let versionBuffer = new Uint8Array(this.fileArrayBuffer, 0, 4);
                    const decoder = new TextDecoder();

                    let version = decoder.decode(versionBuffer);
                    let ext = this.file.name.split(".").slice(-1)[0];


                    const srIO = new ScenarioIO(this.fileArrayBuffer, ext, version);
                    //let section = srIO.createSection("uncompressedHeader");
                    //console.log(section);



                    //console.log("C'est parti");
                    //this.parseHeader(this.fileArrayBuffer);
                    //console.log({ version });
                    //console.log(this.scenario);
                    resolve({ "status": true, "message": "Read success, len : " + this.fileArrayBuffer.byteLength }); // Renvoyer les données lues
                }
            };
            reader.onerror = (event) => {
                reject({ "status": false, "message": event.target.error });
            };
            reader.readAsArrayBuffer(this.file);
        });
    }
}



export default HeaderAnalysis;