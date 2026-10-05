"use client";

import { useState } from "react";

import {
    productPressed,
    operatorPressed,
    equalsPressed,
    clearPressed,
} from "@/lib/features/calculator/pbbBbkCalculatorSlice";
import { Col, Row, Button } from "antd";
import NumberModal from "./Modal";
import { useDispatch } from "react-redux";

const products = [
    {
        key: "pbbRegWhite",
        label: "PBB Reg (White)",
    },
    {
        key: "pbbSpecWhite",
        label: "PBB Spec (White)",
    },
    {
        key: "pbbRegMusco",
        label: "PBB Reg (Musco)",
    },
    {
        key: "pbbSpecMusco",
        label: "PBB Spec (Musco)",
    },
    {
        key: "bibingka",
        label: "Bibingka",
    },
    {
        key: "pbbOverload",
        label: "PBB Overload",
    },
    {
        key: "addCheese",
        label: "Add Cheese",
    },
    {
        key: "addMilk",
        label: "Add Milk",
    },
    {
        key: "addNiyog",
        label: "Add Niyog",
    },
];

// const products = {
//   pbbRegWhite: "PBB Reg White",
//   : "PBB Spec White",
//   : "PBB Reg Musco",
//   : "PBB Spec Musco",
//   : "Bibingka",
//   : "PBB Overload",
//   : "Add Cheese",
//   : "Add Milk",
//   : "Add Niyog",
// }

export default function Keypad() {
    const dispatch = useDispatch();

    const digit = (d, span) => {
        const foundProduct = products.find((p) => p?.key === d);
  
        return (
            <NumberModal
                product={foundProduct}
                onClose={() => setModalOpen(false)}
                onSubmit={(qty) => console.log("Quantity:", qty)}
                span={span}
            />
        );
    };
    const op = (o) => (
        <button
            key={o}
            className="key key--operator"
            onClick={() => dispatch(operatorPressed(o))}
        >
            {o}
        </button>
    );

    return (
        <div
        // className="keypad"
        >

            {/* {op("÷")} */}
            {/* <Row
                style={{ display: "block", width: "100%", textAlign: "center" }}
            >
                <Col
                    span={24}
                    style={{
                        background: "#566e8f",
                        padding: "5px 0",
                        margin: "10px 0",
                        borderRadius: "10px",
                    }}
                >
                    WHITE SUGAR
                </Col>
            </Row> */}
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbRegWhite", 12)}
                {digit("pbbSpecWhite", 12)}
            </Row>
            {/* <Row
                style={{ display: "block", width: "100%", textAlign: "center" }}
            >
                <Col
                    span={24}
                    style={{
                        background: "#566e8f",
                        padding: "5px 0",
                        margin: "10px 0",
                        borderRadius: "10px",
                    }}
                >
                    MUSCOVADO SUGAR
                </Col>
            </Row> */}
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbRegMusco", 12)}
                {digit("pbbSpecMusco", 12)}
                {/* {digit('4')}{digit('5')}{digit('6')}{op('−')} */}
            </Row>

            {/* <Row
                style={{ display: "block", width: "100%", textAlign: "center" }}
            >
                <Col
                    span={24}
                    style={{
                        background: "#566e8f",
                        padding: "5px 0",
                        margin: "10px 0",
                        borderRadius: "10px",
                    }}
                >
                    BIBINGKA & OVERLOAD
                </Col>
            </Row> */}
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("bibingka", 12)}
                {digit("pbbOverload", 12)}
                {/* {digit('4')}{digit('5')}{digit('6')}{op('−')} */}
            </Row>

            {/* {digit("1")}
            {digit("2")}
            {digit("3")}
            {op("+")}
            {digit("0")}
            {digit(".")} */}

            {/* <Row
                style={{ display: "block", width: "100%", textAlign: "center" }}
            >
                <Col
                    span={24}
                    style={{
                        background: "#566e8f",
                        padding: "5px 0",
                        margin: "10px 0",
                        borderRadius: "10px",
                    }}
                >
                    ADD-ONS
                </Col>
            </Row> */}
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("addCheese", 8)}
                {digit("addMilk", 8)}
                {digit("addNiyog", 8)}
                {/* {digit('4')}{digit('5')}{digit('6')}{op('−')} */}
            </Row>
                        <Row>
                <Col span={24}></Col>
                <button
                    style={{ width: "100%" }}
                    className="key key--clear"
                    onClick={() => dispatch(clearPressed())}
                >
                    Clear
                </button>
            </Row>
            {/* <button
                className="key key--equals"
                onClick={() => dispatch(equalsPressed())}
            >
                =
            </button> */}
        </div>
    );
}
