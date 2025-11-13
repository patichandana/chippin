import { useState } from "react";
import { ChevronDown } from "lucide-react";

type lovOption = {
  code?: string;
  currency_name?: string;
  currency_id?: number;
  symbol?: string;
};

// type lovComponentProps = {
//   type: string;
//   options: Array<object>;
//   defaultValue ?: string;
// }

/*
todo
1. pass a type for lov input arguments >> so that component consumers are aware that lov takes options, defaultValue, lovType
*/

/* currently working on
  1. making the select element look like a input element in terms of width and height
  2. idea is that in the closed state (lov not clicked), the lov should just show the symbol, just left to the amount
  3. but when we open it, it should show 3 items >> currency name, currency id and the symbol
  4. and yeah, when we select one of the entries, it should just show the symbol
*/
export function LoV({ ...props }) {
  const [selectedValue, setSelectedValue] = useState(() => props.defaultValue);
  const [isDropDownOpen, setIsDropDownOpen] = useState(() => false);

  // const lovOptions = props.options;

  return (
    <div className={`absolute ${props.className}`}>
      <p className="max-w-fit mb-2">{props.label}</p>
      <button
        className={`w-fit pl-4 py-2 border border-r-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={(e) => {
          e.preventDefault();
          setIsDropDownOpen(!isDropDownOpen);
        }}
      >
        <span className="w-fit flex">
          <span className="">{selectedValue}</span>
          <ChevronDown className="max-w-fit inline" />
        </span>
      </button>
      <div className={`${isDropDownOpen ? "visible" : "hidden"} w-1000 relative bg-white`}>
        <ul className="w-500">
          {props.options.map((v: lovOption) => {
            return (
              <li
                className="py-2 text-center px-2 border border-t-0 rounded-md focus:ring-2 focus:ring-blue-500"
                key={v.currency_id}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault(); 
                    setSelectedValue(v.symbol);
                    setIsDropDownOpen(false);
                    props.lovId[1](v.currency_id);
                  }}
                  className="border-b-none"
                >
                  <span className="text-s">
                    {v.currency_name} ({v.symbol})
                  </span>
                  <br />
                  <span className="text-xs text-gray-600">{v.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
