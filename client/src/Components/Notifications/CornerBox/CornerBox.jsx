import React, { Component } from "react";
import moment from "moment-timezone";
import styles from "./styles.module.scss";
import { IoNotifications } from "react-icons/io5";

class CornerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { timeLeft, isCountingToStart } = this.state;

    return (
      <div className={styles.notificationButtonWrapper}>
        <button className={styles["notification-button"]}>
          <IoNotifications />
        </button>
      </div>
    );
  }
}

export default CornerBox;
