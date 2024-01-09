import React, { useState } from "react";
import ProductEditor from "./components/ParamEditor";

const App: React.FC = () => {
  const initialParams: any = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const initialModel = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
  };

  const [model, setModel] = useState(initialModel);

  const handleUpdateModel = (updatedModel: any) => {
    setModel(updatedModel);
  };

  return (
    <div className="App">
      <h1>Редактор параметров</h1>
      <ProductEditor
        params={initialParams}
        initialModel={model}
        onUpdateModel={handleUpdateModel}
      />
    </div>
  );
};

export default App;
