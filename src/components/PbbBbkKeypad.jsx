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
        label: "PBB Regular (White - 45)",
    },
    {
        key: "pbbSpecWhite",
        label: "PBB Special (White. - 55)",
    },
    {
        key: "pbbRegMusco",
        label: "PBB Regular (Musco - 55)",
    },
    {
        key: "pbbSpecMusco",
        label: "PBB Special (Musco - 65)",
    },
    {
        key: "bibingka",
        label: "Bibingka (75)",
    },
    {
        key: "pbbRegWhiteLecheFlan",
        label: "PBB Regular (White - Leche Flan - 65)",
    },
    {
        key: "pbbSpecWhiteLecheFlan",
        label: "PBB Special (White - Leche Flan - 75)",
    },
    {
        key: "pbbRegMuscoLecheFlan",
        label: "PBB Regular (Musco - Leche Flan - 75)",
    },
    {
        key: "pbbSpecMuscoLecheFlan",
        label: "PBB Special (Musco - Leche Flan - 85)",
    },
    {
        key: "pbbOverloadWhite",
        label: "PBB Overload (White - 85)",
    },
    {
        key: "pbbOverloadMusco",
        label: "PBB Overload (Musco - 95)",
    },
    {
        key: "addCheese",
        label: "Add Cheese (10)",
    },
    {
        key: "addMilk",
        label: "Add Milk (10)",
    },
    {
        key: "addNiyog",
        label: "Add Niyog (10)",
    },
];

export default function PbbBbkKeypad() {
    const dispatch = useDispatch();

    const digit = (d, span, btnClass) => {
        const foundProduct = products.find((p) => p?.key === d);

        return (
            <NumberModal
                product={foundProduct}
                onClose={() => setModalOpen(false)}
                onSubmit={(qty) => console.log("Quantity:", qty)}
                span={span}
                btnClass={btnClass}
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
        <div>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbRegWhite", 12, "pbb__white")}
                {digit("pbbRegMusco", 12, "pbb__musco")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbSpecWhite", 12, "pbb__white")}
                {digit("pbbSpecMusco", 12, "pbb__musco")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbRegWhiteLecheFlan", 12, "pbb__white")}
                {digit("pbbRegMuscoLecheFlan", 12, "pbb__musco")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbSpecWhiteLecheFlan", 12, "pbb__white")}
                {digit("pbbSpecMuscoLecheFlan", 12, "pbb__musco")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("pbbOverloadWhite", 12, "pbb__white")}
                {digit("pbbOverloadMusco", 12, "pbb__musco")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("bibingka", 24, "bbk")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("addCheese", 8, "pbb__bbk")}
                {digit("addMilk", 8, "pbb__bbk")}
                {digit("addNiyog", 8, "pbb__bbk")}
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
        </div>
    );
}
