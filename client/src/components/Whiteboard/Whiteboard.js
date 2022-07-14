import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
// import { ColorPicker, ColorFormats } from "react-canvas-color-picker";
import rough from "roughjs/bundled/rough.cjs.js";
import canvasToImage from "canvas-to-image";
import { useHistory } from "react-router-dom";
import getStroke from "perfect-freehand";
import ColorPalette from "../ColorPalette/ColorPalette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
  faPencil,
  faArrowPointer,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type, pickedColor) => {
  switch (type) {
    case "line":
    case "rectangle":
      const roughElement =
        type === "line"
          ? generator.line(x1, y1, x2, y2, { stroke: "white", strokeWidth: 3 })
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
              stroke: "white",
              strokeWidth: 3,
            });
      return { id, x1, y1, x2, y2, type, roughElement };
    case "pencil":
      return {
        id,
        type,
        points: [{ x: x1, y: y1 }],
        fillStyle: { color: pickedColor },
      };
    case "text":
      return { id, type, x1, y1, x2, y2, text: " " };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null;
};

//checking if mouse click is within element
const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  switch (type) {
    case "line":
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
      return start || end || on;
    case "rectangle":
      const topLeft = nearPoint(x, y, x1, y1, "tl");
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    case "pencil":
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
        );
      });
      return betweenAnyPoint ? "inside" : null;
    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

//function that finds adjusting coordinates for resizing element
const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const cursorForPosition = (position) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
};

//saving every change for undo/redo functionality
const useHistoryDraw = (initialState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1);

  return [history[index], setState, undo, redo];
};

//svg path for freehand writing
const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};
//function that handle drawing of each element
const drawElement = (roughCanvas, context, element, pickedColor) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      const stroke = getSvgPathFromStroke(
        getStroke(element.points, {
          size: 8,
          thinning: 0.5,
          smoothing: 0.5,
        })
      );
      context.fill(new Path2D(stroke));
      context.fillStyle = pickedColor;
      context.lineWidth = 1;

      break;
    case "text":
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      context.fillStyle = pickedColor;
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
};

const adjustmentRequired = (type) => ["line", "rectangle"].includes(type);

