import { useEffect, useState } from 'react';
import * as wasmModule from '../wasm/release'; // Importer tous les exports comme un module

const WasmComponent = () => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    const loadWasm = async () => {
      // Attendre que les exports soient résolus
      const { add } = wasmModule;
      const result = add(5, 3); // Utilisation de la fonction 'add'
      setResult(result);
    };

    loadWasm();
  }, []);

  return <div>Result from WASM: {result}</div>;
};

export default WasmComponent;
