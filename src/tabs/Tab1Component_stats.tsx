// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { FileData, FileInfo } from '../hooks/useFileHandler';
import { readScenario } from '../core/io/readScenario';

interface Props {
  fileData: FileData | null;
}

const Tab1Component: React.FC<Props> = ({ fileData }) => {
  const [infos, setInfos] = useState<FileInfo | null>(null);
  const [myData, setMyData] = useState({});

  useEffect(() => {
    if (!fileData) return;
    let myDataView = new DataView(fileData.arrayBuffer.buffer);
    let versionBuffer = new Uint8Array(myDataView.buffer, 0, 4);
    const decoder = new TextDecoder();
    setInfos({
      "fileName": fileData.fileName,
      "fileSize": fileData.fileSize,
      "fileType": fileData.fileType,
    });
    setMyData({
      "version": decoder.decode(versionBuffer),
      "length": myDataView.getInt32(4, true),
      "headerType": myDataView.getInt32(8, true)
    });
    let scenario = readScenario(fileData.arrayBuffer);
    console.log(scenario);





    class MyDictLikeClass {
      private _data: { [key: string]: any } = {};
      private static _handler: ProxyHandler<any> = {
          get(target, prop) {
              if (prop in target) {
                  return target[prop];
              }
              return target._data[prop as string];
          },
          set(target, prop, value) {
              if (prop in target) {
                  target[prop] = value;
              } else {
                  target._data[prop as string] = value;
              }
              return true;
          },
          deleteProperty(target, prop) {
              if (prop in target) {
                  delete target[prop];
              } else {
                  delete target._data[prop as string];
              }
              return true;
          }
      };
  
      constructor() {
          return new Proxy(this, MyDictLikeClass._handler);
      }
  
      // Example methods
      exampleMethod() {
          console.log("This is an example method.");
      }
  }
  
  class MyDictLikeClass3 {
    test = 55;
    // Permet d'accéder aux propriétés dynamiques avec la notation de point
    [key: string]: any;

    // Setter pour les propriétés dynamiques
    set(key: string, value: any): void {
        this[key] = value;
    }

    // Getter pour les propriétés dynamiques
    get(key: string): any {
        return this[key];
    }

    // Exemple de méthode
    public exampleMethod(): void {
        console.log("This is an example method.");
    }
}

// Usage example
const myInstance3 = new MyDictLikeClass3();

// Using the dynamic properties
myInstance3.key = "value";
console.log(myInstance3.key);  // Outputs "value"

myInstance3["key2"] = "value2";
console.log(myInstance3["key2"]);  // Outputs "value2"

// Calling a regular method
myInstance3.exampleMethod();  // Outputs "This is an example method."

myInstance3.set("coucou", 28)
console.log(myInstance3)








  // Example usage
  const myInstance = new MyDictLikeClass();
  myInstance.key = "value";
  console.log("@myInstance :", myInstance);
  console.log("@key :", myInstance.key);  // Outputs "value"
  myInstance["key2"] = "value2";
  console.log("@@key2 :", myInstance["key2"]);  // Outputs "value2"
  console.log("@@key2 :", myInstance.key2);  // Outputs "value2"
  myInstance.exampleMethod();  // Outputs "This is an example method."
  


  class MyDictLikeClass2 {
    private _data: Map<string, any> = new Map();
    test = 55;

    // Setter pour les propriétés dynamiques
    set(key: string, value: any): void {
        this._data.set(key, value);
        Object.defineProperty(this, key, {
            get: () => this._data.get(key),
            set: (newValue) => {
                this._data.set(key, newValue);
            },
            enumerable: true,
            configurable: true
        });
        this[key] = value;
    }

    // Getter pour les propriétés dynamiques
    get(key: string): any {
        return this._data.get(key);
    }

    // Récupérer les clés dans l'ordre d'insertion
    keys(): IterableIterator<string> {
        return this._data.keys();
    }

    // Récupérer les valeurs dans l'ordre d'insertion
    values(): IterableIterator<any> {
        return this._data.values();
    }

    // Récupérer les entrées (clé, valeur) dans l'ordre d'insertion
    entries(): IterableIterator<[string, any]> {
        return this._data.entries();
    }

    // Exemple de méthode
    public exampleMethod(): void {
        console.log("This is an example method.");
    }
}

// Exemple d'utilisation
const myInstance2 = new MyDictLikeClass2();

// Utilisation de la méthode set
myInstance2.set("key", "value");
console.log(myInstance2.get("key"));  // Affiche "value"

// Accès direct via la notation par crochets
myInstance2["key2"] = "value2";
myInstance2.set("key2", "value2");
console.log(myInstance2["key2"]);  // Affiche "value2"

// Utilisation de la méthode set
myInstance2.set("coucou", 28);
console.log(myInstance2.get("coucou"));  // Affiche 28

// Appel d'une méthode régulière
myInstance2.exampleMethod();  // Affiche "This is an example method."

// Récupération des clés dans l'ordre d'insertion
console.log([...myInstance2.keys()]);  // Affiche ["key", "key2", "coucou"]

// Récupération des valeurs dans l'ordre d'insertion
console.log([...myInstance2.values()]);  // Affiche ["value", "value2", 28]

// Récupération des entrées (clé, valeur) dans l'ordre d'insertion
console.log([...myInstance2.entries()]);  // Affiche [["key", "value"], ["key2", "value2"], ["coucou", 28]]



  }, [fileData]);

  return (
    <div>
      {
        infos && <div>
          <p>File name : {infos.fileName}</p>
          <p>File size : {infos.fileSize}</p>
        </div>
      }
      <br />
      <div>
        {
          Object.entries(myData).map(([key, value], i) => (
            <p key={i}>{`${key} : ${value}`}</p>
          ))
        }
      </div>
    </div>
  );
};

export default Tab1Component;