import React, { PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';

class DateAndTime extends PureComponent {
    state = {
        selectedDate: new Date(),
    }

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };

    render() {
        const {
            selectedDate
        } = this.state;

        const {
            onChange
        } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DatePicker
                    keyboard
                    label="Select Date"
                    value={selectedDate}
                    onChange={onChange}
                    animateYearScrolling={false}
                    minDate={new Date()}
                    format="dd/MM/yyyy"
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                />

                <TimePicker
                    keyboard
                    label="Select Time"
                    value={selectedDate}
                    onChange={onChange}
                />
            </MuiPickersUtilsProvider >
        );
    }
}

export default DateAndTime;