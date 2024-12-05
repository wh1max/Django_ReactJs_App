import React from "react";
import axios from "axios";
import "./App.css"; // Add this for external styling

class App extends React.Component {
    state = {
        details: [],
        user: "",
        quote: "",
    };

    componentDidMount() {
        axios
            .get("http://localhost:8000/test/")
            .then((res) => {
                this.setState({
                    details: res.data,
                });
            })
            .catch((err) => console.log(err));
    }

    renderSwitch = (param) => {
        switch (param + 1) {
            case 1:
                return "primary ";
            case 2:
                return "secondary";
            case 3:
                return "success";
            case 4:
                return "danger";
            case 5:
                return "warning";
            case 6:
                return "info";
            default:
                return "yellow";
        }
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/test/", {
                name: this.state.user,
                detail: this.state.quote,
            })
            .then(() => {
                this.setState({
                    user: "",
                    quote: "",
                });
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Author</span>
                        </div>
                        <input
                            type="text"
                            className="form-control input-stylish"
                            placeholder="Name of the Poet/Author"
                            value={this.state.user}
                            name="user"
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Your Quote</span>
                        </div>
                        <textarea
                            className="form-control input-stylish textarea-stylish"
                            placeholder="Tell us what you think of ....."
                            value={this.state.quote}
                            name="quote"
                            onChange={this.handleInput}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mb-5">
                        Submit
                    </button>
                </form>

                <hr
                    style={{
                        color: "#000000",
                        backgroundColor: "#000000",
                        height: 3, // Thicker line
                        borderColor: "#000000",
                    }}
                />

                {this.state.details.map((detail, id) => (
                    <div key={id}>
                        <div className="card shadow-lg">
                            <div
                                className={"bg-" + this.renderSwitch(id % 6) + " card-header"}
                            >
                                Quote {id + 1}
                            </div>
                            <div className="card-body">
                                <blockquote
                                    className={
                                        "text-" + this.renderSwitch(id % 6) + " blockquote mb-0"
                                    }
                                >
                                    <h1> {detail.detail} </h1>
                                    <footer className="blockquote-footer">
                                        <cite title="Source Title">{detail.name}</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default App;
