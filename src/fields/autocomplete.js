import React from 'react';
import PropTypes from 'prop-types';
// import _ from 'underscore';
// import TextField from 'material-ui/TextField';
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }))
};

const defaultProps = {};

class AutocompleteFieldComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      multi: (props.passProps && props.passProps.multi) || false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(option) {
    if (this.state.multi) {
      const options = option.map((o) => o.value);
      this.setState({ value: options });
      this.props.onChange( options );
      return;
    }

    this.setState({ value: option.value });
    this.props.onChange(option.value);
  }

  render() {
    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        { this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null }
        <Select
          ref='input'
          value={this.state.value}
          multi={this.state.multi}
          options={this.props.options}
          onChange={this.onChange.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder || this.props.passProps.placeholder}
          {...this.props.passProps}
        />
        {this.props.errorMessage &&
          <HelpBlock>{this.props.errorMessage}</HelpBlock>
        }
      </FormGroup>
    );
  }
}

AutocompleteFieldComponent.propTypes = propTypes;
AutocompleteFieldComponent.defaultProps = defaultProps;

export {
  AutocompleteFieldComponent as AutocompleteField
};
