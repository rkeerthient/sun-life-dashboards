import { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

const TextList = ({ fieldName }: CompProps) => {
  const { newValues, fieldValues, setNewValues } = useFieldGroupsStore();

  const currentValue: string[] = newValues[fieldName] ?? [];
  const initialValue: string[] = fieldValues[fieldName] ?? [];

  useEffect(() => {
    if (newValues[fieldName] === undefined) {
      if (Array.isArray(initialValue) && initialValue.length > 0) {
        setNewValues(fieldName, initialValue);
      } else {
        setNewValues(fieldName, [""]);
      }
    }
  }, [fieldName]);

  const handleChange = (index: number, value: string) => {
    const updated = [...currentValue];
    updated[index] = value;
    setNewValues(fieldName, updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...currentValue];
    updated.splice(index, 1);
    setNewValues(fieldName, updated.length > 0 ? updated : [""]);
  };

  const addItem = () => {
    setNewValues(fieldName, [...currentValue, ""]);
  };

  return (
    <>
      {currentValue.map((val, i) => (
        <div className="flex items-center mb-2.5" key={i}>
          <input
            value={val ?? ""}
            onChange={(e) => handleChange(i, e.currentTarget.value)}
            className="border w-full border-[#dadce0] h-[30px] rounded-md py-1.5 pl-2.5"
          />
          <TrashIcon
            className="w-4 h-4 hover:cursor-pointer ml-2"
            onClick={() => handleRemove(i)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-left text-xs text-[#5A58F2] mt-1 mb-3 hover:underline"
      >
        + Add an item
      </button>
    </>
  );
};

export default TextList;
