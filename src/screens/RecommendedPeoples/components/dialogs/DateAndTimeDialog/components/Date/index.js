import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';

class Date extends PureComponent {
    state = {
        selectedDate: 'new Date()',
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { selectedDate } = this.state;

        return (
            <Fragment>
                <DatePicker
                    keyboard
                    showTodayButton
                    label="Uncontrolled input"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    animateYearScrolling={false}
                    minDate={new Date()}
                    onInputChange={e => console.log('Keyboard Input:', e.target.value)}
                />
            </Fragment>
        );
    }
}

export default Date;