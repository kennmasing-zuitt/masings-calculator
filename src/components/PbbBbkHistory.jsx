"use client";

import { useSelector, useDispatch } from "react-redux";
import { selectHistory } from "@/lib/features/calculator/pbbBbkCalculatorSlice";
import { Popconfirm, Button } from "antd";
import { MinusCircleTwoTone } from "@ant-design/icons";
import { Row, Col } from "antd";
import { deleteItemPressed } from "@/lib/features/calculator/pbbBbkCalculatorSlice";

export default function History() {
    const dispatch = useDispatch();
    const history = useSelector(selectHistory);

    const deleteElement = (item) => {
        dispatch(deleteItemPressed(item));
    };

    return (
        <aside className="history" aria-label="History">
            <h2 className="history__title">History</h2>
            {history.length === 0 ? (
                <p className="history__empty">No calculations yet.</p>
            ) : (
                <ol className="history__list">
                    {/* .slice() first! .reverse() would mutate the Redux state */}
                    {history
                        .slice()
                        .reverse()
                        .map((entry) => (
                            <li key={entry.id}>
                                <Row
                                    style={{ width: "100%" }}
                                    className="history__item"
                                >
                                    <Col span={16} style={{ width: "100%" }}>
                                        <span className="history__expression">
                                            {entry.expression} =
                                        </span>
                                    </Col>
                                    <Col span={6} style={{ width: "100%" }}>
                                        <span className="history__result">
                                            {entry.result}
                                        </span>
                                    </Col>
                                    <Col span={2} style={{ width: "100%" }}>
                                        <span>
                                            <Popconfirm
                                                key={entry.id}
                                                title={`Delete ${entry.expression}`}
                                                onConfirm={() =>
                                                    deleteElement(entry)
                                                }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button type="link">
                                                    <MinusCircleTwoTone twoToneColor="#eb2f96" />
                                                </Button>
                                            </Popconfirm>
                                        </span>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                </ol>
            )}
        </aside>
    );
}
