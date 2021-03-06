import React, { Component } from 'react';
import { connect } from 'react-redux'
import { stop, edit, updateForm, save, start, cancel } from './actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionWork from 'material-ui/svg-icons/action/work';
import PlacesFreeBreakfast from 'material-ui/svg-icons/places/free-breakfast';
import IconButton from 'material-ui/IconButton';
import {grey100} from 'material-ui/styles/colors';


class SettingPre extends Component {
	handleChange(key, event) {
		this.props.onFormValueChange(key, event.target.value);
	}

	render() {
		const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.props.onSave}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.props.onCancel}
      />,
		]
		const iconStyle = {
			position: 'relative',
			top: '4px',
			margin: '0 6px',
			size: '18px',
		}
		const selectTarget = (event) => {event.target.select()};
		return (
			<span style={{lineHeight: '24px'}}>
				<ActionWork color={grey100} style={iconStyle} />
				{this.props.currentWorkTime} min /
				<PlacesFreeBreakfast color={grey100} style={iconStyle} />
				{this.props.currentBreakTime} min
				<IconButton onClick={this.props.onEdit}>
					<ActionSettings color={grey100} style={iconStyle}/>
				</IconButton>
				<Dialog
					title="Configure work/break time"
					actions={actions}
					open={this.props.isEditing}
					onRequestClose={this.props.onCancel}>
	        <TextField
							type="number"
							style={{marginRight: 12}}
							value={this.props.workTime}
							onChange={this.handleChange.bind(this, 'workTime')}
							onClick={selectTarget}
							floatingLabelText="Work time (min)"
							ref={(input) => {this.workTimeInput = input}}
					/>
	        <TextField
							type="number"
							value={this.props.breakTime}
							onChange={this.handleChange.bind(this, 'breakTime')}
							onClick={selectTarget}
							floatingLabelText="Break time (min)"
					/>
				</Dialog>
			</span>
		);
	}
}

const mapStateToProps = (state) => {
	var isEditing = !!state.form;
	var workTime = isEditing? state.form.workTime : null;
	var breakTime = isEditing? state.form.breakTime : null;
	return {
		currentWorkTime: state.setting.workTime,
		currentBreakTime: state.setting.breakTime,
		isEditing,
		workTime,
		breakTime,
	}
};

const mapDispatchToProps = (dispatch) => ({
	onEdit: () => {
		dispatch(stop());
		dispatch(edit());
	},
	onSave: () => {
		dispatch(save());
		dispatch(start());
	},
	onCancel: () => {
		dispatch(cancel());
	},
	onFormValueChange: (key, value) => {
		dispatch(updateForm(key, value));
	}
});

const Setting = connect(mapStateToProps, mapDispatchToProps)(SettingPre);

export default Setting;
