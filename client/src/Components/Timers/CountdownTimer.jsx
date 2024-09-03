import React, { Component } from "react";
import moment from "moment-timezone";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.state = {
      timeLeft: this.calculateTimeLeft(props, userTimezone),
      isCountingToStart: this.isCountingToStart(props, userTimezone),
      userTimezone: userTimezone,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { userTimezone } = this.state;
      this.setState({
        timeLeft: this.calculateTimeLeft(this.props, userTimezone),
        isCountingToStart: this.isCountingToStart(this.props, userTimezone),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculateTimeLeft(props, timezone) {
    const { start, end } = props;
    const now = moment.tz(timezone);
    const startTime = moment.tz(start, timezone);
    const endTime = moment.tz(end, timezone);

    if (now.isBefore(startTime)) {
      return startTime.diff(now);
    } else if (now.isBefore(endTime)) {
      return endTime.diff(now);
    } else {
      return null;
    }
  }

  isCountingToStart(props, timezone) {
    const { start } = props;
    const now = moment.tz(timezone);
    const startTime = moment.tz(start, timezone);
    return now.isBefore(startTime);
  }

  render() {
    const { timeLeft, isCountingToStart } = this.state;

    if (timeLeft === null) {
      return <div>No active countdown</div>;
    }

    const duration = moment.duration(timeLeft);
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const countdownText = isCountingToStart ? "Available in: " : "Ends in: ";

    return (
      <div className="countdown-timer">{`${countdownText} ${days}d ${hours}h ${minutes}m ${seconds}s`}</div>
    );
  }
}

export default CountdownTimer;
