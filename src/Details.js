import { Component } from "react";
import { withRouter } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { name, animal, breed, city, state, description, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city},${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          {/* <button>Adopt {name}</button> */}
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h2>Would you like to adopt {name}?</h2>
                <div className="buttons">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                      >
                        Yes, Adopt
                      </button>
                    )}
                  </ThemeContext.Consumer>

                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                      >
                        No
                      </button>
                    )}
                  </ThemeContext.Consumer>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
