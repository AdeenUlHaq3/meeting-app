import React, { PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';

export default class App extends PureComponent {
    state = {
        selectedDate: new Date(),
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { selectedDate } = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DatePicker
                    keyboard
                    label="Select Date"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    animateYearScrolling={false}
                    minDate={new Date()}
                    format="dd/MM/yyyy"
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                    onInputChange={e => console.log('Keyboard Input:', e.target.value)}
                />

                <TimePicker
                    keyboard
                    label="Select Time"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    minDate={new Date()}
                />
            </MuiPickersUtilsProvider >
        );
    }
}