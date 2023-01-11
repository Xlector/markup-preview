import "./App.css";
import { Component } from "react";
import { Markup } from "interweave";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
    };
    this.setter = this.setter.bind(this);
    this.markItUp = this.markItUp.bind(this);
  }
  markItUp(text) {
    return text.split("\n").map((line) => {
      // this is for code tag <code> </code>
      let length = (line.match(/`/g) || [0]).length;
      if (length > 2) {
        let setter = 0;
        line = line
          .split(/(?!$)/u)
          .map((char, index) => {
            if (char === "`" && setter == 0) {
              setter = 1;
              return "<code>";
            } else if (char === "`" && setter == 1) {
              setter = 0;
              return "</code>";
            } else {
              return char;
            }
          })
          .join("");
      }

      // this is for header tag h1 to h6
      if (line.startsWith("#")) {
        let length = null;
        length = (line.match(/^#+/) || [0])[0].length;
        if (length > 0 && length < 7) {
          return `<h${length}>${line.slice(length)}</h${length}>`;
        }
      }
    });
  }
  setter(e) {
    this.setState({
      text: this.markItUp(e.target.value),
    });
  }

  render() {
    return (
      <div className="  flex flex-row bg-slate-800 before: min-w-full  px-3 py-4 min-h-full">
        <div className="   max-w-full  sm:mx-14 md:mx-32   lg:mx-60  text-center prose  mx-auto grow  pb-2 p-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className=" w-full h-14 shadow-black shadow-lg rounded-lg mt-3  bg-gray-200  my-3 p-0 ">
            <div className=" w-full shadow-black shadow-inner rounded-md mt-3  bg-gray-200  my-3 h-14 p-2 ">
              <h1 className=" font-extralight">Editor</h1>
            </div>
          </div>
          <div className="px-1">
            <textarea
              onChange={this.setter}
              wrap="off"
              className="resize-none overflow-scroll squared shadow-black shadow-lg h-auto w-full bg-slate-200 "
              style={{ minHeight: "10rem" }}
            ></textarea>
          </div>
          <div className=" w-full h-14 shadow-black shadow-lg rounded-lg mt-3  bg-gray-200  my-3 p-0 ">
            <div className=" w-full shadow-black shadow-inner rounded-md mt-3  bg-gray-200  my-3 h-14 p-2 ">
              <h1 className=" font-extralight">Preview</h1>
            </div>
          </div>
          <div className="px-1">
            <div
              className="bg-gray-200  break-all break-words squared shadow-black shadow-lg text-left w-full "
              style={{ minHeight: "10rem" }}
            >
              {/* {this.state.text} */}
              <Markup content={this.state.text.join("")} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
