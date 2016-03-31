"use strict";

var React = require('react');

var Dropdown = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
  },

  render: function () {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    
    var itemOptions = this.props.items.map(function(item){
      return <option value={item.id}>{item.firstName + " " + item.lastName}</option>;
    });

    return (
        <div className={wrapperClass}>
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <div className="field">
            <select name={this.props.name}
                    className="form-control"
                    ref={this.props.name}
                    onChange={this.props.onChange}>
              {itemOptions}
              </select>                    
            <div className="input">{this.props.error}</div>
          </div>
        </div>
    );
  }
});

module.exports = Dropdown;