export default function Whiteboard({
  user,
  onAddProject,
  displayedProject,
  onUpdateProject,
  projects,
  setProjects,
}) {
  const canvasRef = useRef();
  const [elements, setElements, undo, redo] = useHistoryDraw([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("text");
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasImg, setCanvasImg] = useState();
  const history = useHistory();
  const textAreaRef = useRef();
  const [color, setColor] = React.useState({ r: 255, g: 255, b: 255, a: 1 });

  // const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  // const colorPickerRef = useRef();
  // const formats = useState("rgba");

  // console.log(canvasImg);
  // console.log("user", user);
  // console.log(window.location.pathname);
  // console.log(displayedProject);

  // const handleChange = (event) => {
  //   console.log(event);
  //   // setColor((state) => ({ ...state, ...event.colors.rgba }));
  // };

  const pickedColor = `rgba(${color.r},
      ${color.g},
      ${color.b},
      ${color.a})`;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!displayedProject) {
      context.fillStyle = "#17213c";
    } else {
      let image = new Image();
      image.src = displayedProject.whiteboard;
      let pat = context.createPattern(image, "repeat");
      context.rect(0, 0, 100, 100);
      context.fillStyle = pat;
      context.fill();
    }
    context.fillRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element, pickedColor);
    });
    setCanvasImg(canvas);
  }, [elements, action, selectedElement]);

  //adding undo/redo on ctrl z/shift
  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (action === "writing") {
      textArea.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement]);

  //updating element(moving, resizing)
  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];

    switch (type) {
      case "line":
      case "rectangle":
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
        break;
      case "pencil":
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      case "text":
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        };
        break;
      default:
        throw new Error(`Type not recognised: ${type}`);
    }

    setElements(elementsCopy, true);
  };

  //function handles mouse down effect and checks what tool is selected
  const handleMouseDown = (event) => {
    if (action === "writing") return;

    const { clientX, clientY } = event;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.type === "pencil") {
          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prevState) => prevState);

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool,
        pickedColor
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
      console.log(element.type);
      console.log(tool);
      setAction(tool === "text" ? "writing" : "drawing");
    }
  };
  console.log("action on mouse down", action);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    // console.log(tool, action);
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        console.log();
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options = type === "text" ? { text: selectedElement.text } : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options
        );
      }
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const handleMouseUp = (event) => {
    console.log(action);
    const { clientX, clientY } = event;
    console.log(selectedElement);
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const handleBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, { text: event.target.value });
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

    if (!displayedProject) {
      let response = await fetch(`/projects`, {
        method: `POST`,
        body: form,
      });

      if (response.ok) {
        let newProject = await response.json();
        onAddProject(newProject);
        formInput.reset();
        history.push(`/me`);
      }
    } else {
      let response = await fetch(`/projects/${displayedProject.id}`, {
        method: `PATCH`,
        body: form,
      });

      if (response.ok) {
        let updatedProject = await response.json();
        formInput.reset();

        onUpdateProject(updatedProject);
        history.push(`/me`);
      }
    }
  };

  return (
    <>
      <div className="whiteboard-container">
        <div className="tool-box">
          <input
            className="tool tool-box__input"
            type="radio"
            id="selection"
            checked={tool === "selection"}
            onChange={() => setTool("selection")}
          />
          <label htmlFor="selection" className="tool tool-box__label">
            <FontAwesomeIcon icon={faArrowPointer} />
          </label>

          <input
            className="tool tool-box__input"
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
          />
          <label htmlFor="line" className="tool tool-box__label">
            /
          </label>

          <input
            className="tool tool-box__input"
            type="radio"
            id="rectangle"
            checked={tool === "rectangle"}
            onChange={() => setTool("rectangle")}
          />
          <label htmlFor="rectangle" className="tool tool-box__label">
            <FontAwesomeIcon icon={faSquare} />
          </label>
          <input
            className="tool tool-box__input"
            type="radio"
            id="text"
            checked={tool === "text"}
            onChange={() => setTool("text")}
          />
          <label htmlFor="text" className="tool tool-box__label">
            T
          </label>
          <input
            className="tool tool-box__input"
            type="radio"
            id="pencil"
            checked={tool === "pencil"}
            onChange={() => setTool("pencil")}
          />
          <label htmlFor="pencil" className="tool tool-box__label">
            <FontAwesomeIcon icon={faPencil} />
          </label>

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

        <button className="btn-w btn-w__left" onClick={undo}>
          {" "}
          <FontAwesomeIcon icon={faCircleLeft} />
        </button>
        <button className="btn-w btn-w__right" onClick={redo}>
          {" "}
          <FontAwesomeIcon icon={faCircleRight} />
        </button>

        {action === "writing" ? (
          <textarea
            ref={textAreaRef}
            onBlur={handleBlur}
            style={{
              position: "fixed",
              top: selectedElement.y1 - 2,
              left: selectedElement.x1,
              font: "24px sans-serif",
              // margin: 0,
              // padding: 0,
              // border: 0,
              // outline: 0,
              // resize: "auto",
              // overflow: "hidden",

              // background: "transparent",
            }}
          />
        ) : null}

        {/* <form
        className="new-project-form"
        id="new-project-form"
        onSubmit={handleSubmit}
      >
        <input
          className="new-project-form__input"
          type="text"
          placeholder="Title"
          name="title"
        ></input>
        <input
          className="new-project-form__input"
          type="text"
          placeholder="Description"
          name="description"
        ></input>
        <button className="new-project-form__btn" id="download">
          {!displayedProject ? "Create" : "Update"}
        </button>
      </form> */}
        <form
          className="login__form new-project-form"
          id="new-project-form"
          onSubmit={handleSubmit}
        >
          <div className="login__form__group">
            <input
              type="text"
              className="login__form__input"
              id="title"
              name="title"
              required=" "
            />
            <label htmlFor="title" className="login__form__label">
              Title
            </label>
          </div>
          <div className="login__form__group">
            <input
              type="text"
              className="login__form__input"
              id="description"
              required=" "
              name="description"
            />
            <label htmlFor="description" className="login__form__label">
              Description
            </label>
          </div>

          <div className="login__form__group">
            <button className="btn login__btn-text" id="create-project-btn">
              +
            </button>
          </div>
        </form>

        {/* <ColorPicker
          spectrum="hsva"
          formats="rgba"
          initialColor="r: 255, g: 255, b: 255, a: 1"
          onPanStart={handleChange}
          onPan={handleChange}
          // ref={colorPickerRef}
        /> */}

        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          ref={canvasRef}
        >
          canvas
        </canvas>
        <div className="color-picker">
          <ColorPalette color={color} setColor={setColor} />
        </div>
      </div>
    </>
  );
}
