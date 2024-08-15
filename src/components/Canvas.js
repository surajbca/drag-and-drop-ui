import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import Card from "./Card";
import { Modal, Button } from "react-bootstrap";
import "./Style.css";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [lines, setLines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      text: "This is some dummy text that is too long to be displayed fully.",
    };
    setCards([...cards, newCard]);
  };

  const handleDragEnd = (index, pos) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], ...pos };
    setCards(updatedCards);
  };

  const handleResize = (index, newSize) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], ...newSize };
    setCards(updatedCards);
  };

  const handleShowMore = (text) => {
    setModalText(text);
    setShowModal(true);
  };

  return (
    <div className="canvas-container">
      <button onClick={addCard}>Add Card</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              onDragEnd={(pos) => handleDragEnd(index, pos)}
              onResize={(size) => handleResize(index, size)}
              onShowMore={() => handleShowMore(card.text)}
            />
          ))}
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line}
              stroke="black"
              strokeWidth={2}
              tension={0.5}
            />
          ))}
        </Layer>
      </Stage>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Card Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Canvas;
