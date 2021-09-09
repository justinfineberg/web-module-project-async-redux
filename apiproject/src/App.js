import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import React, { useState } from "react";
import { getQuote, beginAgain } from "./actions/actions";

function App(props) {
  const [form, setForm] = useState({
    rephrase: "",
    name: "",
  });
  const [submit, setSubmit] = useState(false);

  const handleClick = () => {
    props.dispatch(getQuote());
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit);
    props.dispatch(beginAgain());
  };
  
  console.log(form);
  return (
    <div>
      {submit && (
        <div className="flex flex-col gap-6">
          <div className="lg:w-3/6 w-11/12 rounded-lg shadow-xl mt-20 border bg-gray-100 flex flex-col p-10 hover:bg-gray-200 m-auto mt-20">
            <h3 className="text-3xl font-bold text-center">"{form.rephrase}"</h3>

            <h6 className=" text-xl text-right w-1/3 mt-10 m-auto ">-{form.name}</h6>
            <h6 className=" text-md text-right w-1/3 m-auto italic ">A stoic philospher</h6>
           
          </div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-auto"
            onClick={onSubmit}
          >
            Go Again?
          </button>
        </div>
      )}
      {!submit && (
        <div className="flex flex-col justify-center gap-4 lg:w-3/6 m-auto w-10/12">
          <h1 className="font-bold text-4xl mb-2 mt-14">A Stoic Reflection</h1>

          <h3 className="text-lg ">
            Take a Stoic Quote and turn it into your own words.
          </h3>
          <div className="border border-black"></div>
          <h2 className="text-xl text-center text-gray-500 mt-7 italic">
            Real Impact begins when you make it personal.
          </h2>
          <h2 className="animate-bounce text-center">↓</h2>
          <button
            onClick={handleClick}
            className="bg-white m-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Get Quote
          </button>
          {props.quoteObj && (
            <div>
              <div className=" border bg-gray-100 shadow-lg hover:bg-gray-200 flex flex-col p-6 m-5 text-center gap-5 rounded-lg ">
                <h3 className="text-2xl">"{props.quoteObj.text}"</h3>
                <h5 className="text-right text-lg w-2/3">
                  -{props.quoteObj.author}
                </h5>
              </div>
              <div className="flex flex-col items-center gap-3">
                <h3>
                  Now, rephrase this quote and put it into your own words.
                </h3>
                <h5>(It's much easier to take your own advice.)</h5>
                <h2 className="animate-bounce text-center">↓</h2>
              </div>
              <form className="flex flex-col items-center border-box rounded-lg p-5">
                <textarea
                  onChange={onChange}
                  name="rephrase"
                  placeholder="Enter Your Words"
                  className="w-2/3 mb-5 h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                ></textarea>
                <div class="relative text-gray-700">
                  <input
                    onChange={onChange}
                    name="name"
                    className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text"
                    placeholder="Enter Name"
                  />
                  <button
                    onClick={onSubmit}
                    className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-500 focus:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
          {props.isFetching && (
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"
              ></circle>
            </svg>
          )}
          {props.err && <h2>There is an error!</h2>}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quoteObj: state.quoteObject,
    isFetching: state.isFetching,
    err: state.err,
  };
};

export default connect(mapStateToProps)(App);
