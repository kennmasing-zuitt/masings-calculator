'use client'

import { useState } from 'react';

import {
  productPressed,
  operatorPressed,
  equalsPressed,
  clearPressed,
} from '@/lib/features/calculator/pbbBbkCalculatorSlice'
import { Col, Row, Button } from 'antd';
import NumberModal from './Modal';

const products = [
  {
    key: "pbbRegWhite",
    label: "PBB Reg White"
  },
  {
    key: "pbbSpecWhite",
    label: "PBB Spec White"
  },
  {
    key: "pbbRegMusco",
    label: "PBB Reg Musco"
  },
  {
    key: "pbbSpecMusco",
    label: "PBB Spec Musco"
  },
  {
    key: "bibingka",
    label: "Bibingka"
  },
  {
    key: "pbbOverload",
    label: "PBB Overload"
  },
  {
    key: "addCheese",
    label: "Add Cheese"
  },
  {
    key: "addMilk",
    label: "Add Milk"
  },
  {
    key: "addNiyog",
    label: "Add Niyoge"
  },
]

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


// const [modalOpen, setModalOpen] = useState(false);


//   const handleOpenModal = (key, modalState) => {
//     setOpen(true)
//     dispatch(digitPressed(key))
//   }

  const digit = (d) => {
    const foundProduct = products.find((p) => p?.key === d);
    // console.log("FOUND PRODUCT", foundProduct)

    return (
      

        <NumberModal
            product={foundProduct}
            // open={modalOpen}
            // setOpen={setModalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={(qty) => console.log('Quantity:', qty)}
            // dispatch={dispatch}
        />
   
  )
  }
  const op = (o) => (
    <button key={o} className="key key--operator" onClick={() => dispatch(operatorPressed(o))}>
      {o}
    </button>
  )

  return (
    <div
        // className="keypad"
    >
      <button className="key key--clear" onClick={() => dispatch(clearPressed())}>
        Clear
      </button>
      {op('÷')}
      <Row style={{display: "block", width: "100%",}}>
        <Col span={24}>White Sugar</Col>
        </Row>
      <Row>
        <Col span={6}>
          {digit('pbbRegWhite')}
        </Col>
        <Col span={6}>{digit('pbbSpecWhite')}</Col>
        <Col span={6}>{digit('pbbRegMusco')}</Col>
        <Col span={6}>{digit('pbbSpecMusco')}</Col>
      </Row>
      
      
      <div>Muscovado Sugar</div>
      {digit('4')}{digit('5')}{digit('6')}{op('−')}
      <div>Bibingka</div>
      {digit('1')}{digit('2')}{digit('3')}{op('+')}
      {digit('0')}{digit('.')}
      <button className="key key--equals" onClick={() => dispatch(equalsPressed())}>
        =
      </button>
    </div>
  )
}
