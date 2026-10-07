"use client";

import { useSelector } from "react-redux";
import {
    selectDisplay,
    selectHistory,
} from "@/lib/features/calculator/pbbBbkCalculatorSlice";

export default function Display() {
    const { current, previous, operator } = useSelector(selectDisplay);
    const history = useSelector(selectHistory);

    const allResults = history.map((e) => parseInt(e.result));
    const total = allResults.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );

    return (
        <div className="display" aria-live="polite">
            {/* <div className="display__previous">
                {previous !== null ? `${previous} ${operator ?? ""}` : ""}
            </div> */}
            <div className="display__current">{total}</div>
        </div>
    );
}
