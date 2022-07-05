import React from "react";
import { useRef, useState, useEffect } from "react";
import rough from "roughjs/bundled/rough.cjs.js";
import canvasToImage from "canvas-to-image";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type) => {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2, { stroke: "white" })
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1, { stroke: "white" });
  return { id, x1, y1, x2, y2, type, roughElement };
};

const isWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;

  //   console.log(x1, y1);
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  } else {
    const a = { x: x1, y: y1 };
    // console.log(a);
    const b = { x: x2, y: y2 };
    const c = { x: x, y: y };
    // console.log(c);
    const offSet = distance(a, b) - (distance(a, c) + distance(b, c));
    // console.log(offSet);
    return Math.abs(offSet) < 1;
  }
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  // console.log(elements);
  return elements.find((element) => isWithinElement(x, y, element));
};

export default function Whiteboard({ user, onAddProject }) {
  const canvasRef = useRef();
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasImg, setCanvasImg] = useState();
  console.log(canvasImg);
  console.log("user", user);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#2c2f48";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    setCanvasImg(canvas);
  }, [elements]);

  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  };

  const onMouseDown = (e) => {
    const { clientX, clientY } = e;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      console.log(element);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
        setAction("moving");
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setAction("drawing");
    }
  };

  const onMouseUp = () => {
    setAction("none");
    setSelectedElement(null);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    if (tool === "selection") {
      e.target.style.cursor = getElementAtPosition(clientX, clientY, elements)
        ? "move"
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const nexX1 = clientX - offsetX;
      const nexY1 = clientY - offsetY;
      updateElement(id, nexX1, nexY1, nexX1 + width, nexY1 + height, type);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // canvasToImage(canvasImg, {
    //   name: "myImage",
    //   type: "jpg",
    //   quality: 1,
    // });

    let image = new Image();
    image.src = canvasImg.toDataURL();

    let formInput = document.querySelector(`#new-project-form`);
    let form = new FormData(formInput);

    form.append("whiteboard", image.src);
    form.append("user_id", user.id);
    form.append("team_id", user.team_id);

    let response = await fetch(`/projects`, {
      method: `POST`,
      body: form,
    });
    let newProject = await response.json();

    onAddProject(newProject);
    formInput.reset();
  };

  return (
    <div>
      <div className="tool-box">
        <input
          className="tool"
          type="radio"
          id="selection"
          checked={tool === "selection"}
          onChange={() => setTool("selection")}
        />
        <label htmlFor="selection">Select</label>
        <input
          className="tool"
          type="radio"
          id="line"
          checked={tool === "line"}
          onChange={() => setTool("line")}
        />
        <label htmlFor="line">Line</label>
        <input
          className="tool"
          type="radio"
          id="rectangle"
          checked={tool === "rectangle"}
          onChange={() => setTool("rectangle")}
        />
        <label htmlFor="rectangle">Rectangle</label>
        {/* <input
          type="radio"
          id="circle"
          checked={tool === "circle"}
          onChange={() => setTool("circle")}
        />
        <label htmlFor="circle">Circle</label>
        <input
          type="radio"
          id="ellipse"
          checked={tool === "ellipse"}
          onChange={() => setTool("ellipse")}
        />
        <label htmlFor="ellipse">Ellipse</label> */}
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      >
        canvas
      </canvas>
      <form id="new-project-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title"></input>
        <input type="text" placeholder="Description" name="description"></input>
        <button id="download" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
