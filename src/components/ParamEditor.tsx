import React, { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  initialModel: Model;
  onUpdateModel: (updatedModel: Model) => void;
}

const ProductEditor: React.FC<Props> = ({
  params,
  initialModel,
  onUpdateModel,
}) => {
  const [model, setModel] = useState<Model>(initialModel);
  const [newParam, setNewParam] = useState<ParamValue>({
    paramId: 0,
    value: "",
  });

  const handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = model.paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );
    setModel({ paramValues: updatedParamValues });
  };

  const handleAddParam = () => {
    const newParamId = params.length + 1;
    const updatedParamValues = [
      ...model.paramValues,
      { ...newParam, paramId: newParamId },
    ];
    setModel({ paramValues: updatedParamValues });
    onUpdateModel({ paramValues: updatedParamValues });
    setNewParam({ paramId: 0, value: "" });
  };

  const handleSaveChanges = () => {
    onUpdateModel(model);
  };

  const getModel = (): Model => {
    return model;
  };

  return (
    <div>
      <h2>Редактор товара</h2>
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}</label>
          <input
            type="text"
            value={
              model.paramValues.find((pv) => pv.paramId === param.id)?.value ||
              ""
            }
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newParam.value}
          placeholder="Имя нового параметра"
          onChange={(e) => setNewParam({ paramId: 0, value: e.target.value })}
        />
        <button onClick={handleAddParam}>Добавить новый параметр</button>
      </div>
      <button onClick={handleSaveChanges}>Сохранить</button>
      <div>
        <h3>Текущая структура:</h3>
        <pre>{JSON.stringify(getModel(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default ProductEditor;
