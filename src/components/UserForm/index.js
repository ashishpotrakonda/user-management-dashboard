import { Component } from "react";
import Modal from "react-modal";

import "./index.css";

Modal.setAppElement("#root");

class UserForm extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    company: "",
    showErrorMessage: false,
  };

  componentDidUpdate(prevProps) {
    const { selectedUserDetails } = this.props;
    if (
      prevProps.selectedUserDetails.id !== this.props.selectedUserDetails.id
    ) {
      this.setState({
        id: selectedUserDetails.id,
        name: selectedUserDetails.name,
        email: selectedUserDetails.email,
        company: selectedUserDetails.company,
      });
    }
  }

  onChangeNameInputField = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  onChangeEmailInputField = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangeCompanyInputField = (event) => {
    this.setState({
      company: event.target.value,
    });
  };

  onClickUpdateButton = (event) => {
    event.preventDefault();
    const { id, name, email, company } = this.state;
    if (name === "" || email === "" || company === "") {
      this.setState({
        showErrorMessage: true,
      });
      return;
    }
    this.props.updateUserDetails({ id, name, email, company });
    this.setState({
      id: "",
      name: "",
      email: "",
      company: "",
      showErrorMessage: false,
    });
  };

  onClickAddButton = (event) => {
    event.preventDefault();
    const { name, email, company } = this.state;
    if (name === "" || email === "" || company === "") {
      this.setState({
        showErrorMessage: true,
      });
      return;
    }
    this.props.addUser({
      name,
      email,
      company,
    });
    this.setState({
      name: "",
      email: "",
      company: "",
      showErrorMessage: false,
    });
  };

  render() {
    const { name, email, company, showErrorMessage } = this.state;
    const selectedUserDetails = this.props.selectedUserDetails;

    return (
      <Modal
        isOpen={this.props.showUserForm}
        onRequestClose={this.closeModal}
        ariaHideApp={false}
        className="user-form-modal"
        overlayClassName="user-form-modal-overlay"
      >
        <form className="user-form-container">
          <h1
            className={`${
              selectedUserDetails.id !== ""
                ? "user-form-container-edit-heading"
                : "user-form-container-add-heading"
            }`}
          >
            {selectedUserDetails.id ? "EDIT USER DETAILS" : "ADD USER"}
          </h1>
          <label htmlFor="name">NAME</label>
          <input
            placeholder="Name"
            value={name}
            id="name"
            onChange={this.onChangeNameInputField}
          />
          <label htmlFor="email">EMAIL</label>
          <input
            placeholder="Email"
            value={email}
            id="email"
            onChange={this.onChangeEmailInputField}
          />
          <label htmlFor="company">COMPANY</label>
          <input
            placeholder="Company"
            value={company}
            id="company"
            onChange={this.onChangeCompanyInputField}
          />
          {showErrorMessage && (
            <p className="user-form-container-error-message">
              Fill all fields.
            </p>
          )}
          {selectedUserDetails.id ? (
            <button
              className="user-form-container-update-button"
              onClick={this.onClickUpdateButton}
            >
              Update
            </button>
          ) : (
            <button
              className="user-form-container-add-button"
              onClick={this.onClickAddButton}
            >
              Add
            </button>
          )}
        </form>
      </Modal>
    );
  }
}

export default UserForm;
