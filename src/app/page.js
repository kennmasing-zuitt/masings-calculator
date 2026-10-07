"use client";

import Display from "@/components/PbbBbkDisplay";
import { useState, useEffect } from "react";
import BbqKeypad from "@/components/BbqKeypad";
import Keypad from "@/components/Keypad";
import History from "@/components/PbbBbkHistory";
import PbbBbkKeypad from "@/components/PbbBbkKeypad";
import { Col, Row, Button } from "antd";

export default function Home() {
    const [currentKeypad, setCurrentKeypad] = useState("pbbBbk");

    useEffect(() => {
        keyPad = setCurrentKeypad("pbbBbk");
    }, []);

    let keyPad = <PbbBbkKeypad />;
    if (currentKeypad === "bbq") {
        keyPad = <BbqKeypad />;
    } else if (currentKeypad === "calc") {
        keyPad = <Keypad />;
    }

    return (
        <main className="app">
            <section className="calculator" aria-label="Calculator">
                <Display />
                <Row gutter={[8, 8]} style={{ margin: "0.5rem 0" }}>
                    <Col span={12}>
                        <button
                            className={`pbb__bbk__btn ${currentKeypad === "pbbBbk" ? "selected" : "muted"}`}
                            onClick={() => setCurrentKeypad("pbbBbk")}
                        >
                            PBB/BBK
                        </button>
                    </Col>
                    <Col span={12}>
                        <button
                            className={`bbq__btn ${currentKeypad === "bbq" ? "selected" : "muted"}`}
                            onClick={() => setCurrentKeypad("bbq")}
                        >
                            BBQ
                        </button>
                    </Col>
                    {/* <Col span={8}>    
                <button
                    className={`calc__btn ${currentKeypad === "calc" ? "selected" : "muted"}`}
                    onClick={() => setCurrentKeypad('calc')}
                >
                    CALC
                </button>
            </Col> */}
                </Row>
                {keyPad}
            </section>
            <History />
        </main>
    );
}
