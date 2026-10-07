"use client";

import {
    operatorPressed,
    clearPressed,
} from "@/lib/features/calculator/pbbBbkCalculatorSlice";
import { Col, Row, Button } from "antd";
import NumberModal from "./Modal";
import { useDispatch } from "react-redux";

const products = [
    {
        key: "isawManok",
        label: "Isaw Manok (10)",
    },
    {
        key: "bbq",
        label: "BBQ (25)",
    },
    {
        key: "bulaklak",
        label: "Bulaklak (25)",
    },
    {
        key: "atay",
        label: "Atay (25)",
    },
    {
        key: "dugo",
        label: "Dugo (15)",
    },
    {
        key: "isawC",
        label: "Isaw-C (25)",
    },
    {
        key: "balat",
        label: "Balat (15)",
    },
    {
        key: "tito",
        label: "Tito (25)",
    },
    {
        key: "tenga",
        label: "Tenga (25)",
    },
    {
        key: "haba",
        label: "Haba (25)",
    },
    {
        key: "hotdog",
        label: "Hotdog (25)",
    },
    {
        key: "bato",
        label: "Bato (25)",
    },
    {
        key: "bilog",
        label: "Bilog (25)",
    },
    {
        key: "ulo",
        label: "Ulo (25)",
    },
    {
        key: "bolaBola",
        label: "Bola2x (3)",
    },
    {
        key: "shanghai",
        label: "Shanghai (4)",
    },
    {
        key: "puwet",
        label: "Puwet (25)",
    },
];

export default function BbqKeypad() {
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
                {digit("bbq", 8, "bbq")}
                {digit("bilog", 8, "bbq")}
                {digit("isawManok", 8, "bbq")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("bulaklak", 8, "bbq")}
                {digit("tito", 8, "bbq")}
                {digit("isawC", 8, "bbq")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("tenga", 8, "bbq")}
                {digit("balat", 8, "bbq")}
                {digit("haba", 8, "bbq")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("bato", 8, "bbq")}
                {digit("atay", 8, "bbq")}
                {digit("hotdog", 8, "bbq")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("puwet", 8, "bbq")}
                {digit("ulo", 8, "bbq")}
                {digit("dugo", 8, "bbq")}
            </Row>
            <Row gutter={8} style={{ margin: "0.5rem 0" }}>
                {digit("bolaBola", 8, "bbq")}
                {digit("shanghai", 8, "bbq")}
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
